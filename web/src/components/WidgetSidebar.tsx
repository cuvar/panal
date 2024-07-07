import type { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { getNameForWidgetType } from "~/lib/service/widget.service";
import { useCommandManager, useDetectScreenSize } from "~/lib/ui/hooks";
import { cogIcon, eyeIcon } from "~/lib/ui/icons";
import { useBoundStore } from "~/lib/ui/state";
import { Button } from "./ui/button";

export default function WidgetSidebar() {
  const commandManager = useCommandManager();
  const currentScreenSize = useDetectScreenSize();

  const editMode = useBoundStore((state) => state.editMode);
  const allAppearentWidgets = useBoundStore((state) => state.apparentWidgets);

  const hiddenWidgetsForScreen = allAppearentWidgets.filter(
    (w) => w.screenSize === currentScreenSize && !w.visible,
  );

  function handleAddToLayout(_widget: AdjustedWidgetLayout) {
    commandManager.revealWidget(_widget, currentScreenSize);
  }

  return (
    <Sheet>
      {editMode && <SheetTrigger>{eyeIcon}</SheetTrigger>}
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Hidden widgets</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col space-y-2">
          {hiddenWidgetsForScreen.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              No hidden widgets
            </div>
          ) : (
            hiddenWidgetsForScreen.map((hi) => (
              <div
                className="flex items-center justify-between"
                key={hi.widget.id}
              >
                <Button
                  className="droppable-element text-left"
                  variant={"ghost"}
                  onClick={() => handleAddToLayout(hi.widget)}
                >
                  {getNameForWidgetType(hi.widget.type)}
                </Button>
                <Link
                  href={`/w/${hi.widget.id}`}
                  className="rounded-md bg-primary p-1 text-inverted"
                >
                  {cogIcon}
                </Link>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
