// scripts/create-analysis.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const LEAGUES = {
  PREMIER_LEAGUE: 'db8fe92d-6f36-467a-92ca-0db0a2ccbb97',
  LA_LIGA: '70dcfa02-8e55-4b80-afef-ece77da89272',
  SERIE_A: 'ef2178e7-ed5e-42f3-97ea-71bfa9b919c3',
  BUNDESLIGA: '404fbb96-385a-41bc-b31f-7a84afc62642',
  LIGUE_1: '7af0b4f0-05dc-4d1f-9f5f-6dd0067e8882',
  UEFA_CHAMPIONS_LEAGUE: '134d76b5-dc28-44a4-b271-70e9068f7a67',
  UEFA_EUROPA_LEAGUE: 'cf0e7ed9-c685-41c8-ba49-12d7db1e4a15',
  UEFA_CONFERENCE_LEAGUE: 'f4d9b838-8f5e-400c-845b-13bfd2ab1d11'
};

async function createAnalysis() {
  try {
    const analysisData = {
      title: 'Premier League Etapa 32: Analiză și Ponturi', // Modifici titlul
      content: `# Premier League - Etapa 32

În această etapă avem meciuri importante pentru titlu și Champions League.

## Arsenal vs Liverpool (Sâmbătă, 18:30)
- Arsenal este neînvinsă în ultimele 5 meciuri
- Liverpool are probleme în defensivă
- Pont: Peste 2.5 goluri @ 1.75

## Manchester City vs Brentford (Duminică, 17:00)
- City are nevoie de victorie pentru titlu
- Brentford, în formă slabă în deplasare
- Pont: 1 și peste 1.5 goluri @ 1.65

## Newcastle vs Manchester United (Duminică, 19:30)
- Newcastle, foarte puternică acasă
- United, probleme în deplasare
- Pont: 1X și GG @ 1.95`,      // Modifici conținutul
      league_id: LEAGUES.PREMIER_LEAGUE,  // Modifici liga
      // Meciurile din analiză:
      matches: [
        {
          team1: 'Arsenal',
          team2: 'Liverpool',
          match_date: '2024-02-24 18:30:00+00',  // Format: YYYY-MM-DD HH:mm:ss+00
          prediction: 'Peste 2.5 goluri',
          odds: 1.75,
          competition: 'Premier League'
        },
        {
          team1: 'Manchester City',
          team2: 'Brentford',
          match_date: '2024-02-25 17:00:00+00',
          prediction: '1 și peste 1.5 goluri',
          odds: 1.65,
          competition: 'Premier League'
        },
        {
          team1: 'Newcastle',
          team2: 'Manchester United',
          match_date: '2024-02-25 19:30:00+00',
          prediction: '1X și GG',
          odds: 1.95,
          competition: 'Premier League'
        }
      ]
    };

    // Inserare articol
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: analysisData.title,
        content: analysisData.content,
        sport_type: 'football',
        article_type: 'analysis',
        league_id: analysisData.league_id,
        status: 'published',
        meta_description: `Analiză completă și ponturi pentru ${analysisData.title}`
      })
      .select()
      .single();

    if (articleError) {
      throw articleError;
    }

    // Inserare meciuri
    const { error: matchesError } = await supabase
      .from('matches')
      .insert(
        analysisData.matches.map(match => ({
          ...match,
          article_id: article.id,
          is_verified: true
        }))
      );

    if (matchesError) {
      throw matchesError;
    }

    console.log('✅ Analiza a fost creată cu succes!');
    console.log('📝 ID articol:', article.id);

  } catch (error) {
    console.error('❌ Eroare:', error);
  }
}

createAnalysis();