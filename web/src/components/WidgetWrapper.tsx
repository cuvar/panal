import React, { forwardRef } from "react";
import mapWidgets from "~/client/services/mapWidgets.service";
import { api } from "~/lib/api/api";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import ErrorWidget from "~/server/widgets/ErrorWidget";
import WidgetContextMenu from "./WidgetContextMenu";
import { Skeleton } from "./ui/skeleton";

type Props = {
  editMode: boolean;
  widget: AdjustedWidgetLayout;
};

const WidgetWrapper = forwardRef(function InnerWidgetWrapper(
  props: Props & React.HTMLProps<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  const getConfigQuery = api.data.getDataForWidget.useQuery({
    id: props.widget.id,
  });

  function handleItemClick(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    parentHandler:
      | React.MouseEventHandler<HTMLDivElement>
      | React.TouchEventHandler<HTMLDivElement>,
  ) {
    if (!ref || !("current" in ref)) return;
    if (ref.current!.children[0] === e.target) {
      e.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      parentHandler(e);
    }
  }

  return (
    <WidgetContextMenu widget={props.widget}>
      <div
        className={`flex h-full w-full items-center justify-center ${props.editMode && "rounded-md bg-white bg-opacity-30"}`}
        style={{ ...props.style }}
        ref={ref}
        onMouseUp={(e) => handleItemClick(e, props.onMouseUp!)}
        onMouseDown={(e) => handleItemClick(e, props.onMouseDown!)}
        onTouchEnd={(e) => handleItemClick(e, props.onTouchEnd!)}
      >
        {getConfigQuery.isLoading && (
          <Skeleton className="h-full w-full rounded-md" />
        )}
        {getConfigQuery.error && <ErrorWidget msg={"Data cannot be loaded"} />}
        {!getConfigQuery.isLoading &&
          getConfigQuery.data &&
          mapWidgets(props.widget, getConfigQuery.data)}
      </div>
    </WidgetContextMenu>
  );
});

export default WidgetWrapper;
