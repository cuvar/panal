import Link from "next/link";
import mapWidgets from "~/client/services/mapWidgetsService";
import { type AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import ErrorWidget from "~/server/widgets/ErrorWidget";
import LoadingWidget from "~/server/widgets/LoadingWidget";
import { api } from "~/utils/api";
import { cogIcon } from "~/utils/icons";

type Props = {
  editMode: boolean;
  widget: AdjustedWidgetLayout;
};

export default function WidgetWrapper(props: Props) {
  const getConfigQuery = api.data.getDataForWidget.useQuery({
    id: props.widget.id,
  });

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${
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
      {getConfigQuery.isLoading && <LoadingWidget />}
      {getConfigQuery.error && <ErrorWidget msg={"Data cannot be loaded"} />}
      {!getConfigQuery.isLoading &&
        getConfigQuery.data &&
        mapWidgets(props.widget, getConfigQuery.data)}
    </div>
  );
}
