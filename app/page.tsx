import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import LearningSection from "./components/LearningSection";
import GallerySection from "./components/GallerySection";
import InfoParentsSection from "./components/InfoParentsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <LearningSection />
      <GallerySection />
      <InfoParentsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
