import type { NextPage } from "next";
import { useRouter } from "next/router";
import SiteWrapper from "~/components/SiteWrapper";
import ErrorPage from "~/sites/Error";
import { api } from "~/utils/api";
import Log from "~/utils/log";

const Home: NextPage = () => {
  const id = useRouter().query.id
  
  console.log(id);
  const widgetDataQuery = api.widget.getWidgetDataForWidget.useQuery({id: typeof id === "string" ? id : ""}, {
    enabled: typeof id === "string",
    onSuccess: (data) => {
      Log(data);
    },
  });

  if (typeof id !== "string") {
    return <ErrorPage error={`ID is not valid.`} />;
  }

  if (widgetDataQuery.error) {
    return <ErrorPage error={`Data for Widget with ID ${id} could not be loaded.`} />;
  }

  return (
    <SiteWrapper>
      <h1 className="font-bold">
        Settings
      </h1>
      <div>
        {widgetDataQuery.isLoading && <div>Loading</div>}
      </div>
    </SiteWrapper>
  );
};

export default Home;
