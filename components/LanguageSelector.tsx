"use client";

import Link from "next/link";

interface LanguageSelectorProps {
  currentLang: "es" | "en";
}

export function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      {currentLang === "es" ? (
        <>
          <span className="text-2xl cursor-default" title="Español">
            🇨🇱
          </span>
          <Link
            href="/en"
            className="text-2xl hover:scale-110 transition-transform inline-block"
            title="English"
          >
            🇺🇸
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/"
            className="text-2xl hover:scale-110 transition-transform inline-block"
            title="Español"
          >
            🇨🇱
          </Link>
          <span className="text-2xl cursor-default" title="English">
            🇺🇸
          </span>
        </>
      )}
    </div>
  );
}
