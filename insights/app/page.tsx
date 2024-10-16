import { Main, Section, Container, Box } from "@/components/craft";
import CTA from "@/components/home-page/cta";
import FeatureLeft from "@/components/home-page/feature-left";
import FeatureRight from "@/components/home-page/feature-right";
import Footer from "@/components/home-page/footer";
import Hero from "@/components/home-page/hero";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
         <Hero/>
         <FeatureLeft/>
         <FeatureRight/>
         <CTA/>
         <Footer/>
        </Container>
      </Section>
    </Main>
  );
}
