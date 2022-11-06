import { useState } from "react";
import Toast from "../components/Toast";
import { seshAtom } from "../utils/state";
import { useAtom } from "jotai";
import { verifyPassword } from "../utils/auth";
import Button from "./Button";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

// todo: this is also in index.tsx -> only single place
const COOKIE_NAME = "panal_s";

export default function Login() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [barText, setBarText] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [sesh, setSesh] = useAtom(seshAtom);

  function passwordAuth() {
    async function authenticate(): Promise<boolean> {
      return await verifyPassword(user, pwd, COOKIE_NAME);
    }

    authenticate()
      .then((valid: boolean) => {
        setSesh(valid);
        if (!valid) {
          toggleMessageToast("Wrong credentials");
          setPwd("");
          return;
        }
        setUser("");
        setPwd("");
      })
      .catch((e) => {
        console.error(e);
        setUser("");
        setPwd("");
      });
  }

  function toggleMessageToast(msg: string) {
    setBarText(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  }

  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="min-h-screen h-full flex flex-col justify-between text-gray-100 ">
        <Navbar />
        <main className="bg-panal-500 h-full px-5 flex flex-col items-center">
          <div className="flex flex-col space-y-2 justify-center h-screen">
            <input
              placeholder="username"
              value={user}
              className="text-black rounded-sm p-2"
              onChange={(e) => setUser(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passwordAuth();
                }
              }}
            />
            <input
              placeholder="password"
              value={pwd}
              className="text-black rounded-sm p-2"
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passwordAuth();
                }
              }}
            />
            <Button handler={() => passwordAuth()}>Login</Button>
          </div>
          {showToast && <Toast text={barText} kind="error" />}
        </main>
        <Footer />
      </div>
    </>
  );
}
