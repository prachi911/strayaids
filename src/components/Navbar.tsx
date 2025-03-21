
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 py-4' 
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-primary font-medium">
            <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">RT</span>
            <span className={cn(
              'transition-all duration-300',
              scrolled ? 'text-primary' : 'text-white'
            )}>RescueTails</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['How It Works', 'Success Stories', 'NGO Partners', 'Get Involved'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:opacity-75',
                  scrolled ? 'text-primary' : 'text-white'
                )}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              className={cn(
                'hidden md:block transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium border',
                scrolled 
                  ? 'border-primary/10 text-primary hover:bg-primary/5' 
                  : 'border-white/30 text-white hover:bg-white/10'
              )}
              onClick={() => setLoginOpen(true)}
            >
              Login
            </button>
            <button className="bg-primary text-white rounded-full px-5 py-2 text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/10 active:scale-95">
              Report Now
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
