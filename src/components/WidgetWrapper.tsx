import Link from "next/link";
import { type AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import CalendarWidget from "~/server/widgets/calendar/CalendarWidget";
import { type CalendarWidgetData } from "~/server/widgets/calendar/types";
import LinkCollectionWidget from "~/server/widgets/links/LinkWidget/LinkCollectionWidget";
import { type LinkWidgetData } from "~/server/widgets/links/types";
import SearchWidget from "~/server/widgets/search/SearchWidget";
import { type SearchWidgetData } from "~/server/widgets/search/types";
import TimeWidget from "~/server/widgets/time/TimeWidget";
import { type TimeWidgetData } from "~/server/widgets/time/types";
import { api } from "~/utils/api";
import { cogIcon } from "~/utils/icons";
import Log from "~/utils/log";

type Props = {
  editMode: boolean;
  widget: AdjustedWidgetLayout;
};

export default function WidgetWrapper(props: Props) {
  const getConfigQuery = api.config.getForWidget.useQuery({
    id: props.widget.id,
  });

  if (getConfigQuery.data) {
    Log(getConfigQuery.data?.data);
  }

  return (
    <div
      className={`flex items-center justify-center ${
        props.editMode ? "rounded-md border-2 border-panal-700" : ""
      }`}
    >
      {props.editMode && (
        <Link
          href={`/w/${props.widget.id}`}
          className="absolute right-2 top-2 z-20 text-panal-100"
        >
          {cogIcon}
        </Link>
      )}
      {getConfigQuery.isLoading && <div>loading</div>}
      {getConfigQuery.error && <div>widget cannot be rendered</div>}
      {!getConfigQuery.isLoading && getConfigQuery.data && (
        <>
          {props.widget.type === "time" && (
            <TimeWidget
              widget={props.widget}
              data={getConfigQuery.data.data as TimeWidgetData}
            />
          )}
          {props.widget.type === "search" && (
            <SearchWidget
              widget={props.widget}
              data={getConfigQuery.data.data as SearchWidgetData}
            />
          )}
          {props.widget.type === "links" && (
            <LinkCollectionWidget
              widget={props.widget}
              data={getConfigQuery.data.data as LinkWidgetData}
            />
          )}
          {props.widget.type === "calendar" && (
            <CalendarWidget
              widget={props.widget}
              data={getConfigQuery.data.data as CalendarWidgetData}
            />
          )}
        </>
      )}
    </div>
  );
}
