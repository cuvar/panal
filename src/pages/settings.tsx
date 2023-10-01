import type { NextPage } from "next";
import { useState } from "react";
import Button from "~/components/Button";
import SiteWrapper from "~/components/SiteWrapper";
import { env } from "~/env.mjs";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [textAreaContent, setTextAreaContent] = useState("");

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
      // todo: show Toast
      console.log("success");
    },
    onError: (error) => {
      // todo: show Toast
      console.log(error);
    },
  });

  if (widgetConfigQuery.error) {
    return <ErrorPage error={""} />;
  }

  if (widgetConfigQuery.isLoading) {
    return <LoadingSpinner />;
  }

  function handleSave() {
    try {
      JSON.parse(textAreaContent);
      const parsed = JSON.parse(textAreaContent);
      if (!Array.isArray(parsed)) {
        // todo: show Toast
        return;
      }
      setWidgetConfigMutation.mutate({ widgets: parsed });
    } catch (error) {
      console.log(error);
      // todo: show Toast
    }
  }

  return (
    <SiteWrapper>
      <div className="flex space-x-8">
        <ul className="border-r-2 border-r-panal-100 py-2 pr-8">
          <li>Sidebar</li>
        </ul>
        <div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Widget Config</h1>
            <textarea
              name=""
              id=""
              cols={60}
              rows={30}
              className="overflow-x-scroll whitespace-nowrap rounded-lg bg-slate-900 px-2 py-2 font-mono text-white"
              value={textAreaContent}
              onChange={(e) => setTextAreaContent(e.target.value)}
            ></textarea>
            <div className="flex w-full justify-end space-x-2">
              <Button handler={() => handleSave()}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </SiteWrapper>
  );
};

export default Home;
