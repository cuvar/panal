import { useAtom } from "jotai";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import type { AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import { api } from "~/utils/api";
import { getNameForWidgetType } from "~/utils/helper";
import { useDetectScreenSize } from "~/utils/hooks";
import { crossIcon } from "~/utils/icons";
import Log from "~/utils/log";
import {
  editedWidgetLayoutAtom,
  showHiddenWidgetsAtom,
  toastTextAtom,
  toastTypeAtom,
  widgetLayoutAtom,
} from "~/utils/store";
import GhostButton from "./Button/GhostButton";

export default function WidgetSidebar() {
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [, setShowHiddenWidgets] = useAtom(showHiddenWidgetsAtom);

  const currentScreenSize = useDetectScreenSize();

  const getAllLayoutsQuery = api.layout.getAll.useQuery(undefined, {
    enabled: false,
  });
  const getHiddenLayoutsQuery = api.layout.getAllHidden.useQuery({
    screenSize: currentScreenSize,
  });

  const hideWidgetMutation = api.layout.setHide.useMutation({
    onSuccess: async () => {
      await getHiddenLayoutsQuery.refetch();
      const res = await getAllLayoutsQuery.refetch();
      setToastType("success");
      setToastText(`Revealed widget successfully`);
      if (res.data) {
        const transformed = transformLayoutsForGrid(res.data, false);
        Log(transformed);
        setEditedWidgetLayout(transformed);
        setWidgetLayout(makeLayoutsStatic(transformed, false));
      }

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

  function handleCloseSidebar() {
    setShowHiddenWidgets(false);
  }

  return (
    <div className="fixed bottom-0 left-0 top-0 z-20 w-60 bg-panal-700 px-4 py-2">
      <div className="mt-2 flex w-full justify-end">
        <GhostButton onClick={handleCloseSidebar}>{crossIcon}</GhostButton>
      </div>
      <h2 className="my-2 font-bold">Hidden widgets</h2>
      {!getHiddenLayoutsQuery.data ? (
        <div>no widgets</div>
      ) : (
        getHiddenLayoutsQuery.data.map((widget) => (
          <div className="contents" key={widget.id}>
            <div
              className="droppable-element my-2 rounded-md px-4 py-4 hover:bg-panal-500"
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
