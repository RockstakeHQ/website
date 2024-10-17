import React from 'react';
import { Section, Container } from "@/components/craft";
import { geistSemiBold, geistBold, geistRegular, geistLight, geistBlack } from '@/app/fonts';


export function GambleAwareFooter() {
  return (
    <Section>
    <div className="text-white p-4 text-center">
      <div className="flex items-center justify-center mb-2">
        <span className="bg-white text-gray-700 text-lg font-bold rounded-full p-1 mr-2">18+</span>
        <span className={`${geistSemiBold.className} text-xl md:text-2xl font-bold mb-0 md:mb-0`}>BeGambleAware.org</span>
      </div>
      <p className={`${geistRegular.className} text-sm md:text-sm text-gray-500`}>Helpline: 0808 8020 133</p>
      <p className={`${geistBold.className} text-sm md:text-lg text-red-500`}>Please Gamble Responsibly</p>
    </div>
    </Section>
  );
}

export default GambleAwareFooter;