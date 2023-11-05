import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useState } from "react";
import Button from "~/components/Button";
import SiteWrapper from "~/components/SiteWrapper";
import Textarea from "~/components/Textarea";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";
import { api } from "~/utils/api";
import { toProperJsonStringFormat } from "~/utils/helper";
import Log from "~/utils/log";
import { toastTextAtom, toastTypeAtom } from "~/utils/store";

const Home: NextPage = () => {
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [textAreaContent, setTextAreaContent] = useState("");

  const widgetConfigQuery = api.widget.getWidgetConfig.useQuery(undefined, {
    onSuccess: (data) => {
      setTextAreaContent(toProperJsonStringFormat(data));
      Log(data);
    },
    refetchOnWindowFocus: false,
  });

  const setWidgetConfigMutation = api.widget.setAllWidgetConfig.useMutation({
    onSuccess: (_data) => {
      setToastType("success");
      setToastText(`Saved successfully`);
      setTimeout(() => {
        setToastText("");
      }, 1500);
    },
    onError: (error) => {
      setToastType("error");
      setToastText(`Saving failed`);
      setTimeout(() => {
        setToastText("");
      }, 1500);
      Log(error);
    },
  });

  if (widgetConfigQuery.error) {
    Log(widgetConfigQuery.error);
    return <ErrorPage error={"Could not fetch widget config"} />;
  }

  if (widgetConfigQuery.isLoading) {
    return <LoadingSpinner />;
  }

  function handleSave() {
    try {
      JSON.parse(textAreaContent);
      const parsed = JSON.parse(textAreaContent);
      if (!Array.isArray(parsed)) {
        setToastType("error");
        setToastText(`Config must be an array`);
        setTimeout(() => {
          setToastText("");
        }, 3000);
        return;
      }

      setWidgetConfigMutation.mutate({ widgets: parsed });
    } catch (error) {
      Log(error, "error");
      setToastType("error");
      setToastText(`Config could not be parsed. There are syntax errors.`);
      setTimeout(() => {
        setToastText("");
      }, 3000);
    }
  }

  return (
    <SiteWrapper>
      <div className="flex h-screen w-full sm:space-x-8">
        <ul className="hidden border-r-2 border-r-panal-100 py-2 pr-8 sm:block">
          <li>Sidebar</li>
        </ul>
        <div className="flex w-full flex-col space-y-4">
          <h1 className="text-2xl font-bold">Widget Config</h1>
          <Textarea
            value={textAreaContent}
            changeHandler={(e) => setTextAreaContent(e.target.value)}
          />
          <div className="flex w-full justify-end space-x-2">
            <Button handler={() => handleSave()}>Save</Button>
          </div>
        </div>
      </div>
    </SiteWrapper>
  );
};

export default Home;
