import Link from 'next/link';

export function Footer() {
  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ];

  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-4">
          {footerLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.name}
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} MedCoderX | Coding. Creating. Improving.
        </p>
      </div>
    </footer>
  );
}
