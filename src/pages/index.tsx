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

  const { data, isLoading, error } = useQuery(["calendarData"], async () => {
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

  if (error) {
    return <ErrorPage error={""} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (data) {
    widgetData.calendarData = data.calendarData;
  }

  return (
    <SiteWrapper>
      <WidgetView data={widgetData} />
    </SiteWrapper>
  );
};

export default Home;
