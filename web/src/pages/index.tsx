import type { NextPage } from "next";
import SiteWrapper from "~/components/SiteWrapper";
import WidgetView from "~/components/WidgetView";
import { api } from "~/lib/api/api";
import Log from "~/lib/log/log";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";

const Home: NextPage = () => {
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
      <WidgetView layout={widgetLayoutQuery.data} />
    </SiteWrapper>
  );
};

export default Home;
