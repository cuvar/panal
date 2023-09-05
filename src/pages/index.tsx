import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WidgetView from "../components/WidgetView";
import { getTokenFromCookie, verifyPassword, verifyToken } from "../utils/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/Loading";
import ErrorPage from "../components/Error";
import { seshAtom } from "../utils/state";
import { useAtom } from "jotai";
import Login from "../components/Login";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const user = useSession();

  // const [sesh, setSesh] = useAtom(seshAtom);

  // const widgetData: WidgetViewData = {
  //   calendarData: [],
  // };

  // useEffect(() => {
  //   async function authorize(): Promise<boolean> {
  //     const token = getTokenFromCookie(COOKIE_NAME);
  //     return token == "" ? false : await verifyToken(token);
  //   }
  //   authorize().then((sesh) => {
  //     setSesh(sesh);
  //   });
  // }, []);

  // const { data, isLoading, error } = useQuery(["calendarData"], async () => {
  //   const response = await fetch("/api/calendar", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       link: "https://rapla.dhbw-karlsruhe.de/rapla?page=ical&user=braun&file=TINF20B2",
  //       daysInAdvance: 7,
  //     }),
  //   }).then((res) => res.json());

  //   if (typeof response.error !== "undefined") {
  //     throw new Error(response.error);
  //   } else {
  //     return response;
  //   }
  // });

  // if (!sesh) {
  //   return <Login />;
  // }

  // if (error) {
  //   return <ErrorPage error={""} />;
  // }

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  // if (data) {
  //   widgetData.calendarData = data.calendarData;
  // }

  return (
    <>
      <Head>
        <title>panal</title>
      </Head>
      <div className="flex h-screen min-h-screen flex-col justify-between text-gray-100 ">
        <Navbar />
        <main className="bg-panal-500 flex h-full flex-col items-center px-5 py-5 md:py-10">
          Hello world
          {/* <WidgetView data={widgetData} /> */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
