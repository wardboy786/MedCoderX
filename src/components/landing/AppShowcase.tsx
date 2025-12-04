import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { PlayStoreIcon } from '@/components/icons/PlayStoreIcon';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const apps = [
  {
    id: 'safeallergy',
    iconId: 'safe-allergy-icon',
    name: 'SafeAllergy – Allergens Scanner',
    features: [
      'Scan your meals for allergens in seconds',
      'Personalized allergen tracking',
      'History & stats of safe/unsafe foods',
      'Simple, fast, and user-friendly interface',
    ],
    playStoreUrl: '#',
  },
  {
    id: 'photorightsai',
    iconId: 'photorights-ai-icon',
    name: 'PhotoRights AI – Copyright Checker',
    features: [
      'Instantly check image copyright status',
      'AI-powered suggestions for safe usage',
      'Keep your content legally compliant',
      'Easy, reliable, and intuitive design',
    ],
    playStoreUrl: '#',
  },
];

export function AppShowcase() {
  const safeAllergyIcon = PlaceHolderImages.find(p => p.id === 'safe-allergy-icon');
  const photoRightsAIIcon = PlaceHolderImages.find(p => p.id === 'photorights-ai-icon');
  
  const appIcons: { [key: string]: typeof safeAllergyIcon } = {
    'safe-allergy-icon': safeAllergyIcon,
    'photorights-ai-icon': photoRightsAIIcon
  }

  return (
    <section id="apps" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center md:text-4xl mb-12">
          My Apps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {apps.map((app) => {
            const icon = appIcons[app.iconId];
            return (
              <Card key={app.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                <CardHeader className="flex-row items-center gap-4">
                  {icon && (
                    <Image 
                      src={icon.imageUrl}
                      alt={`${app.name} icon`}
                      width={80}
                      height={80}
                      className="rounded-2xl border"
                      data-ai-hint={icon.imageHint}
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                    <ul className="space-y-3 text-muted-foreground mb-6">
                      {app.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  <Button asChild className="w-full mt-auto">
                    <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer">
                      <PlayStoreIcon className="w-5 h-5 mr-2" />
                      Get it on Google Play
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
