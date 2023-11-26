import type { AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import { api } from "~/utils/api";
import { getNameForWidgetType } from "~/utils/helper";
import { useDetectScreenSize } from "~/utils/hooks";
import Log from "~/utils/log";

export default function WidgetSidebar() {
  const currentScreenSize = useDetectScreenSize();
  const getHiddenLayoutsQuery = api.layout.getAllHidden.useQuery({
    screenSize: currentScreenSize,
  });

  const hideWidgetMutation = api.layout.hideWidget.useMutation({
    onSuccess: () => {
      Log("success");
    },
  });

  function handleAddToLayout(widget: AdjustedWidgetLayout) {
    hideWidgetMutation.mutate({
      hide: false,
      screenSize: currentScreenSize,
      widget: widget,
    });
  }

  return (
    <div className="absolute left-0 z-20 mx-4 h-full w-60 rounded-md bg-panal-700 px-4 py-2">
      {!getHiddenLayoutsQuery.data ? (
        <div>no widgets</div>
      ) : (
        getHiddenLayoutsQuery.data.map((widget) => (
          <div className="contents" key={widget.id}>
            <div
              className="droppable-element my-2 rounded-md px-4 py-4 hover:bg-panal-500"
              // draggable={true}
              // unselectable="on"
              // onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
              onClick={() => handleAddToLayout(widget)}
            >
              {getNameForWidgetType(widget.type)}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
