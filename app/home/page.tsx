"use client";
import React, { useEffect, useState } from "react";
import FirmHome from "./FirmHome";
import IndividualHome from "./IndividualHome";
import { getCookie } from "cookies-next";
import { RotateLoader } from "react-loadly";
import Header from "@/components/layout/Header";

const Page = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie as string));
      } catch (err) {
        console.error("Error parsing user cookie:", err);
      }
    }
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className="z-50 flex items-center justify-center min-h-screen">
          <RotateLoader color="#ff8080" size={60} speed={1.5} loadingText="Loading..." count={5} borderWidth={6} />
        </div>
      </>
    );
  }

  const isIndividual = user?.isIndividual ? true : false;
  return <>{isIndividual ? <IndividualHome /> : <FirmHome />}</>;
};

export default Page;
