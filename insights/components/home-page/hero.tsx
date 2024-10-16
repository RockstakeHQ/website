"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { agrandirWideBold, agrandirWideLight, agrandirRegular } from '@/app/fonts';

const Hero = () => {
  const [currentSport, setCurrentSport] = useState('Football');
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const sports = ['Football', 'Tennis', 'Basketball', 'Hockey', 'Baseball', 'Esports'];
  const sportColors = ['#FFFFFF', '#33FF57', '#FFA100', '#5CE1E6', '#FF3131', '#A833FF'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSport(prevSport => {
        const currentIndex = sports.indexOf(prevSport);
        const nextIndex = (currentIndex + 1) % sports.length;
        setCurrentColor(sportColors[nextIndex]);
        return sports[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <Container className="flex flex-col items-center text-center max-w-full px-4">
        <h3 className={`${agrandirWideBold.className} text-4xl mb-4`}>
          <Balancer>
            Bet on {currentSport}
          </Balancer>
        </h3>
        <h3 className={`${agrandirWideBold.className} text-2xl mb-8`} style={{ color: currentColor }}>
          <Balancer>
            with AI & Human Insight
          </Balancer>
        </h3>
        <h4 className={`${agrandirRegular.className} text-lg mb-8 text-gray-500 max-w-xl mx-auto`}>
          <Balancer>
            Unleash a betting advantage with the synergy of AI data analysis and the subtleties of human emotion in every sport.
          </Balancer>
        </h4>
        <h4 className={`${agrandirWideBold.className} text-lg mb-0`}>
          <Balancer>
            🔥 Exclusive content on 𝕏 🔥 
          </Balancer>
        </h4>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild className="bg-gray-800 text-white hover:bg-gray-700">
            <Link href="/">View Details</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-blue-800 hover:to-purple-800">
            <Link href="/posts">Subscribe -{">"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;