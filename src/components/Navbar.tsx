import type { Session } from "next-auth";
import Link from "next/link";
import Menu from "./Menu";

type Props = {
  sesh: Session | null;
};

export default function Navbar(props: Props) {
  return (
    <nav className="flex h-20 w-full items-center justify-between bg-panal-700 px-5 py-5">
      <Link href="/">panal</Link>
      {props.sesh ? <Menu /> : null}
    </nav>
  );
}
