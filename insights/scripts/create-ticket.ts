// scripts/create-ticket.ts
import { generatePredictionImage, generateThumbnailImage } from '@/lib/image-generator';
import { uploadImage } from '@/lib/image-uploader';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface Match {
  team1: string;
  team2: string;
  match_date: string;
  prediction: string;
  odds: number;
  competition: string;
  argument?: string;
}

interface UploadResult {
  path: string;
  url: string;
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

function groupMatches(matches: Match[]): Match[][] {
  const groups: Match[][] = [];
  for (let i = 0; i < matches.length; i += 2) {
    groups.push(matches.slice(i, i + 2));
  }
  return groups;
}

async function createTicket() {
  try {
    const matches: Match[] = [
      {
        team1: "Real Madrid",
        team2: "Barcelona",
        match_date: "2024-02-24 20:30:00+00",
        prediction: "1X",
        odds: 1.65,
        competition: "La Liga",
        argument: "Real Madrid vine după o serie de victorii și are lot complet."
      },
      {
        team1: "Manchester United",
        team2: "Liverpool",
        match_date: "2024-02-24 18:00:00+00",
        prediction: "Over 2.5",
        odds: 1.80,
        competition: "Premier League",
        argument: "Ambele echipe au demonstrat că pot marca și primi goluri ușor."
      }
    ];

    const totalOdds = Number(
      matches.reduce((total, match) => total * match.odds, 1).toFixed(2)
    );

    // Generăm și încărcăm thumbnail-ul
    const thumbnailBuffer = await generateThumbnailImage(matches, matches.length);
    const thumbnail = await uploadImage(
      thumbnailBuffer,
      'thumbnails',
      `ticket-${Date.now()}`
    );

    // Grupăm meciurile câte 2
    const matchGroups = groupMatches(matches);

    // Generăm și încărcăm imagini pentru fiecare grup
    const predictionImages = await Promise.all(
      matchGroups.map(async (group, index) => {
        const matchesForImage = group.map(match => ({
          team1: match.team1,
          team2: match.team2,
          prediction: match.prediction,
          odds: match.odds,
          competition: match.competition,
        }));
        
        const buffer = await generatePredictionImage(matchesForImage);
        return await uploadImage(
          buffer,
          'predictions',
          `prediction-${Date.now()}-${index}`
        );
      })
    );

    // Cream articolul
    const { data: article, error: articleError } = await supabaseAdmin
      .from('articles')
      .insert({
        title: `Super Bilet ${matches.length} Ponturi - Cotă ${totalOdds}`,
        content: `Un super bilet cu ${matches.length} ponturi atent selectate pentru acest weekend.`,
        sport_type: 'football',
        article_type: 'ticket',
        total_odds: totalOdds,
        status: 'published',
        header_image: thumbnail.url,
        slug: `super-bilet-${matches.length}-ponturi-cota-${totalOdds}-${Date.now()}`
      })
      .select()
      .single();

    if (articleError) throw articleError;

    // Cream grupurile de predicții
    for (const [index, matchGroup] of matchGroups.entries()) {
      const argumentText = matchGroup
        .map(match => `${match.team1} vs ${match.team2}:\n${match.argument}`)
        .join('\n\n');

      const { data: predGroup, error: groupError } = await supabaseAdmin
        .from('prediction_groups')
        .insert({
          article_id: article.id,
          group_order: index + 1,
          prediction_image: predictionImages[index].url,
          argument_text: argumentText
        })
        .select()
        .single();

      if (groupError) throw groupError;

      // Inserăm meciurile pentru acest grup
      const { error: matchesError } = await supabaseAdmin
        .from('matches')
        .insert(
          matchGroup.map(match => ({
            team1: match.team1,
            team2: match.team2,
            match_date: match.match_date,
            prediction: match.prediction,
            odds: match.odds,
            competition: match.competition,
            article_id: article.id,
            prediction_group_id: predGroup.id,
            is_verified: true
          }))
        );

      if (matchesError) throw matchesError;
    }

    console.log('✅ Biletul a fost creat cu succes!');
    console.log('📝 ID articol:', article.id);
    console.log('🖼️ Thumbnail:', thumbnail.url);
    console.log('🎯 Număr de grupuri create:', matchGroups.length);
    console.log('💰 Cotă totală:', totalOdds);
    console.log('\nImagini generate pentru grupuri:');
    predictionImages.forEach((img, index) => {
      console.log(`Grup ${index + 1}:`, img.url);
    });

  } catch (error) {
    console.error('❌ Eroare:', error);
  }
}

createTicket();