"use client";
import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaValues } from "@/schema";
import { Bounce, toast } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterFormInputs } from "@/constants";
import Image from "next/image";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const form = useForm<registerSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const slides = [
    { src: "/screen1.png", alt: "Screen 1" },
    { src: "/screen2.png", alt: "Screen 2" },
    { src: "/screen3.png", alt: "Screen 3" },
    { src: "/screen4.png", alt: "Screen 4" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const onSubmit = async (values: registerSchemaValues) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", values);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Account created successfully, please login", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
      router.push("/login");
        }, 1500);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 lg:flex-row">
        <header className="p-8">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
          </Link>
        </header>
        <section className="flex items-center justify-center w-full p-6 lg:w-1/2">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold text-center text-blue-600">Create account</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {RegisterFormInputs.map((input) => (
                  <FormField
                    key={input.name}
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          <Input type={input.type} placeholder={input.placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Link href="/forget-password" className="block space-y-2 text-right text-blue-600 hover:underline">
                  Forget password?
                </Link>
                <Button type="submit" disabled={isLoading} className="w-full h-12 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Create account
                </Button>
              </form>
            </Form>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <div className="space-y-3">
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
        
        <div className="relative hidden w-full overflow-hidden lg:flex lg:w-1/2">
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
