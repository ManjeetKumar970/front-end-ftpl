"use client";
import React, { useState } from "react";
import { loginTypes } from "./types/types";
import { loginService } from "./services";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import onlyLogo from "../../assets/main_only_logo.png";
import BtnLoadingAnimation from "@/components/btnLoadingAnimation/btnLoadingAnimation";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<loginTypes>({
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginService(formData);
      if (response?.status === "success") {
        localStorage.setItem("access_token", response?.data?.access_token);
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white vie-primary_light to-primary_mid px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative transform overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 border border-gray-200 hover:shadow-xl"
        >
          <div className="text-center">
            <Image
              src={onlyLogo}
              alt="Company Logo"
              width={800}
              height={64}
              priority
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
              Sign In to Your Account
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                required
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                required
                autoComplete="current-password"
                minLength={6}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-primary_dark hover:text-primary_dark"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              onClick={(e) => submitHandler(e)}
              className="w-full px-4 py-2 bg-primary_dark text-white rounded-md flex items-center justify-center gap-2"
            >
              {!isLoading ? "Verify email" : <BtnLoadingAnimation />}
            </motion.button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary_dark hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
