import type { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

import Link from "next/link";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { api } from "~/lib/api/api";
import Log from "~/lib/log/log";
import { getNameForWidgetType } from "~/lib/service/widget.service";
import { useCommandManager, useDetectScreenSize } from "~/lib/ui/hooks";
import { cogIcon, eyeIcon } from "~/lib/ui/icons";
import { useBoundStore } from "~/lib/ui/state";
import { Button } from "./ui/button";

export default function WidgetSidebar() {
  const commandManager = useCommandManager();
  const currentScreenSize = useDetectScreenSize();

  const editMode = useBoundStore((state) => state.editMode);
  const allHiddenWidgets = useBoundStore((state) => state.hiddenWidgets);
  const hiddenWidgetsForScreen = allHiddenWidgets.filter(
    (w) => w.screenSize === currentScreenSize,
  );

  const getAllHiddenQuery = api.layout.getAllHidden.useQuery({
    screenSize: currentScreenSize,
  });

  useEffect(() => {
    if (getAllHiddenQuery.status == "success") {
      Log(getAllHiddenQuery.data);
      getAllHiddenQuery.data.forEach((widget) => {
        commandManager.hideWidget(widget, currentScreenSize);
      });
    } else if (getAllHiddenQuery.status == "error") {
      Log(getAllHiddenQuery.error);
    }
  }, [
    commandManager,
    currentScreenSize,
    getAllHiddenQuery.data,
    getAllHiddenQuery.error,
    getAllHiddenQuery.status,
  ]);

  function handleAddToLayout(_widget: AdjustedWidgetLayout) {
    commandManager.unhideWidget(_widget, currentScreenSize);
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
