import { useRouter } from "next/router";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import Log from "~/lib/log/log";
import { useCommandManager, useDetectScreenSize } from "~/lib/ui/hooks";
import { useBoundStore } from "~/lib/ui/state";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

type Props = {
  children: React.ReactNode;
  widget: AdjustedWidgetLayout;
};

export default function WidgetContextMenu(props: Props) {
  const currentScreenSize = useDetectScreenSize();
  const router = useRouter();
  const commandManager = useCommandManager();
  const editMode = useBoundStore((state) => state.editMode);

  function handleHideWidget() {
    commandManager.hideWidget(props.widget, currentScreenSize);
  }

  function handleNavigate(path: string) {
    Log(`navigating to ${path}`);
    void router.push(path);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        {editMode && (
          <ContextMenuItem onClick={handleHideWidget}>
            Hide Widget
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={() => handleNavigate(`/w/${props.widget.id}`)}
        >
          Settings
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
