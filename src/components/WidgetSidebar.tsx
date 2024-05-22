import { useAtom } from "jotai";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import type { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { api } from "~/utils/api";
import { getNameForWidgetType } from "~/utils/helper";
import Log from "~/utils/log";
import {
  editedWidgetLayoutAtom,
  toastTextAtom,
  toastTypeAtom,
  widgetLayoutAtom,
} from "~/utils/store";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { eyeIcon } from "~/utils/icons";

export default function WidgetSidebar() {
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);

  const currentScreenSize = "sm";

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
  return (
    <Sheet>
      <SheetTrigger>{eyeIcon}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Hidden widgets</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-full">
          {!getHiddenLayoutsQuery.data ||
          getHiddenLayoutsQuery.data.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              No hidden widgets
            </div>
          ) : (
            getHiddenLayoutsQuery.data.map((widget) => (
              <div className="contents" key={widget.id}>
                <div
                  className="droppable-element my-2 rounded-md px-4 py-4 hover:bg-background"
                  onClick={() => handleAddToLayout(widget)}
                >
                  {getNameForWidgetType(widget.type)}
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
