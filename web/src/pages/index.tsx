import type { NextPage } from "next";
import { useEffect } from "react";
import SiteWrapper from "~/components/structure/SiteWrapper";
import WidgetView from "~/components/WidgetView";
import { api } from "~/lib/api/api";
import Log from "~/lib/log/log";
import { useCommandManager, useDetectScreenSize } from "~/lib/ui/hooks";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";

const Home: NextPage = () => {
  const commandManager = useCommandManager();
  const currentScreenSize = useDetectScreenSize();

  const widgetLayoutQuery = api.layout.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      Log("all layouts", "log", data);
    },
    refetchOnWindowFocus: false,
  });

  const getAllHiddenQuery = api.layout.getAllHidden.useQuery(
    {
      screenSize: currentScreenSize,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (getAllHiddenQuery.status == "success") {
      Log("getAllHidden", "log", getAllHiddenQuery.data);
      getAllHiddenQuery.data.forEach((widget) => {
        commandManager.hideWidget(widget, currentScreenSize);
      });
    } else if (getAllHiddenQuery.status == "error") {
      Log("getAllHidden", "error", getAllHiddenQuery.error);
    }
  }, [
    commandManager,
    currentScreenSize,
    getAllHiddenQuery.data,
    getAllHiddenQuery.error,
    getAllHiddenQuery.status,
  ]);

  if (widgetLayoutQuery.error) {
    return <ErrorPage error={""} />;
  }

  if (widgetLayoutQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SiteWrapper>
      <WidgetView layout={widgetLayoutQuery.data} />
    </SiteWrapper>
  );
};

export default Home;
