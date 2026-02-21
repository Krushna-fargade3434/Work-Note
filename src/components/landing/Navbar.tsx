import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import worknoteLogo from '@/assets/worknote-logo.png';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
];

export const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'bg-background/95 backdrop-blur-xl border-border shadow-lg'
              : 'bg-card/60 backdrop-blur-md border-border/50'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={worknoteLogo}
              alt="Work-Note Logo"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display font-bold text-lg tracking-tight">Work-Note</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button className="btn-primary text-sm px-4 h-9">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=signin">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 text-sm px-3 sm:px-4 h-9"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="btn-primary text-sm px-4 h-9">Get Started Free</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="md:hidden mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-4 space-y-2"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                {user ? (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button className="btn-primary w-full text-sm h-9">Go to Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/auth?mode=signin" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-sm h-9">Sign In</Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}>
                      <Button className="btn-primary w-full text-sm h-9">Get Started Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
