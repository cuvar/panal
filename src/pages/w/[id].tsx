import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, type ChangeEvent } from "react";
import Button from "~/components/Button";
import Separator from "~/components/Separator";
import SiteWrapper from "~/components/SiteWrapper";
import Textarea from "~/components/Textarea";
import ErrorPage from "~/sites/Error";
import { api } from "~/utils/api";
import { getNameForWidgetType, toProperJsonStringFormat } from "~/utils/helper";
import Log from "~/utils/log";
import { toastTextAtom, toastTypeAtom } from "~/utils/store";
import { type ScreenSize } from "~/utils/types/types";
import {
  type Positioning,
  type ScreenSizePositioning,
  type WidgetType,
} from "~/utils/types/widget";

const Home: NextPage = () => {
  const id = useRouter().query.id;
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [widgetType, setWidgetType] = useState<WidgetType | null>(null);
  const [textAreaInput, setTextAreaInput] = useState("");
  const [layoutData, setLayoutData] = useState<ScreenSizePositioning | null>(
    null,
  );

  const widgetLayoutQuery = api.layout.getForWidget.useQuery(
    { id: typeof id === "string" ? id : "" },
    {
      enabled: typeof id === "string",
      onSuccess: (data) => {
        setWidgetType(data.type);
        setLayoutData(data.layout);
        Log(data);
      },
    },
  );
  const widgetConfigQuery = api.config.getConfigForWidget.useQuery(
    { id: typeof id === "string" ? id : "" },
    {
      enabled: typeof id === "string",
      onSuccess: (data) => {
        setTextAreaInput(toProperJsonStringFormat(data.data));
        Log(data);
      },
    },
  );

  const setWidgetConfigForWidgetMutation = api.config.setForWidget.useMutation({
    onSuccess: (_data) => {
      setToastType("success");
      setToastText(`Config saved successfully`);
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

  const setWidgetLayoutForWidgetMutation = api.layout.setForWidget.useMutation({
    onSuccess: (_data) => {
      setToastType("success");
      setToastText(`Layout saved successfully`);
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

  if (
    typeof id !== "string" &&
    !widgetLayoutQuery.isLoading &&
    !widgetConfigQuery.isLoading
  ) {
    return <ErrorPage error={`ID is not valid.`} />;
  }

  if (
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (widgetLayoutQuery.error || !widgetType) &&
    !widgetLayoutQuery.isLoading &&
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (widgetConfigQuery.error || !widgetType) &&
    !widgetConfigQuery.isLoading &&
    typeof id === "string"
  ) {
    return (
      <ErrorPage error={`Data for Widget with ID ${id} could not be loaded.`} />
    );
  }

  function handleLayoutInputChange(
    ev: ChangeEvent<HTMLInputElement>,
    key: keyof Positioning,
    screenSize: ScreenSize,
  ) {
    if (!layoutData) {
      return;
    }

    const newLayoutData = { ...layoutData };
    newLayoutData[screenSize][key] = parseInt(ev.target.value);
    setLayoutData(newLayoutData);
  }

  function onClickSaveConfig() {
    if (!widgetType) {
      return;
    }

    setWidgetConfigForWidgetMutation.mutate({
      id: id as string,
      type: widgetType,
      data: textAreaInput,
    });
  }

  function onClickSaveLayout() {
    if (!widgetType || !layoutData) {
      return;
    }

    setWidgetLayoutForWidgetMutation.mutate({
      id: id as string,
      type: widgetType,
      layout: layoutData,
    });
  }

  return (
    <SiteWrapper>
      <div className="min-h-screen w-full">
        <h1 className="w-full text-left text-3xl font-bold">Settings</h1>
        {widgetLayoutQuery.isLoading ||
          (widgetConfigQuery.isLoading && (
            <div className="flex h-screen items-center justify-center">
              <div className="text-xl italic">Loading</div>
            </div>
          ))}
        {widgetType && (
          <div className="mt-10 h-full w-full">
            <div className="">
              <h2 className="mb-5 text-xl">General information</h2>
              <p>
                <span>WidgetType: </span>
                <span className="font-mono">
                  {getNameForWidgetType(widgetType)}
                </span>
              </p>
              <p>
                <span>ID: </span>
                <span className="font-mono">{id}</span>
              </p>
            </div>
            <Separator />
            {layoutData && (
              <div className="">
                <h2 className="mb-5 text-xl">Layout</h2>
                <div className="space-y-2">
                  {Object.entries(layoutData).map(
                    ([screenKey, screenValue]) => {
                      return (
                        <div key={screenKey} className="flex space-x-2">
                          <div className="w-10">{screenKey}</div>
                          <div className="flex space-x-2">
                            {Object.entries(screenValue).map(
                              ([key, value]: [string, number]) => {
                                return (
                                  <div key={key} className="flex space-x-2">
                                    <p>{key}</p>
                                    <input
                                      type="number"
                                      className="w-10 rounded-sm text-right text-black"
                                      value={value}
                                      onChange={(e) =>
                                        handleLayoutInputChange(
                                          e,
                                          key as keyof Positioning,
                                          screenKey as ScreenSize,
                                        )
                                      }
                                    />
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
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
              <Button handler={onClickSaveConfig}>Save Config</Button>
              <Button handler={onClickSaveLayout}>Save Layout</Button>
            </div>
          </div>
        )}
      </div>
    </SiteWrapper>
  );
};

export default Home;
