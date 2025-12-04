import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-me-image');

  return (
    <section id="about" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-headline font-bold md:text-4xl">
              About Me
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hi! I’m MedCoderX, a solo developer passionate about building simple, clean, and useful apps. My mantra is simple: <span className="font-medium text-foreground">Coding. Creating. Improving.</span>
            </p>
          </div>
          <div className="flex justify-center">
            {aboutImage && (
              <Image 
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={300}
                height={300}
                className="rounded-full shadow-lg"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
