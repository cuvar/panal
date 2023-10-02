import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useState } from "react";
import Button from "~/components/Button";
import SiteWrapper from "~/components/SiteWrapper";
import { env } from "~/env.mjs";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";
import { api } from "~/utils/api";
import { useDetectMobile } from "~/utils/hooks";
import { toastTextAtom, toastTypeAtom } from "~/utils/store";

const Home: NextPage = () => {
  const [_, setToastText] = useAtom(toastTextAtom);
  const [__, setToastType] = useAtom(toastTypeAtom);
  const [textAreaContent, setTextAreaContent] = useState("");
  const isMobile = useDetectMobile();

  const widgetConfigQuery = api.widget.getWidgetConfig.useQuery(undefined, {
    onSuccess: (data) => {
      setTextAreaContent(JSON.stringify(data, null, 2));
      if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
        console.log(data);
      }
    },
  });
  const setWidgetConfigMutation = api.widget.setWidgetConfig.useMutation({
    onSuccess: (data) => {
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
      if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
        console.log(error);
      }
    },
  });

  if (widgetConfigQuery.error) {
    if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
      console.log(widgetConfigQuery.error);
    }
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
      if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
        console.log(error);
      }
      setToastType("error");
      setToastText(`Config could not be parsed. There are syntax errors.`);
      setTimeout(() => {
        setToastText("");
      }, 3000);
    }
  }

  return (
    <SiteWrapper>
      <div className="flex w-full sm:space-x-8">
        <ul className="hidden border-r-2 border-r-panal-100 py-2 pr-8 sm:block">
          <li>Sidebar</li>
        </ul>
        <div className="flex w-full flex-col space-y-4">
          <h1 className="text-2xl font-bold">Widget Config</h1>
          <textarea
            name=""
            id=""
            rows={isMobile ? 20 : 30}
            className="w-full max-w-3xl overflow-x-scroll whitespace-nowrap rounded-lg bg-slate-900 px-2 py-2 font-mono text-white"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          ></textarea>
          <div className="flex w-full justify-end space-x-2">
            <Button handler={() => handleSave()}>Save</Button>
          </div>
        </div>
      </div>
    </SiteWrapper>
  );
};

export default Home;
