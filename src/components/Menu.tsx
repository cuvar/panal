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
import { api } from "~/utils/api";
import {
  checkIcon,
  cogIcon,
  crossIcon,
  ellipsisIcon,
  penIcon,
  signOutIcon,
} from "~/utils/icons";
import Log from "~/utils/log";
import {
  editModeAtom,
  editedWidgetLayoutAtom,
  showHiddenWidgetsAtom,
  toastTextAtom,
  toastTypeAtom,
  widgetLayoutAtom,
} from "~/utils/store";

export default function NewMenu() {
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [editedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [showHiddenWidgets, setShowHiddenWidgets] = useAtom(
    showHiddenWidgetsAtom,
  );

  const router = useRouter();

  const setWidgetLayoutMutation = api.layout.setAll.useMutation({
    onSuccess: () => {
      setWidgetLayout(makeLayoutsStatic(editedWidgetLayout, true));
      setToastType("success");
      setToastText(`Saved successfully`);
      location.reload();
      setTimeout(() => {
        setToastText("");
      }, 1500);
    },
    onError: (error) => {
      setToastType("error");
      setToastText(`Saving failed`);
      setTimeout(() => {
        setToastText("");
      }, 1500);
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
    } else {
      setEditMode(true);
    }
  }

  function handleSaveLayout() {
    setEditMode(false);
    setWidgetLayoutMutation.mutate({ layout: editedWidgetLayout });
  }

  function handleShowHidden() {
    setShowHiddenWidgets(!showHiddenWidgets);
  }

  function handleNavigate(path: string) {
    void router.push(path);
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
        <DropdownMenuItem onClick={() => handleNavigate("/settings")}>
          <span>{cogIcon}</span>Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>
          <span>{signOutIcon}</span>Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
