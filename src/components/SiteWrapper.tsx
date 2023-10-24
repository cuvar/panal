import { useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Login from "~/sites/Login";
import Toast from "./Toast";

type Props = {
  children: React.ReactNode;
};
export default function SiteWrapper(props: Props) {
  const { data } = useSession();

  if (!data) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="flex h-screen min-h-screen flex-col justify-between text-gray-100 ">
        <Navbar sesh={data} />
        <main className="flex h-full w-full flex-col bg-panal-500 px-5 py-5 md:py-10 items-center">
          {props.children}
        </main>
        <div className="flex w-full justify-center">
          <Toast />
        </div>
        <Footer />
      </div>
    </>
  );
}
