import { useAtom } from "jotai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/lib/api/api";
import Log from "~/lib/log/log";
import { useCommandManager, useToast } from "~/lib/ui/hooks";
import {
  checkIcon,
  crossIcon,
  ellipsisIcon,
  penIcon,
  signOutIcon,
} from "~/lib/ui/icons";
import { useHiddenWidgetsStore } from "~/lib/ui/state";
import {
  editModeAtom,
  editedWidgetLayoutAtom,
  widgetLayoutAtom,
} from "~/lib/ui/store";

export default function NewMenu() {
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [editedWidgetLayout] = useAtom(editedWidgetLayoutAtom);

  const router = useRouter();
  const showToast = useToast();
  const commandManager = useCommandManager();
  const hiddenWidgets = useHiddenWidgetsStore((state) => state.widgets);

  const setWidgetLayoutMutation = api.layout.setAll.useMutation({
    onSuccess: () => {
      setWidgetLayout(makeLayoutsStatic(editedWidgetLayout, true));
      showToast(`Saved successfully`, "success");
      location.reload();
    },
    onError: (error) => {
      showToast(`Saving failed`, "error");
      Log(error, "error");
    },
  });

  const hideWidgetMutation = api.layout.hideWidgets.useMutation({
    onError: (error) => {
      showToast("Hiding update ", "error");
      Log(error, "error");
    },
  });

  function handleLogout() {
    void (async () => {
      await signOut();
    })();
  }

  function handleEditLayout() {
    if (editMode) {
      setEditMode(false);
      commandManager.abortEdit(() => {
        // TODO: implement
      });
    } else {
      setEditMode(true);
    }
  }

  function handleSaveLayout() {
    commandManager.saveLayout(() => {
      setEditMode(false);
      setWidgetLayoutMutation.mutate({ layout: editedWidgetLayout });
      hideWidgetMutation.mutate(hiddenWidgets);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{ellipsisIcon}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleEditLayout()}>
          {editMode ? (
            <>
              <span>{crossIcon}</span>
              <span>Abort</span>
            </>
          ) : (
            <>
              <span>{penIcon}</span>
              <span>Edit Layout</span>
            </>
          )}
        </DropdownMenuItem>
        {editMode && (
          <DropdownMenuItem onClick={() => handleSaveLayout()}>
            <span>{checkIcon}</span>
            <span>Save layout</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>
          <span>{signOutIcon}</span>Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
