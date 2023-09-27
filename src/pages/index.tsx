import type { NextPage } from "next";
import WidgetView from "~/components/WidgetView";
import LoadingSpinner from "~/sites/Loading";
import ErrorPage from "~/sites/Error";
import SiteWrapper from "~/components/SiteWrapper";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const widgetDataQuery = api.widget.getWidgetData.useQuery(undefined, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // todo: load data --> pass to widgetview --> render based on that
  // todo: also load calendar data

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
