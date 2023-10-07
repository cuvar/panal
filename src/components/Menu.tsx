import { useAtom } from "jotai";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { env } from "~/env.mjs";
import makeLayoutsStatic from "~/server/service/makeLayoutsStaticService";
import { api } from "~/utils/api";
import {
  checkIcon,
  cogIcon,
  ellipsisIcon,
  penIcon,
  signOutIcon,
} from "~/utils/icons";
import {
  editModeAtom,
  editedWidgetLayoutAtom,
  toastTextAtom,
  toastTypeAtom,
  widgetLayoutAtom,
} from "~/utils/store";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const popoverRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const [, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [editedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);

  const setWidgetLayoutMutation = api.widget.setWidgetLayout.useMutation({
    onSuccess: () => {
      setWidgetLayout(makeLayoutsStatic(editedWidgetLayout, true));
      setToastType("success");
      setToastText(`Saved successfully`);
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
      if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (popoverRef.current && showMenu) {
      (popoverRef.current as HTMLDivElement).focus();
    }
  }, [showMenu]);

  document.addEventListener("click", function (event) {
    if (popoverRef.current == null) return;
    if (menuButtonRef.current == null) return;
    if (
      (menuButtonRef.current as HTMLButtonElement).contains(
        event.target as HTMLElement,
      )
    ) {
      setShowMenu(true);
      return;
    }
    if (
      !(popoverRef.current as HTMLDivElement).contains(
        event.target as HTMLElement,
      )
    ) {
      setShowMenu(false);
    }
  });

  function handleLogout() {
    void (async () => {
      await signOut();
    })();
  }

  function handleEllipsisClick() {
    setShowMenu(true);
  }

  function handleEditLayout() {
    setEditMode(true);
  }

  function handleSaveLayout() {
    setEditMode(false);
    setWidgetLayoutMutation.mutate({ layout: editedWidgetLayout });
  }

  return (
    <div className="z-50 space-x-2">
      <button onClick={handleEllipsisClick} ref={menuButtonRef}>
        {ellipsisIcon}
      </button>
      <div
        tabIndex={0}
        ref={popoverRef}
        className={`absolute right-4 flex flex-col space-y-2 rounded-lg bg-slate-900 px-2 py-2 shadow-xl ${
          !showMenu && "hidden"
        }`}
      >
        <button
          className="flex justify-start space-x-2 rounded-md px-4 py-2 hover:bg-slate-700 active:bg-slate-800"
          onClick={() => handleLogout()}
          onFocus={() => setShowMenu(true)}
        >
          <span>{signOutIcon}</span>
          <span>Sign Out</span>
        </button>
        <hr className="border-slate-700" />
        <Link
          className="flex justify-start space-x-2 rounded-md px-4 py-2 hover:bg-slate-700 active:bg-slate-800"
          href="/settings"
          onFocus={() => setShowMenu(true)}
        >
          <span>{cogIcon}</span>
          <span>Settings</span>
        </Link>
        <hr className="border-slate-700" />
        {editMode ? (
          <button
            className="flex justify-start space-x-2 rounded-md px-4 py-2 hover:bg-slate-700 active:bg-slate-800"
            onClick={() => handleSaveLayout()}
            onFocus={() => setShowMenu(true)}
          >
            <span>{checkIcon}</span>
            <span>Save layout</span>
          </button>
        ) : (
          <button
            className="flex justify-start space-x-2 rounded-md px-4 py-2 hover:bg-slate-700 active:bg-slate-800"
            onClick={() => handleEditLayout()}
            onFocus={() => setShowMenu(true)}
          >
            <span>{penIcon}</span>
            <span>Edit layout</span>
          </button>
        )}
      </div>
    </div>
  );
}
