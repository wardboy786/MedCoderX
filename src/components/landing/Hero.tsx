import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayStoreIcon } from '@/components/icons/PlayStoreIcon';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
        <h1 className="text-4xl font-headline font-bold md:text-6xl lg:text-7xl tracking-tighter">
          MedCoderX
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-medium text-primary-foreground/90">
          Coding. Creating. Improving.
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80">
          Solo developer building innovative apps for smarter everyday life.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <a href="#apps" rel="noopener noreferrer">
              <PlayStoreIcon className="w-6 h-6 mr-2" />
              Get SafeAllergy on Play Store
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
             <a href="#apps" rel="noopener noreferrer">
              <PlayStoreIcon className="w-6 h-6 mr-2" />
              Get PhotoRights AI on Play Store
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
