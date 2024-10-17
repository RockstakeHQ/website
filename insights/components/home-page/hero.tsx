"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { geistBold, geistMonoRegular, geistMonoSemiBold, geistSemiBold } from '@/app/fonts';

const Hero = () => {
  return (
    <Section className="px-0">
      <Container className="flex flex-col items-center text-center w-full mb-32 px-0 md:px-0">
        <h2 className={`${geistBold.className} text-4xl md:text-6xl lg:text-7xl xl:text-7xl mb-8 md:mb-6 text-white mt-36 md:mt-42 w-full px-0`}>
          <span className="block md:inline">The Quantum-Betting Accelerator</span>
        </h2>
        <h5 className={`${geistMonoRegular.className} text-lg md:text-xl mb-16 md:mb-6 text-gray-500 w-full max-w-3xl`}>
          Rockstake harnesses state-of-the-art AI to decode 𝕏 sentiment, converting social media buzz into precise betting intelligence.
        </h5>
        <h5 className={`${geistMonoSemiBold.className} text-sm mb-2 md:mb-6 bg-[#090909] text-white px-4 py-2 rounded-full inline-flex items-center border border-[#333333]`}>
          <span className="mr-2 text-white bg-[#300037] px-2 py-0.5 rounded-full text-xs font-bold">PRO</span>
          Exclusive content on 𝕏
        </h5>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 mt-4">
        <Button
            className={cn(
              geistSemiBold.className,
              `bg-[#AC00C2] text-white
              px-6 py-3 h-12 w-full md:w-48 lg:w-56
              rounded-lg
              transition-all duration-200 ease-in-out
              hover:bg-[#AC00C2]/80 focus:bg-[#AC00C2]/80
              active:bg-[#AC00C2]/70
              outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#AC00C2]`
            )}
          >
            Subscribe
          </Button>
          <Button
            className={cn(
              geistSemiBold.className,
              `bg-black text-white border border-gray-600
              px-6 py-3 h-12 w-full md:w-48 lg:w-56
              rounded-lg
              transition-all duration-200 ease-in-out
              hover:bg-white/5 focus:bg-white/5
              active:bg-white/10
              outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600`
            )}
          >
            Explore
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;