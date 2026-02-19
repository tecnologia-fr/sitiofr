"use client";

import React, { useRef, useState } from "react";
import { useReCaptcha } from "@/components/ReCaptchaProvider";

interface ReCaptchaFormWrapperProps {
  children: React.ReactNode;
  action: (formData: FormData) => Promise<void | { error?: string }>;
  className?: string;
}

export function ReCaptchaFormWrapper({
  children,
  action,
  className,
}: ReCaptchaFormWrapperProps) {
  const { executeRecaptcha } = useReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Get reCAPTCHA token
      const token = await executeRecaptcha("submit_form");

      // Create FormData from the form using formRef
      if (!formRef.current) {
        throw new Error("Form reference is null");
      }

      const formData = new FormData(formRef.current);
      
      // Add reCAPTCHA token to FormData
      formData.set("recaptcha-token", token);

      // Call the server action
      const result = await action(formData);

      if (result?.error) {
        setError(result.error);
        setIsSubmitting(false);
      }
      // If successful, the server action might redirect or handle success
    } catch (err) {
      console.error("Form submission error:", err);
      setError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      {children}
      {error && (
        <div className="text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="text-gray-700">Enviando...</div>
        </div>
      )}
    </form>
  );
}
