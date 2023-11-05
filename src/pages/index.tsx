import type { NextPage } from "next";
import SiteWrapper from "~/components/SiteWrapper";
import WidgetView from "~/components/WidgetView";
import ErrorPage from "~/sites/Error";
import LoadingSpinner from "~/sites/Loading";
import { api } from "~/utils/api";
import Log from "~/utils/log";

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
