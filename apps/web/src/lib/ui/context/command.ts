import { createContext } from "react";
import CommandManager from "../commands/commandManager";

export const CommandContext = createContext(CommandManager.instance);
