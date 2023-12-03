import Head from "next/head";
import Footer from "~/components/Footer";
import Link from "~/components/Link";
import Navbar from "~/components/Navbar";

export default function Login() {
  return (
    <>
      <Head>
        <title>panal</title>
        <meta
          name="description"
          content="a simple dashboard for more productivity"
        />
      </Head>
      <div className="flex h-full min-h-screen flex-col justify-between text-gray-100 ">
        <Navbar sesh={null} />
        <main className="flex h-full flex-col items-center bg-panal-500 px-5">
          <div className="flex h-screen w-screen flex-col items-center justify-center bg-panal-700 sm:flex-row">
            {/* left */}
            <div className="flex h-full w-full flex-col justify-center space-y-10 px-10 ">
              <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
                A simple dashboard for
                <br />
                more productivity
              </h1>
              <p className="italic">
                This project is still under development. More information can be
                found{" "}
                <Link
                  href={"https://github.com/cuvar/panal"}
                  tab="new"
                  className="underline"
                >
                  here
                </Link>
                .
              </p>
            </div>
            {/* right */}
            <div className="flex h-full w-full flex-col justify-center"></div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
