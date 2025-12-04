import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { AppShowcase } from '@/components/landing/AppShowcase';
import { PhotoRightsAIDemo } from '@/components/landing/PhotoRightsAIDemo';
import { About } from '@/components/landing/About';
import { Contact } from '@/components/landing/Contact';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <AppShowcase />
        <PhotoRightsAIDemo />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
