import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Footer";

export default function ErrorPage(props: { error: string }) {
  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="min-h-screen h-full flex flex-col justify-between text-gray-100 ">
        <Navbar />
        <main className="bg-panal-500 h-screen px-5 flex flex-col items-center justify-center">
          <p>An error occurred </p>
          <p>{props.error}</p>
        </main>
        <Footer />
      </div>
    </>
  );
}
