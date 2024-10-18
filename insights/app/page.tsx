import { Main, Section, Container, Box } from "@/components/craft";
import CTA from "@/components/home-page/cta";
import FeatureLeft from "@/components/home-page/feature-left";
import FeatureRight from "@/components/home-page/feature-right";
import Footer from "@/components/home-page/footer";
import Hero from "@/components/home-page/hero";
import Sports from "@/components/home-page/sports";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
         <Hero/>
         <Sports/>
         <FeatureLeft/>
         <FeatureRight/>
         <CTA/>
         <Footer/>
        </Container>
      </Section>
    </Main>
  );
}
