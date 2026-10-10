"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [shake, setShake] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
    } else {
      setMessage(value);
      if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", message: "" };

    if (!email) {
      newErrors.email = "WHERE SHOULD WE SEND THE REPLY?";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "THAT EMAIL LOOKS A BIT RAW...";
    }

    if (!message) {
      newErrors.message = "FORGOT TO ADD THE SAUCE?";
    } else if (message.length < 10) {
      newErrors.message = "COULD BE A LITTLE JUICIER...";
    }

    if (newErrors.email || newErrors.message) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus("sending");

    // Simulate sending form
    setTimeout(() => {
      setStatus("success");
      setModalOpen(true);
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 1000);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-red flex flex-col justify-center items-center w-full px-[5vw] py-[8vw] relative overflow-hidden select-none">
        {/* Floating stickers for desktop */}
        <div className="w-[20vw] max-md:hidden h-auto absolute top-[8vw] left-[5vw] z-50 animate-bounce duration-1000 pointer-events-none">
          <img
            src="/img-webp/fries.webp"
            alt="Fries sticker"
            className="w-full h-auto rotate-[-12deg] hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="w-[25vw] max-md:hidden h-auto absolute top-[20vw] right-[2vw] z-50 animate-bounce duration-[1500ms] pointer-events-none">
          <img
            src="/cafe/coffee-late.png"
            alt="Coffee sticker"
            className="w-full h-auto rotate-[15deg] hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-[2vw] max-md:gap-[8vw] w-full max-w-[45vw] max-md:max-w-full text-center mt-[4vw]">
          <div className="relative z-20 gap-[2vw] w-full flex flex-col items-center">
            <p className="-rotate-9 max-md:rotate-0 text-mustard-dark text-stroke-180 text-center text-[2.8vw] font-playfair leading-[.9]! max-md:text-[8vw] uppercase">
              SAY HELLO
            </p>
            <h1 className="text-center text-stroke-180 text-beige relative z-20 font-mouse-memoirs text-[5vw] max-md:text-[12vw] leading-[.8] uppercase tracking-wider">
              GOT A CRAVING?<br />LET'S TALK
            </h1>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className={`w-full bg-white/5 border border-white/10 p-[3vw] max-md:p-[6vw] rounded-[2vw] max-md:rounded-[4vw] flex flex-col gap-[2vw] max-md:gap-[6vw] transition-transform duration-300 ${shake ? "animate-shake" : ""
              }`}
          >
            {/* Email Input */}
            <div className="relative group text-left">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="YOUR BEST EMAIL"
                className={`w-full bg-transparent border-b outline-none py-[1vw] max-md:py-[3vw] font-mouse-memoirs text-[1.5vw] max-md:text-[5vw] text-white transition-all duration-300 placeholder:text-white/30 uppercase tracking-widest ${errors.email ? "border-mustard" : "border-white/20 focus:border-mustard"
                  }`}
              />
              {errors.email && (
                <p className="absolute left-0 -bottom-[1.2vw] max-md:-bottom-[5vw] text-[0.8vw] max-md:text-[3vw] font-mouse-memoirs text-mustard uppercase tracking-wider">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Input */}
            <div className="relative group text-left mt-2">
              <textarea
                name="message"
                rows={3}
                maxLength={100}
                value={message}
                onChange={handleInputChange}
                placeholder="TELL US YOUR CRAVING..."
                className={`w-full bg-transparent border-b outline-none py-[1vw] max-md:py-[3vw] font-mouse-memoirs text-[1.5vw] max-md:text-[5vw] text-white transition-all duration-300 placeholder:text-white/30 uppercase tracking-widest resize-none min-h-[5vw] max-md:min-h-[15vw] ${errors.message ? "border-mustard" : "border-white/20 focus:border-mustard"
                  }`}
              />
              {errors.message && (
                <p className="absolute left-0 -bottom-[1.2vw] max-md:-bottom-[5vw] text-[0.8vw] max-md:text-[3vw] font-mouse-memoirs text-mustard uppercase tracking-wider">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-[2vw]">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-[1vw] max-md:py-[3vw] rounded-full border-[0.15vw] border-white/20 text-white font-mouse-memoirs uppercase text-[1.5vw] max-md:text-[5vw] tracking-wider transition-all duration-300 bg-transparent hover:bg-white hover:text-red cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                {status === "sending" ? "SENDING..." : "SEND CRAVING"}
              </button>
            </div>
          </form>
        </div>

        {/* Modal Dialog */}
        {modalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-[2vw] max-md:rounded-[4vw] p-[3vw] max-md:p-[6vw] max-w-[30vw] max-md:max-w-[85vw] text-center space-y-[2vw] border border-black/10 shadow-2xl relative">
              <span className="inline-block px-[1vw] max-md:px-[3vw] py-[.4vw] rounded-full bg-red text-white font-mouse-memoirs text-[0.8vw] max-md:text-[3vw] tracking-widest uppercase">
                Notice
              </span>
              <h2 className="font-playfair text-[2vw] max-md:text-[6vw] text-red leading-none uppercase">
                Concept Website
              </h2>
              <p className="font-mouse-memoirs text-[1.2vw] max-md:text-[4vw] text-black/70 leading-[1.4] uppercase">
                This is a concept website created by Anyflow Agency. If you are looking for brand design and development like this, you can reach out to us at anyflowagency@gmail.com
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-full py-[1vw] max-md:py-[3vw] bg-red text-white rounded-full font-mouse-memoirs uppercase text-[1.3vw] max-md:text-[4vw] tracking-wider hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

