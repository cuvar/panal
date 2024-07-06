import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
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
import { useBoundStore } from "~/lib/ui/state";

export default function NewMenu() {
  const editMode = useBoundStore((state) => state.editMode);
  const editedWidgetLayout = useBoundStore((state) => state.editedWidgetLayout);
  const hiddenWidgets = useBoundStore((state) => state.hiddenWidgets);

  const router = useRouter();
  const showToast = useToast();
  const commandManager = useCommandManager();

  const setWidgetLayoutMutation = api.layout.setAll.useMutation({
    onSuccess: () => {
      showToast(`Saved successfully`, "success");
      router.reload();
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
      commandManager.abortEdit();
    } else {
      commandManager.initEdit();
    }
  }

  function handleSaveLayout() {
    // TODO: COMMAND
    commandManager.saveEditLayout(() => {
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
