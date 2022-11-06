import { useAtom } from "jotai";
import { seshAtom } from "../utils/state";
import Button from "./Button";

export default function Navbar() {
  const [sesh, setSesh] = useAtom(seshAtom);

  function logout() {
    setSesh(false);
    document.cookie =
      "panal_s=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  return (
    <nav className="w-full h-20 bg-panal-700 py-5 px-5 flex justify-between items-center">
      <div>panal</div>
      {sesh ? (
        <Button handler={() => logout()} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </Button>
      ) : null}
    </nav>
  );
}
