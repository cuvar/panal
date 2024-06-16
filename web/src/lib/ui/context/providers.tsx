import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export default function Providers(props: Props) {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
}
