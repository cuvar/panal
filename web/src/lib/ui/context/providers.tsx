import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import CommandManager from "../commands/commandManager";
import { CommandContext } from "./command";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export default function Providers(props: Props) {
  return (
    <SessionProvider session={props.session}>
      <CommandContext.Provider value={CommandManager.instance}>
        {props.children}
      </CommandContext.Provider>
    </SessionProvider>
  );
}
