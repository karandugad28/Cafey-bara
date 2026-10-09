"use client";

import React, { ReactNode } from "react";

export default function FullPageScroll({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#0a0a0a]">
      {React.Children.map(children, (child, idx) => (
        <section key={idx} className="w-full h-screen snap-start relative">
          {child}
        </section>
      ))}
    </div>
  );
}
