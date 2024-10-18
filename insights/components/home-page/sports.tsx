"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Section, Container } from "@/components/craft";

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
      <Container className="py-12">
        <p className="text-lg mb-16 top-6">
          Elevate your gaming experience with Rockstake's comprehensive range of betting options. 
          From the thrill of traditional sports to the excitement of competitive gaming, we offer 
          a diverse selection of markets to suit every enthusiast.
        </p>
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveCategory('football')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'football' ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            Football
          </button>
          <button
            onClick={() => setActiveCategory('esports')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'esports' ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            Esports
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {(activeCategory === 'football' ? sports : esports).map(({ name, src }) => (
            <div key={name} className="flex items-center justify-center">
              <Image
                src={src}
                alt={name}
                width={96}
                height={96}
                className="opacity-100 hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Sports;