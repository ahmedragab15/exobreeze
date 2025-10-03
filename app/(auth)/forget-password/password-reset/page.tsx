"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordValues } from "@/schema";
import { Bounce, toast } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
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

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }
    setIsLoading(true);
    try {
      // const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
      //   password: values.password,
      // });
      // if (res.status >= 200 && res.status < 300) {
      //   toast.success("Password reset successfully", {
      //     position: "top-right",
      //     autoClose: 2000,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      //   setTimeout(() => {
      router.push("/welcome-aboard");
      //   }, 1500);
      // }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 flex-col lg:flex-row">
        <header className="p-8">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} className="h-auto w-36 object-cover" alt="Logo" />
          </Link>
        </header>
        <section className="w-full lg:w-1/2 flex flex-col min-h-screen p-6">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <h1 className="text-3xl font-bold text-blue-600 text-center">Password reset</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your new password</FormLabel>
                        <FormControl>
                          <Input placeholder="New password" type="password" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg rounded-lg" disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset password"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="mr-auto ml-10">
            <Button
              variant={"ghost"}
              className="w-full h-12 cursor-pointer hover:bg-white/90 text-black text-lg rounded-lg"
              onClick={() => router.back()}
            >
              <ArrowLeft />
              Back
            </Button>
          </div>
        </section>

        <div className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden">
          <div className="relative w-full flex items-center justify-center">
            <Image src={slides[currentSlide].src} alt={slides[currentSlide].alt} fill priority className="object-contain py-6" />
            <div className="absolute bottom-50 xl:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
              <div className="flex gap-2">
                <Button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </Button>
                <Button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30"
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
