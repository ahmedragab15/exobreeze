"use client";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressColor({ progressWidth }: { progressWidth: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressWidth), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6 bg-white rounded-md">
      <Progress value={progress} className={`w-[100%] h-4 [&>div]:bg-yellow-300`} />
    </div>
  );
}
