import { useAtom } from "jotai";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import { addWidgetToScreenSize } from "~/client/services/transformLayoutsService";
import { api } from "~/lib/api/api";
import { editedWidgetLayoutAtom, widgetLayoutAtom } from "~/lib/ui/store";
import type { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import Log from "~/lib/log/log";
import { getNameForWidgetType } from "~/lib/service/widget.service";
import { useDetectScreenSize, useToast } from "~/lib/ui/hooks";
import { eyeIcon } from "~/lib/ui/icons";
import { useHiddenWidgetsStore } from "~/lib/ui/state";

export default function WidgetSidebar() {
  const [editedWidgetLayout, setEditedWidgetLayout] = useAtom(
    editedWidgetLayoutAtom,
  );
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const showToast = useToast();

  const currentScreenSize = useDetectScreenSize();
  const allHiddenWidgets = useHiddenWidgetsStore((state) => state.widgets);
  const hiddenWidgetsForScreen = allHiddenWidgets.filter(
    (w) => w.screenSize === currentScreenSize,
  );
  const unhideWidget = useHiddenWidgetsStore((state) => state.remove);

  // const getAllLayoutsQuery = api.layout.getAll.useQuery(undefined, {
  //   enabled: false,
  // });

  const getHiddenLayoutsQuery = api.layout.getAllHidden.useQuery(
    {
      screenSize: currentScreenSize,
    },
    {
      onSuccess: (data) => {
        Log(data);
      },
    },
  );

  // const hideWidgetMutation = api.layout.setHide.useMutation({
  //   onSuccess: async () => {
  //     await getHiddenLayoutsQuery.refetch();
  //     const res = await getAllLayoutsQuery.refetch();
  //     showToast("Revealed widget successfully", "success");
  //     if (res.data) {
  //       const transformed = transformLayoutsForGrid(res.data, false);
  //       Log(transformed);
  //       setEditedWidgetLayout(transformed);
  //       setWidgetLayout(makeLayoutsStatic(transformed, false));
  //     }
  //   },
  //   onError: (error) => {
  //     showToast("Revealing failed", "error");
  //     Log(error, "error");
  //   },
  // });

  function handleAddToLayout(_widget: AdjustedWidgetLayout) {
    unhideWidget(_widget, currentScreenSize);
    showToast(`Revealed widget`, "success");
    if (!editedWidgetLayout[currentScreenSize]) return;
    const newLayout = addWidgetToScreenSize(
      _widget,
      currentScreenSize,
      editedWidgetLayout,
      false,
    );
    setEditedWidgetLayout(newLayout);
    setWidgetLayout(makeLayoutsStatic(newLayout, false));

    // hideWidgetMutation.mutate({
    //   hide: false,
    //   screenSize: currentScreenSize,
    //   widget: widget,
    // });
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
          {hiddenWidgetsForScreen.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              No hidden widgets
            </div>
          ) : (
            hiddenWidgetsForScreen.map((hi) => (
              <div className="contents" key={hi.widget.id}>
                <div
                  className="droppable-element my-2 rounded-md px-4 py-4 hover:bg-background"
                  onClick={() => handleAddToLayout(hi.widget)}
                >
                  {getNameForWidgetType(hi.widget.type)}
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
