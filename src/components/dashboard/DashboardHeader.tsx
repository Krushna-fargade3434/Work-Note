import { motion } from 'framer-motion';
import { LogOut, User, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import worknoteLogo from '@/assets/worknote-logo.png';

export const DashboardHeader = () => {
  const { user, signOut } = useAuth();

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || '';
    return name.charAt(0).toUpperCase();
  };

  const getDisplayName = () => {
    const full = user?.user_metadata?.full_name;
    if (full) return full.split(' ')[0];
    return user?.email?.split('@')[0] || 'there';
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const todayStr = format(new Date(), 'EEEE, MMMM d');

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto max-w-5xl px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left: logo + greeting */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link to="/" className="flex-shrink-0">
              <img src={worknoteLogo} alt="Work-Note" className="w-9 h-9 sm:w-10 sm:h-10 object-contain hover:scale-105 transition-transform" />
            </Link>
            <div className="min-w-0">
              <p className="font-display font-bold text-base sm:text-lg leading-tight truncate">
                {greeting()}, {getDisplayName()} 👋
              </p>
              <p className="text-[11px] text-muted-foreground">{todayStr}</p>
            </div>
          </div>

          {/* Right: avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-xl hero-gradient text-primary-foreground flex items-center justify-center font-bold text-sm hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background transition-all flex-shrink-0 shadow-md">
                {getInitials()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* User info header */}
              <div className="px-3 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center font-bold text-primary-foreground text-sm flex-shrink-0">
                    {getInitials()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{getDisplayName()}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <DropdownMenuItem asChild className="gap-2.5 cursor-pointer">
                  <Link to="/profile">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="gap-2.5 cursor-pointer">
                  <Link to="/settings">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive gap-2.5 cursor-pointer">
                <LogOut className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};
