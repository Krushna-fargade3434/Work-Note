import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import worknoteLogo from '@/assets/worknote-logo.png';

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 sm:py-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="card-glass px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={worknoteLogo} alt="Work-Note Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="font-display font-bold text-lg sm:text-xl">Work-Note</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button className="btn-primary text-sm sm:text-base px-3 sm:px-4">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=signin">
                  <Button variant="ghost" className="text-foreground hover:bg-secondary text-sm sm:text-base px-2 sm:px-4">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="btn-primary text-sm sm:text-base px-3 sm:px-4">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
