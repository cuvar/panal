import { useAtom } from "jotai";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import { api } from "~/lib/api/api";
import Log from "~/lib/log/log";
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
import { useToast } from "~/lib/ui/hooks";
import { eyeIcon } from "~/lib/ui/icons";

export default function WidgetSidebar() {
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const showToast = useToast();

  const currentScreenSize = "sm";

  const getAllLayoutsQuery = api.layout.getAll.useQuery(undefined, {
    enabled: false,
  });
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

  const hideWidgetMutation = api.layout.setHide.useMutation({
    onSuccess: async () => {
      await getHiddenLayoutsQuery.refetch();
      const res = await getAllLayoutsQuery.refetch();
      showToast("Revealed widget successfully", "success");
      if (res.data) {
        const transformed = transformLayoutsForGrid(res.data, false);
        Log(transformed);
        setEditedWidgetLayout(transformed);
        setWidgetLayout(makeLayoutsStatic(transformed, false));
      }
    },
    onError: (error) => {
      showToast("Revealing failed", "error");
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
