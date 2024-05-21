import type { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GhostButton from "./Button/GhostButton";
import Menu from "./Menu";

type Props = {
  sesh: Session | null;
};

export default function Navbar(props: Props) {
  function login() {
    void signIn();
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between px-5 py-5">
      <Link href="/">panal</Link>
      {!props.sesh && (
        <GhostButton className="px-4 py-2" onClick={login}>
          Sign in
        </GhostButton>
      )}
      {props.sesh ? <Menu /> : null}
    </nav>
  );
}
