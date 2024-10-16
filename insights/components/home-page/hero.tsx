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
  const [currentText, setCurrentText] = useState('Football');
  const [currentColor, setCurrentColor] = useState('#FFFFFF'); // Inițial setăm culoarea
  const texts = ['Football', 'Tennis', 'Basketball', 'Hockey', 'Baseball','Esports'];
  const colors = ['#FFFFFF', '#33FF57', '#FFA100', '#5CE1E6', '#FF3131', '#A833FF']; // Culori diferite pentru fiecare text

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prevText => {
        const currentIndex = texts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentColor(colors[nextIndex]); // Actualizează culoarea în funcție de textul curent
        return texts[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [texts, colors]);

  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <h2 className={`${agrandirWideBold.className} text-5xl mb-8`}>
          <Balancer>
            AI-Driven Insights for Smarter Betting on
          </Balancer>
        </h2>
        <h2 className={`${agrandirWideBold.className} text-5xl mb-8`} style={{ color: currentColor }}>
          <Balancer>
            {currentText}
          </Balancer>
        </h2>
        <h4 className={`${agrandirRegular.className} text-lg mb-8 text-gray-400`}>
          <Balancer>
          Leverage cutting-edge AI algorithms and comprehensive sports data to elevate your betting strategy across multiple disciplines
          </Balancer>
        </h4>
        <h4 className={`${agrandirWideBold.className} text-lg mb-0`}>
          <Balancer>
            🔥 Exclusive content on 𝕏 🔥 
          </Balancer>
        </h4>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
        {/* Primul buton - gri închis cu text alb */}
        <Button asChild className="bg-gray-800 text-white hover:bg-gray-700">
          <Link href="/">
            View Details
          </Link>
        </Button>

        {/* Al doilea buton - gradient albastru cu mov deschis și text negru */}
        <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-blue-800 hover:to-purple-800">
          <Link href="/posts">Subscribe -{">"}</Link>
        </Button>
      </div>
      </Container>
    </Section>
  );
};

export default Hero;
