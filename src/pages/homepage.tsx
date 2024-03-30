import HeroSection from "@/components/landingPage/hero";
import { Header } from "./../components/header/header";
import AboutSection from "@/components/landingPage/about";
import { HowItWorks } from "@/components/landingPage/howItWorks";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <HeroSection />

        <AboutSection />
        <HowItWorks />
        <h2 className="text-3xl md:text-4xl font-bold flex justify-center">
          Newly Added &nbsp;
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Products
          </span>
        </h2>
      </div>
    </>
  );
};

export default HomePage;
