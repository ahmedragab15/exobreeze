"use client";
import type React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaValues } from "@/schema";
import { Bounce, toast } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { setCookie } from "cookies-next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const textRef = useRef(null);
  const dividerRef = useRef(null);
  const socialRef = useRef(null);
  const carouselRef = useRef(null);

  useGSAP(() => {
    gsap.set([logoRef.current, titleRef.current, formRef.current, textRef.current, dividerRef.current, socialRef.current, carouselRef.current], {
      opacity: 0,
      y: 20,
    });

    gsap.to([logoRef.current, titleRef.current, formRef.current, textRef.current, dividerRef.current, socialRef.current, carouselRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    });
  });

  const form = useForm<loginSchemaValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/screen1.webp", alt: "Screen 1" },
    { src: "/screen2.webp", alt: "Screen 2" },
    { src: "/screen3.webp", alt: "Screen 3" },
    { src: "/screen4.webp", alt: "Screen 4" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const onSubmit = async (values: loginSchemaValues) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", values);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Logged in successfully", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        let { token, user } = res.data;
        const isIndividual = !!user.individualQuestionnaire;
        user = { ...user, isIndividual };

        setCookie("token", token, { maxAge: 60 * 60 * 24 * 30 });
        setCookie("user", JSON.stringify(user), { maxAge: 60 * 60 * 24 * 30 });

        const redirectPath = res.data.user.hasCompletedQuestionnaire ? "/home" : "/welcome-aboard";

        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid email or password");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 lg:flex-row">
        <header className="p-8" ref={logoRef}>
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
          </Link>
        </header>
        <section className="flex items-center justify-center w-full p-6 lg:w-1/2">
          <div className="w-full max-w-md space-y-6">
            <h1 ref={titleRef} className="text-3xl font-bold text-center text-blue-600">
              Welcome back
            </h1>
            <div ref={formRef}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" className="h-12 border-l-0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your password" type="password" className="h-12 border-l-0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link href="/forget-password" className="block space-y-2 text-right text-blue-600 hover:underline">
                    Forget password?
                  </Link>
                  <Button type="submit" className="w-full h-12 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            </div>
            <p ref={textRef} className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
            <div ref={dividerRef} className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <div ref={socialRef} className="space-y-3">
              <Button
                className="w-full h-12 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => {
                  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/facebook`;
                }}
              >
                <Facebook className="w-5 h-5 mr-2" />
                Sign up with Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => {
                  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
                }}
              >
                <Image src="/google-icon-logo.svg" alt="google" width={20} height={20} />
                Sign up with Google
              </Button>
            </div>
          </div>
        </section>

        <div ref={carouselRef} className="relative hidden w-full overflow-hidden lg:flex lg:w-1/2">
          <div className="relative flex items-center justify-center w-full">
            <Image src={slides[currentSlide].src} alt={slides[currentSlide].alt} fill priority className="object-contain py-6" />
            <div className="absolute z-20 flex items-center gap-4 -translate-x-1/2 bottom-50 xl:bottom-24 left-1/2">
              <div className="flex gap-2">
                <Button
                  onClick={prevSlide}
                  className="flex items-center justify-center w-10 h-10 border rounded-full bg-black/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </Button>
                <Button
                  onClick={nextSlide}
                  className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </Button>
              </div>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition ${i === currentSlide ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
