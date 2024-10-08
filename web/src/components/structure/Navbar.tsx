import type { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Menu from "~/components/Menu";
import WidgetSidebar from "~/components/WidgetSidebar";
import { Button } from "~/components/ui/button";
import { APP_NAME } from "~/lib/basic/const";

type Props = {
  sesh: Session | null;
};

export default function Navbar(props: Props) {
  function login() {
    void signIn();
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between px-5 py-5">
      <Link href="/">{APP_NAME}</Link>
      {props.sesh ? (
        <div className="flex items-center space-x-4">
          <WidgetSidebar />
          <Menu />
        </div>
      ) : (
        <Button variant="ghost" onClick={login}>
          Sign in
        </Button>
      )}
    </nav>
  );
}
