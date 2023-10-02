import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cogIcon, ellipsisIcon, signOutIcon } from "~/utils/icons";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const popoverRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (popoverRef.current && showMenu) {
      (popoverRef.current as HTMLDivElement).focus();
    }
  }, [showMenu]);

  function handleLogout() {
    void (async () => {
      await signOut();
    })();
  }

  function onHandleEllipsisClick() {
    setShowMenu(true);
  }

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

  return (
    <div className="z-50 space-x-2">
      <button onClick={onHandleEllipsisClick} ref={menuButtonRef}>
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
      </div>
    </div>
  );
}
