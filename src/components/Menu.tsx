import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ellipsisIcon, penIcon, signOutIcon } from "~/utils/icons";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (popoverRef.current && showMenu) {
      (popoverRef.current as HTMLDivElement).focus();
      console.log("focussing");
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

  function handleBlur() {
    setShowMenu(false);
  }

  function handleEdit() {
    // todo:
  }
  return (
    <div className="space-x-2">
      <button onClick={onHandleEllipsisClick}>{ellipsisIcon}</button>
      <div
        onBlur={() => handleBlur()}
        tabIndex={0}
        ref={popoverRef}
        className={`absolute right-4 flex flex-col space-y-2 rounded-lg bg-slate-900 px-2 py-2 shadow-xl ${
          !showMenu && "hidden"
        }`}
      >
        <button
          className="flex justify-start space-x-2 rounded-md px-4 py-2 hover:bg-slate-700 active:bg-slate-800"
          onClick={() => handleLogout()}
        >
          <span>{signOutIcon}</span>
          <span>Sign Out</span>
        </button>
        <hr className="border-slate-700" />
        <button
          className="flex justify-start space-x-2 rounded-md px-4 py-2 hover:bg-slate-700 active:bg-slate-800"
          onClick={() => handleEdit()}
        >
          <span>{penIcon}</span>
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
