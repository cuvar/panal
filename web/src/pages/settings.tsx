import type { NextPage } from "next";
import { useState } from "react";
import SiteWrapper from "~/components/SiteWrapper";
import Textarea from "~/components/Textarea";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/api/api";
import { toProperJsonStringFormat } from "~/lib/basic/string";
import Log from "~/lib/log/log";
import { useToast } from "~/lib/ui/hooks";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";

const Home: NextPage = () => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const showToast = useToast();

  const widgetConfigQuery = api.config.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setTextAreaContent(toProperJsonStringFormat(data));
      Log(data);
    },
    refetchOnWindowFocus: false,
  });

  const setWidgetConfigMutation = api.config.setAll.useMutation({
    onSuccess: (_data) => {
      showToast(`Saved successfully`, "success");
    },
    onError: (error) => {
      showToast(`Saving failed`, "error");
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
        showToast(`Config must be an array`, "error");
        return;
      }

      setWidgetConfigMutation.mutate({ widgets: parsed });
    } catch (error) {
      Log(error, "error");
      showToast(
        `Config could not be parsed. There are syntax errors.`,
        "error",
      );
    }
  }

  const sidebarItems = [
    {
      title: "Widget Config",
      href: "/",
    },
  ];

  return (
    <SiteWrapper>
      <div className="flex h-screen w-full sm:space-x-8">
        <div className="mx-2 hidden min-w-60 px-4 py-4 text-sm sm:block">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className="w-full rounded-md bg-gray-700 px-4 py-2 text-left"
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col space-y-4">
          <h1 className="text-2xl font-bold">Widget Config</h1>
          <Textarea
            value={textAreaContent}
            changeHandler={(e) => setTextAreaContent(e.target.value)}
          />
          <div className="flex w-full justify-end space-x-2">
            <Button onClick={() => handleSave()}>Save</Button>
          </div>
        </div>
      </div>
    </SiteWrapper>
  );
};

export default Home;
