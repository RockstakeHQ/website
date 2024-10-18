import React from 'react';
import Image from 'next/image';
import { Section, Container } from "@/components/craft";
import GithubIcon from "@/public/channels/github.svg";
import TwitterIcon from "@/public/channels/twitter.svg";
import { geistSemiBold, geistBold, geistRegular, geistLight } from '@/app/fonts';

const Footer = () => {
  return (
    <Section className="px-0">
      <footer className="text-white w-full">
        <div className="w-full md:max-w-7xl md:mx-auto px-0 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="mb-6 md:mb-0 md:w-1/3">
              <h2 className={`${geistSemiBold.className} text-xl md:text-lg font-bold mb-0 md:mb-0`}>Rockstake</h2>
              <div className="flex space-x-4 mb-2 md:mb-0">
                <Image src={TwitterIcon} alt="Twitter" width={20} height={20} className="text-gray-400 hover:text-white cursor-pointer" />
                <Image src={GithubIcon} alt="GitHub" width={20} height={20} className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12 md:w-2/3 md:justify-end">
              <div className="mb-4 md:mb-0">
                <h3 className={`${geistLight.className} text-base md:text-sm mb-2`}>Features</h3>
                <div className="flex flex-col space-y-1 md:space-y-2">
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Model</span>
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Pricing</span>
                </div>
              </div>
              <div className="mb-4 md:mb-0">
                <h3 className={`${geistLight.className} text-base md:text-sm mb-2`}>Company</h3>
                <div className="flex flex-col space-y-1 md:space-y-2">
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Story</span>
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Live Indicators</span>
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Updates</span>
                </div>
              </div>
              <div>
                <h3 className={`${geistLight.className} text-base md:text-sm mb-2`}>Legal</h3>
                <div className="flex flex-col space-y-1 md:space-y-2">
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Cookie Policy</span>
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Privacy Policy</span>
                  <span className="text-gray-500 text-sm md:text-xs cursor-pointer hover:text-white">Terms of Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Section>
  );
};

export default Footer;