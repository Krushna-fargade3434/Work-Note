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
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="card-glass px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={worknoteLogo} 
              alt="Work-Note Logo" 
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105" 
            />
            <span className="font-display font-bold text-lg">Work-Note</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button className="btn-primary text-sm px-4 h-9">Dashboard</Button>
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
                  <Button className="btn-primary text-sm px-4 h-9">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
