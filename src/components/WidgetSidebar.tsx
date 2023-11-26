import { useAtom } from "jotai";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import type { AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import { api } from "~/utils/api";
import { getNameForWidgetType } from "~/utils/helper";
import { useDetectScreenSize } from "~/utils/hooks";
import Log from "~/utils/log";
import {
  editedWidgetLayoutAtom,
  toastTextAtom,
  toastTypeAtom,
  widgetLayoutAtom,
} from "~/utils/store";

export default function WidgetSidebar() {
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);

  const currentScreenSize = useDetectScreenSize();

  const getAllLayoutsQuery = api.layout.getAll.useQuery(undefined, {
    enabled: false,
  });
  const getHiddenLayoutsQuery = api.layout.getAllHidden.useQuery({
    screenSize: currentScreenSize,
  });

  const hideWidgetMutation = api.layout.setHide.useMutation({
    onSuccess: async () => {
      const res = await getAllLayoutsQuery.refetch();
      setToastType("success");
      setToastText(`Revealed widget successfully`);
      if (res.data) {
        const transformed = transformLayoutsForGrid(res.data, false);
        Log(transformed);
        setEditedWidgetLayout(transformed);
        setWidgetLayout(makeLayoutsStatic(transformed, true));
      }

      // location.reload();
      setTimeout(() => {
        setToastText("");
      }, 1500);
    },
    onError: (error) => {
      setToastType("error");
      setToastText(`Revealing failed`);
      setTimeout(() => {
        setToastText("");
      }, 1500);
      Log(error, "error");
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
