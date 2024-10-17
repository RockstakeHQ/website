"use client";
import React from 'react';
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { geistExtraBold, geistLight, geistBold, geistMedium, geistMonoRegular, geistMonoBold, geistRegular} from '@/app/fonts';

const Hero = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center max-w-full px-2 mb-32">
        <h2 className={`${geistBold.className} text-3xl md:text-4xl lg:text-4xl mb-8 text-white`}>
          <Balancer>
            <span className="block md:inline">The Quantum-Betting</span>
            <span className="block md:inline md:ml-2">Accelerator</span>
          </Balancer>
        </h2>
        <h5 className={`${geistMonoRegular.className} text-lg mb-8 text-gray-500 max-w-xl mx-auto`}>
          <Balancer>
            Rockstake harnesses state-of-the-art AI to decode 𝕏 sentiment, converting social media buzz into precise betting intelligence.
          </Balancer>
        </h5>
        <h5 className={`${geistMonoRegular.className} text-sm mb-0 bg-[#090909] text-white px-4 py-2 rounded-full inline-flex items-center border border-[#333333]`}>
          <span className="mr-2 text-white bg-[#300037] px-2 py-0.5 rounded-full text-xs font-bold">PRO</span>
          Exclusive content on 𝕏
        </h5>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild className="bg-gray-800 text-white hover:bg-gray-700">
            <Link href="/">Explore</Link>
          </Button>
          <Button asChild className="bg-[#AC00C2] text-white">
            <Link href="/posts">Subscribe</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;