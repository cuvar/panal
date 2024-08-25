export interface Command {
  name: string;
  description: string;
  session: string;
  run: () => void;
  rollback: () => void;
}
