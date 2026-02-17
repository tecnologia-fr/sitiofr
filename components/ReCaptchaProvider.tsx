"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ReCaptchaContextType {
  executeRecaptcha: (action: string) => Promise<string>;
  isReady: boolean;
}

const ReCaptchaContext = createContext<ReCaptchaContextType | null>(null);

export function useReCaptcha() {
  const context = useContext(ReCaptchaContext);
  if (!context) {
    throw new Error("useReCaptcha must be used within ReCaptchaProvider");
  }
  return context;
}

interface ReCaptchaProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined");
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setIsReady(true);
      });
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      }
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        `script[src^="https://www.google.com/recaptcha/api.js"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [siteKey]);

  const executeRecaptcha = async (action: string): Promise<string> => {
    if (!siteKey) {
      throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined");
    }

    if (!isReady) {
      throw new Error("reCAPTCHA is not ready yet");
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error("Error executing reCAPTCHA:", error);
      throw error;
    }
  };

  return (
    <ReCaptchaContext.Provider value={{ executeRecaptcha, isReady }}>
      {children}
    </ReCaptchaContext.Provider>
  );
}
