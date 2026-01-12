import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import worknoteLogo from '@/assets/worknote-logo.png';

export const DashboardHeader = () => {
  const { user, signOut } = useAuth();

  const getInitials = () => {
    const email = user?.email || '';
    return email.charAt(0).toUpperCase();
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto max-w-5xl px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={worknoteLogo} alt="Work-Note Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">{greeting()}</p>
              <h1 className="font-display font-bold text-base sm:text-lg">Work-Note</h1>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-medium hover:opacity-90 transition-opacity">
                {getInitials()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium truncate">{user?.email}</p>
              </div>
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};
