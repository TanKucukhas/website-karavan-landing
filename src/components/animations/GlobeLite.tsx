"use client";

// Placeholder GlobeLite without external deps. If lottie-react is added later,
// replace this with a dynamic import and render the Lottie.

export default function GlobeLite({ jsonUrl }: { jsonUrl: string }) {
  // TODO: integrate lottie-react dynamically when dependency is available.
  return <div className="absolute inset-0 -z-10 opacity-70 pointer-events-none" aria-hidden />;
}

