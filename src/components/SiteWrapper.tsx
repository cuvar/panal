import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import Login from "~/sites/Landing";
import { APP_NAME } from "~/utils/const";
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
        <title>{APP_NAME}</title>
      </Head>
      <div className="flex min-h-screen flex-col justify-between text-gray-100">
        <Navbar sesh={data} />
        <main className="flex h-full w-full flex-col items-center bg-background px-5 py-5 md:py-10">
          {props.children}
        </main>
        <div className="flex w-full justify-center">
          <Toast />
        </div>
      </div>
    </>
  );
}
