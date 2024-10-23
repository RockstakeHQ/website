// scripts/create-ticket.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Match {
  team1: string;
  team2: string;
  match_date: string;
  prediction: string;
  odds: number;
  competition: string;
}

function calculateTotalOdds(matches: Match[]): number {
  return Number(matches.reduce((total, match) => total * match.odds, 1).toFixed(2));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function generateContent(matches: Match[]): string {
  const totalOdds = calculateTotalOdds(matches);
  
  const matchesContent = matches.map(match => `
### ${match.team1} vs ${match.team2}
- 🏆 Competiție: ${match.competition}
- ⏰ Data: ${formatDate(match.match_date)}
- 🎯 Pronostic: ${match.prediction}
- 📈 Cotă: ${match.odds}`).join('\n\n');

  return `# Bilet cu cotă ${totalOdds}

Am pregătit un bilet cu ${matches.length} meciuri atent selectate.

## Meciurile Selectate
${matchesContent}

## Cotă Totală: ${totalOdds}

Succes! 🍀`;
}

async function createTicket() {
  try {
    // MODIFICI DOAR MECIURILE AICI:
    const matches = [
      {
        team1: 'Arsenal',
        team2: 'Liverpool',
        match_date: '2024-02-24 18:30:00+00',
        prediction: 'Peste 2.5 goluri',
        odds: 1.75,
        competition: 'Premier League'
      },
      {
        team1: 'Manchester City',
        team2: 'Brentford',
        match_date: '2024-02-25 17:00:00+00',
        prediction: '1',
        odds: 1.65,
        competition: 'Premier League'
      },
      {
        team1: 'Newcastle',
        team2: 'Manchester United',
        match_date: '2024-02-25 19:30:00+00',
        prediction: 'GG',
        odds: 1.95,
        competition: 'Premier League'
      }
    ];

    // Calculăm automat cota totală
    const totalOdds = calculateTotalOdds(matches);
    
    // Generăm automat conținutul
    const content = generateContent(matches);

    // Generăm titlul bazat pe cotă
    const title = `Bilet Bonus Cotă ${totalOdds} - ${new Date().toLocaleDateString('ro-RO', { weekday: 'long' })}`;

    const { data: ticket, error: ticketError } = await supabase
      .from('articles')
      .insert({
        title,
        content,
        sport_type: 'football',
        article_type: 'ticket',
        total_odds: totalOdds,
        status: 'published',
        meta_description: `Bilet de fotbal cu cotă ${totalOdds} pentru ${matches.length} meciuri din ${[...new Set(matches.map(m => m.competition))].join(', ')}`
      })
      .select()
      .single();

    if (ticketError) {
      throw ticketError;
    }

    const { error: matchesError } = await supabase
      .from('matches')
      .insert(
        matches.map(match => ({
          ...match,
          article_id: ticket.id,
          is_verified: true
        }))
      );

    if (matchesError) {
      throw matchesError;
    }

    console.log('✅ Biletul a fost creat cu succes!');
    console.log('📝 ID bilet:', ticket.id);
    console.log('💰 Cotă totală:', totalOdds);
    console.log('\nConținut generat:');
    console.log(content);

  } catch (error) {
    console.error('❌ Eroare:', error);
  }
}

createTicket();