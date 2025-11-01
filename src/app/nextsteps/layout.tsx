import Link from 'next/link';
import { MenuIcon } from '@/components/signinsignup/icons';

const links = [
  { href: '/categorias', title: 'Categorias' },
  { href: '/conteudos', title: 'Conteudos' },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black">
      {/* Netflix-style Header */}
      <div className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto flex max-w-7xl items-center justify-between p-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-red-600 font-bold text-2xl tracking-tight">
              Director's Flix
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 text-sm md:flex">
            {links.map((link) => (
              <Link 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium" 
                href={link.href} 
                key={link.title}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <button className="inline-flex rounded-md p-1 md:hidden" type="button">
              <MenuIcon className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto flex max-w-7xl justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-lg rounded-lg bg-gray-900/70 p-6 backdrop-blur-sm md:p-8 lg:max-w-xl">
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-800 bg-black py-8 mt-8">

      </footer>
    </div>
  );
}