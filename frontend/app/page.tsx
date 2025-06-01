'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function ETLServiceWebsite() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <h1 className="text-xl font-semibold">ETL Service</h1>
      </header>

      <main className="flex flex-1 justify-center items-center">
        <div className="flex gap-4">
          {/* Sign In Button */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>

          {/* Get Started Button (goes to signup) */}
          <Button size="sm" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
