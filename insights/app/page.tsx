import { Main, Section, Container, Box } from "@/components/craft";
import CTA from "@/components/home-page/cta";
import FeatureLeft from "@/components/home-page/feature-left";
import FeatureRight from "@/components/home-page/feature-right";
import Footer from "@/components/home-page/footer";
import Hero from "@/components/home-page/hero";
import Sports from "@/components/home-page/sports";
import BettingTips from "@/components/ui/bet_template";

const Divider = () => (
  <div className="w-full max-w-screen-xl mx-auto px-5">
    <hr className="border-t border-gray-800 my-8" /> {/* Reduced from my-16 to my-8 */}
  </div>
);

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <Hero />
          <Divider />
          <Sports />
          <Divider />
          <FeatureLeft />
          <Divider />
          <FeatureRight />
          <Divider />
          {/* <CTA /> */}
          <BettingTips/>
          <Divider />
          <Footer />
        </Container>
      </Section>
    </Main>
  );
}