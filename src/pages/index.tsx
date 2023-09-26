import type { NextPage } from "next";
import WidgetView from "~/components/WidgetView";
import LoadingSpinner from "~/sites/Loading";
import ErrorPage from "~/sites/Error";
import SiteWrapper from "~/components/SiteWrapper";
import { useQuery } from "@tanstack/react-query";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const widgetData: WidgetViewData = {
    calendarData: [],
  };

  const calendarDataQuery = api.widget.getCalendarData.useQuery({
    link: "https://rapla.dhbw-karlsruhe.de/rapla?page=ical&user=braun&file=TINF20B2",
    daysInAdvance: 7,
  });

  const widgetDataQuery = api.widget.getWidgetData.useQuery(undefined, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // todo: load data --> pass to widgetview --> render based on that
  // todo: also load calendar data

  if (calendarDataQuery.error) {
    return <ErrorPage error={""} />;
  }

  if (calendarDataQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (
    typeof calendarDataQuery.data == "object" &&
    calendarDataQuery.data !== null &&
    "calendarData" in calendarDataQuery.data
  ) {
    widgetData.calendarData = calendarDataQuery.data
      .calendarData as CalendarWidget[][];
  }

  return (
    <SiteWrapper>
      <WidgetView data={widgetData} />
    </SiteWrapper>
  );
};

export default Home;
