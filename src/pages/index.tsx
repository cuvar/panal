import type { NextPage } from "next";
import WidgetView from "~/components/WidgetView";
import LoadingSpinner from "~/sites/Loading";
import ErrorPage from "~/sites/Error";
import SiteWrapper from "~/components/SiteWrapper";
import { useQuery } from "@tanstack/react-query";

const Home: NextPage = () => {
  const widgetData: WidgetViewData = {
    calendarData: [],
  };

  const queryData = useQuery(["calendarData"], async () => {
    const res = await fetch("/api/calendar", {
      method: "POST",
      body: JSON.stringify({
        link: "https://rapla.dhbw-karlsruhe.de/rapla?page=ical&user=braun&file=TINF20B2",
        daysInAdvance: 7,
      }),
    });
    const response = res.json();

    if (typeof response.error !== "undefined") {
      throw new Error(response.error);
    } else {
      return response;
    }
  });

  if (queryData.error) {
    return <ErrorPage error={""} />;
  }

  if (queryData.isLoading) {
    return <LoadingSpinner />;
  }
  if (queryData.data) {
    widgetData.calendarData = queryData.data.calendarData;
  }

  return (
    <SiteWrapper>
      <WidgetView data={widgetData} />
    </SiteWrapper>
  );
};

export default Home;
