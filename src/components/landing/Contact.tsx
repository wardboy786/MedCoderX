import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-headline font-bold md:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          Have a question or want to work together? Feel free to reach out.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <a href="mailto:info@dreamydesk.co.in">
              <Mail className="mr-2 h-5 w-5" />
              info@dreamydesk.co.in
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
