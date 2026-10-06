"use client";

import { useCallback, useState } from "react";
import {
  forgotPassword,
  getAuthToken,
  loginWithPassword,
  logout,
  startSignup,
} from "@/services/auth.service";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(getAuthToken()),
  );

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await loginWithPassword(email, password);
      setIsAuthenticated(true);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, confirmPassword: string) => {
      setLoading(true);
      try {
        const result = await startSignup(email, password, confirmPassword);
        setIsAuthenticated(true);
        return result;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const resetPassword = useCallback(
    async (
      email: string,
      newPassword: string,
      confirmPassword: string,
    ) => {
      setLoading(true);
      try {
        return await forgotPassword(email, newPassword, confirmPassword);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    logout();
    setIsAuthenticated(false);
  }, []);

  return {
    loading,
    isAuthenticated,
    login,
    signup,
    resetPassword,
    signOut,
  };
}