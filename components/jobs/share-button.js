"use client";

import { useState } from "react";

export default function ShareButton({ styling }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button onClick={handleShare} className={styling}>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
