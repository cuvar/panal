import type { NextPage } from "next";
import SiteWrapper from "~/components/SiteWrapper";
import WidgetView from "~/components/WidgetView";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";
import { api } from "~/utils/api";
import Log from "~/utils/log";

const Home: NextPage = () => {
  const widgetDataQuery = api.widget.getWidgetData.useQuery(undefined, {
    onSuccess: (data) => {
      Log(data);
    },
  });

  if (widgetDataQuery.error) {
    return <ErrorPage error={""} />;
  }

  if (widgetDataQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SiteWrapper>
      <WidgetView data={widgetDataQuery.data} />
    </SiteWrapper>
  );
};

export default Home;
