import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Footer";
import Button from "../components/Button";
import Toast from "../components/Toast";
import WidgetView from "../components/WidgetView";
import { getTokenFromCookie, verifyPassword, verifyToken } from "../utils/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const COOKIE_NAME = "panal_s";

const Home: NextPage = () => {
  const [user, setUser] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [sesh, setSesh] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [barText, setBarText] = useState<string>("");

  useEffect(() => {
    async function authorize(): Promise<boolean> {
      const token = getTokenFromCookie(COOKIE_NAME);
      return token == "" ? false : await verifyToken(token);
    }
    authorize().then((sesh) => {
      setSesh(sesh);
    });
  }, []);

  const widgetData: WidgetViewData = {
    calendarData: {},
  };

  const { data, isLoading, error } = useQuery(["calendarData"], () => {
    return fetch("/api/calendar").then((res) => res.json());
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  if (data) {
    console.log(data);
  }

  function toggleMessageToast(msg: string) {
    setBarText(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  }

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

  function logout() {
    setSesh(false);
    document.cookie =
      "panal_s=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function updatePwd(e: any) {
    setPwd(e.target.value);
  }
  function updateUser(e: any) {
    setUser(e.target.value);
  }

  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="min-h-screen h-screen flex flex-col justify-between text-gray-100 ">
        <Navbar />
        <main className="bg-panal-500 h-full px-5 flex flex-col items-center">
          {sesh ? (
            <>
              <div className="w-full flex justify-end mt-4">
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
              </div>
              <WidgetView data={widgetData} />
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-2 justify-center h-full">
                <input
                  placeholder="username"
                  value={user}
                  className="text-black rounded-sm p-2"
                  onChange={(event) => updateUser(event)}
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
                  onChange={(event) => updatePwd(event)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      passwordAuth();
                    }
                  }}
                />
                <Button handler={() => passwordAuth()}>Login</Button>
              </div>
              {showToast && <Toast text={barText} kind="error" />}
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
