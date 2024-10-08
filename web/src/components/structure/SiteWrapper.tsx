import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "~/components/structure/Navbar";
import Toast from "~/components/Toast";
import { APP_NAME } from "~/lib/basic/const";
import Login from "~/sites/Landing";

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
      <div className="flex min-h-screen flex-col justify-between text-foreground">
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
