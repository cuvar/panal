import { useAtom } from "jotai";
import type { NextPage } from "next";
import SiteWrapper from "~/components/SiteWrapper";
import WidgetSidebar from "~/components/WidgetSidebar";
import WidgetView from "~/components/WidgetView";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";
import { api } from "~/utils/api";
import Log from "~/utils/log";
import { showHiddenWidgetsAtom } from "~/utils/store";

const Home: NextPage = () => {
  const [showHiddenWidgets] = useAtom(showHiddenWidgetsAtom);

  const widgetLayoutQuery = api.layout.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      Log(data);
    },
  });

  if (widgetLayoutQuery.error) {
    return <ErrorPage error={""} />;
  }

  if (widgetLayoutQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SiteWrapper>
      {showHiddenWidgets && <WidgetSidebar />}
      <WidgetView layout={widgetLayoutQuery.data} />
    </SiteWrapper>
  );
};

export default Home;
