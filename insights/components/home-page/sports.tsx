"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Section, Container } from "@/components/craft";
import { geistSemiBold, geistRegular } from '@/app/fonts';

const sports = [
  { name: 'Bundesliga 1', src: '/football/bundesliga_1.svg' },
  { name: 'Champions League', src: '/football/champions_league.svg' },
  { name: 'Conference League', src: '/football/conference_league.svg' },
  { name: 'Europa League', src: '/football/europa_league.svg' },
  { name: 'La Liga', src: '/football/la_liga.svg' },
  { name: 'Ligue 1', src: '/football/ligue_1.svg' },
  { name: 'Nations League', src: '/football/nations_league.svg' },
  { name: 'Premier League', src: '/football/premier_league.svg' },
  { name: 'Serie A', src: '/football/serie_a.svg' },
  { name: 'World Cup', src: '/football/world_cup.svg' },
];

const esports = [
  { name: 'Counter-Strike 2', src: '/esports/counter_strike_2.svg' },
  { name: 'Dota 2', src: '/esports/dota_2.svg' },
  { name: 'FIFA', src: '/esports/fifa.svg' },
  { name: 'League of Legends', src: '/esports/league_of_legends.svg' },
];

const Sports = () => {
    const [activeCategory, setActiveCategory] = useState('football');
  
    return (
      <Section className="bg-black text-white">
        <Container className="py-12 px-0 md:px-0 lg:px-0">
          <div className="max-w-6xl mx-auto"> {/* Wrapper pentru conținut */}
            <p className={`${geistRegular.className} text-lg mb-4 text-center w-full`}>
              Elevate your gaming experience with Rockstake's comprehensive range of betting options.
              From the thrill of traditional sports to the excitement of competitive gaming, we offer
              a diverse selection of markets to suit every enthusiast.
            </p>
            <div className="flex justify-center space-x-16 mb-4">
              <span
                onClick={() => setActiveCategory('football')}
                className={`${geistSemiBold.className} text-xl cursor-pointer transition-colors duration-300 ${
                  activeCategory === 'football' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Football
              </span>
              <span
                onClick={() => setActiveCategory('esports')}
                className={`${geistSemiBold.className} text-xl cursor-pointer transition-colors duration-300 ${
                  activeCategory === 'esports' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Esports
              </span>
            </div>
            <div className={`grid gap-8 w-full justify-items-center ${
              activeCategory === 'football' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' 
                : 'grid-cols-2 md:grid-cols-4'
            }`}>
              {(activeCategory === 'football' ? sports : esports).map(({ name, src }) => (
                <div key={name} className="flex items-center justify-center">
                  <Image
                    src={src}
                    alt={name}
                    width={96}
                    height={96}
                    className="opacity-100 hover:opacity-80 transition-opacity"
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  };
  
  export default Sports;