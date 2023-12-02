import Head from "next/head";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

import { signIn } from "next-auth/react";

export default function Login() {
  function login() {
    void (async () => {
      await signIn();
    })();
  }

  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="flex h-full min-h-screen flex-col justify-between text-gray-100 ">
        <Navbar sesh={null} />
        <main className="flex h-full flex-col items-center bg-panal-500 px-5">
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col space-y-4">
              <h1 className="text-xl font-bold">Not signed in</h1>
              <button
                className="hover:underline active:text-blue-500"
                onClick={login}
              >
                Sign in
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
