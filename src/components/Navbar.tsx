import { signOut } from "next-auth/react";
import Button from "./Button";
import { signOutIcon } from "~/utils/icons";
import type { Session } from "next-auth";

type Props = {
  sesh: Session | null;
};

export default function Navbar(props: Props) {
  function logout() {
    void (async () => {
      await signOut();
    })();
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-panal-700 px-5 py-5">
      <div>panal</div>
      {props.sesh ? (
        <Button handler={() => logout()} className="">
          {signOutIcon}
        </Button>
      ) : null}
    </nav>
  );
}
