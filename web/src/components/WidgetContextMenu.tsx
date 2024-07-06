import { useAtom } from "jotai";
import { useRouter } from "next/router";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import Log from "~/lib/log/log";
import { useCommandManager, useDetectScreenSize } from "~/lib/ui/hooks";
import { editedWidgetLayoutAtom } from "~/lib/ui/store";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

type Props = {
  children: React.ReactNode;
  widget: AdjustedWidgetLayout;
};

export default function WidgetContextMenu(props: Props) {
  const [editedWidgetLayout, setEditedWidgetLayout] = useAtom(
    editedWidgetLayoutAtom,
  );
  const currentScreenSize = useDetectScreenSize();
  const router = useRouter();
  const commandManager = useCommandManager();

  function handleHideWidget() {
    commandManager.hideWidget(props.widget, currentScreenSize);
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
    Log(`navigating to ${path}`);
    void router.push(path);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleHideWidget}>
          Hide Widget
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => handleNavigate(`/w/${props.widget.id}`)}
        >
          Settings
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
