"use client";

import React, { createContext, useContext, useState } from "react";

interface AnimationContextProps {
  isLoaderFinished: boolean;
  setLoaderFinished: (val: boolean) => void;
  isTransitionFinished: boolean;
  setTransitionFinished: (val: boolean) => void;
  scrollTarget: string | null;
  setScrollTarget: (target: string | null) => void;
  isPageReady: boolean;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isLoaderFinished, setLoaderFinished] = useState(false);
  const [isTransitionFinished, setTransitionFinished] = useState(true);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const isPageReady = isLoaderFinished && isTransitionFinished;

  return (
    <AnimationContext.Provider
      value={{
        isLoaderFinished,
        setLoaderFinished,
        isTransitionFinished,
        setTransitionFinished,
        scrollTarget,
        setScrollTarget,
        isPageReady
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}
