import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { forwardRef } from "react";
import mapWidgets from "~/client/services/mapWidgetsService";
import { api } from "~/lib/api/api";
import { useDetectScreenSize } from "~/lib/ui/hooks";
import { cogIcon, eyeOffIcon } from "~/lib/ui/icons";
import { useHiddenWidgetsStore } from "~/lib/ui/state";
import { editedWidgetLayoutAtom } from "~/lib/ui/store";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import ErrorWidget from "~/server/widgets/ErrorWidget";
import { Skeleton } from "./ui/skeleton";

type Props = {
  editMode: boolean;
  widget: AdjustedWidgetLayout;
};

const WidgetWrapper = forwardRef(function InnerWidgetWrapper(
  props: Props & React.HTMLProps<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [editedWidgetLayout, setEditedWidgetLayout] = useAtom(
    editedWidgetLayoutAtom,
  );
  const currentScreenSize = useDetectScreenSize();
  const router = useRouter();

  const hideWidget = useHiddenWidgetsStore((state) => state.add);

  const getConfigQuery = api.data.getDataForWidget.useQuery({
    id: props.widget.id,
  });

  function handleHideWidget() {
    hideWidget(props.widget, currentScreenSize, true);
    const layout = editedWidgetLayout[currentScreenSize]?.find(
      (widget) => widget.i === props.widget.id,
    );
    if (!layout) return;
    const index = editedWidgetLayout[currentScreenSize]?.indexOf(layout) ?? -1;
    if (index === -1) return;

    editedWidgetLayout[currentScreenSize]?.splice(index, 1);

    setEditedWidgetLayout({ ...editedWidgetLayout });
  }

  function handleNavigate(path: string) {
    console.log("navigating to", path);
    void router.push(path);
  }

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
    <div
      className={`flex h-full w-full items-center justify-center`}
      style={{ ...props.style }}
      ref={ref}
      onMouseUp={(e) => handleItemClick(e, props.onMouseUp!)}
      onMouseDown={(e) => handleItemClick(e, props.onMouseDown!)}
      onTouchEnd={(e) => handleItemClick(e, props.onTouchEnd!)}
    >
      {props.editMode && (
        <div className="absolute z-20 flex h-full w-full justify-end rounded-md bg-white bg-opacity-30">
          <div className="bg-primary-500 z-30 mr-2 mt-2 flex h-fit items-start justify-end space-x-2">
            <button
              className="rounded-md bg-primary p-1 text-inverted"
              onTouchStart={handleHideWidget}
              onClick={handleHideWidget}
            >
              {eyeOffIcon}
            </button>
            <Link
              href={`/w/${props.widget.id}`}
              onTouchStart={() => handleNavigate(`/w/${props.widget.id}`)}
              onClick={() => handleNavigate(`/w/${props.widget.id}`)}
              className="rounded-md bg-primary p-1 text-inverted"
            >
              {cogIcon}
            </Link>
          </div>
        </div>
      )}
      {getConfigQuery.isLoading && (
        <Skeleton className="h-full w-full rounded-md" />
      )}
      {getConfigQuery.error && <ErrorWidget msg={"Data cannot be loaded"} />}
      {!getConfigQuery.isLoading &&
        getConfigQuery.data &&
        mapWidgets(props.widget, getConfigQuery.data)}
    </div>
  );
});

export default WidgetWrapper;
