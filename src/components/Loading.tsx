import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LoadingSpinner() {
  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="min-h-screen h-full flex flex-col justify-between text-gray-100 ">
        <Navbar />
        <main className="bg-panal-500 h-screen px-5 flex flex-col items-center justify-center">
          Loading...
        </main>
        <Footer />
      </div>
    </>
  );
}
