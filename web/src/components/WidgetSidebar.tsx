import { useAtom } from "jotai";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import { addWidgetToScreenSize } from "~/client/services/transformLayoutsService";
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

  function handleAddToLayout(_widget: AdjustedWidgetLayout) {
    unhideWidget(_widget, currentScreenSize);
    if (!editedWidgetLayout[currentScreenSize]) return;
    const newLayout = addWidgetToScreenSize(
      _widget,
      currentScreenSize,
      editedWidgetLayout,
      false,
    );
    setEditedWidgetLayout(newLayout);
    setWidgetLayout(makeLayoutsStatic(newLayout, false));
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
