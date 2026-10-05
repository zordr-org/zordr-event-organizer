"use client";

import { useCallback, useEffect, useState } from "react";
import { scannerStore } from "@/features/scanner/store/scanner-store";

export function useScanner() {
  const [state, setState] = useState(scannerStore.getState());

  useEffect(() => {
    return scannerStore.subscribe(() => {
      setState(scannerStore.getState());
    });
  }, []);

  const startScanning = useCallback(() => {
    scannerStore.setState({
      isScanning: true,
      message: null,
    });
  }, []);

  const stopScanning = useCallback(() => {
    scannerStore.setState({
      isScanning: false,
    });
  }, []);

  const setScannedCode = useCallback((code: string) => {
    scannerStore.setState({
      lastCode: code,
      isScanning: false,
      message: null,
    });
  }, []);

  const setMessage = useCallback((message: string | null) => {
    scannerStore.setState({ message });
  }, []);

  const reset = useCallback(() => {
    scannerStore.reset();
  }, []);

  return {
    ...state,
    startScanning,
    stopScanning,
    setScannedCode,
    setMessage,
    reset,
  };
}