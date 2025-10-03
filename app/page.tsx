"use client";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function HomePage() {
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.set([logoRef.current, descriptionRef.current, buttonsRef.current, footerRef.current], {
      opacity: 0,
      y: 30,
    });
    const split = new SplitText(headingRef.current, { type: "words", mask: "words" });
    gsap.set(split.words, { opacity: 0, y: 50 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
      .to(
        split.words,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.4"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4"
      );
  });

  return (
    <div className="relative z-10 min-h-screen overflow-hidden">
      <video src="/video.mp4" autoPlay loop muted playsInline className="absolute inset-0 object-cover w-full h-full -z-10" />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <header className="p-6">
        <div className="flex items-center gap-2" ref={logoRef}>
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-12 ">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 ref={headingRef} className="text-4xl font-bold text-blue-600 md:text-5xl text-balance">
              Breathe Better, Live Smarter
            </h1>
            <p ref={descriptionRef} className="text-lg text-white">
              Get clear, reliable air quality insights from satellites, ground sensors, and weather data, All in one easy-to-use platform.
            </p>
          </div>
          <div ref={buttonsRef} className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg text-blue-600 bg-transparent border-blue-600 rounded-lg hover:bg-blue-50"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer ref={footerRef} className="my-10 text-sm text-center text-gray-200">
        ©2025 | EXOBreeze
      </footer>
    </div>
  );
}
