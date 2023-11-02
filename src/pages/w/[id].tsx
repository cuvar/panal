import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, type ChangeEvent } from "react";
import Button from "~/components/Button";
import Separator from "~/components/Separator";
import SiteWrapper from "~/components/SiteWrapper";
import Textarea from "~/components/Textarea";
import { type WidgetData } from "~/server/entities/widgetData";
import ErrorPage from "~/sites/Error";
import { api } from "~/utils/api";
import { getNameForWidgetType, toProperJsonStringFormat } from "~/utils/helper";
import Log from "~/utils/log";
import { toastTextAtom, toastTypeAtom } from "~/utils/store";

const Home: NextPage = () => {
  const id = useRouter().query.id;
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);
  const [textAreaInput, setTextAreaInput] = useState("");

  const widgetDataQuery = api.widget.getAdjustedWidgetConfigForWidget.useQuery(
    { id: typeof id === "string" ? id : "" },
    {
      enabled: typeof id === "string",
      onSuccess: (data) => {
        setWidgetData(data);
        setTextAreaInput(toProperJsonStringFormat(data.data));
        Log(data);
      },
    },
  );

  const setWidgetConfigMutation = api.widget.setWidgetConfig.useMutation({
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

  if (typeof id !== "string" && !widgetDataQuery.isLoading) {
    return <ErrorPage error={`ID is not valid.`} />;
  }

  if (
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (widgetDataQuery.error || !widgetData) &&
    !widgetDataQuery.isLoading &&
    typeof id === "string"
  ) {
    return (
      <ErrorPage error={`Data for Widget with ID ${id} could not be loaded.`} />
    );
  }

  function handleInputChange(
    ev: ChangeEvent<HTMLInputElement>,
    key: string,
    value: number,
  ) {
    console.log(key, value);
    // TODO: add implementation
  }

  function onClickSave() {
    // TODO: implement mutation preparation
    // setWidgetConfigMutation.mutate({
    //   widgets:
    // })
  }

  return (
    <SiteWrapper>
      <div className="min-h-screen w-full">
        <h1 className="w-full text-left text-3xl font-bold">Settings</h1>
        {widgetDataQuery.isLoading && (
          <div className="flex h-screen items-center justify-center">
            <div className="text-xl italic">Loading</div>
          </div>
        )}
        {widgetData && (
          <div className="mt-10 h-full w-full">
            <div className="">
              <h2 className="mb-5 text-xl">General information</h2>
              <p>
                <span>WidgetType: </span>
                <span className="font-mono">
                  {getNameForWidgetType(widgetData.type)}
                </span>
              </p>
              <p>
                <span>ID: </span>
                <span className="font-mono">{widgetData.id}</span>
              </p>
            </div>
            <Separator />
            <div className="">
              <h2 className="mb-5 text-xl">Layout</h2>
              <div className="space-y-2">
                {Object.entries(widgetData.layout).map(([key, value]) => {
                  return (
                    <div key={key} className="flex space-x-2">
                      <div className="w-10">{key}</div>
                      <div className="flex space-x-2">
                        {Object.entries(value).map(
                          ([key, value]: [string, number]) => {
                            return (
                              <div key={key} className="flex space-x-2">
                                <p>{key}</p>
                                <input
                                  type="number"
                                  className="w-10 rounded-sm text-right text-black"
                                  value={value}
                                  onChange={(e) =>
                                    handleInputChange(e, key, value)
                                  }
                                />
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Separator />
            <div className="">
              <h2 className="mb-5 text-xl">Configuration</h2>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Textarea
                    value={textAreaInput}
                    changeHandler={(e) => setTextAreaInput(e.target.value)}
                    maxCols={20}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex w-full justify-end">
              <Button handler={onClickSave}>Save</Button>
            </div>
          </div>
        )}
      </div>
    </SiteWrapper>
  );
};

export default Home;
