import { motion } from 'framer-motion';
import { LogOut, User, Settings } from 'lucide-react';
import { format } from 'date-fns';
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
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto max-w-5xl px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={worknoteLogo} alt="Work-Note Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
            <div>
              <p className="font-display font-bold text-base sm:text-lg leading-tight">
                {greeting()}, {getDisplayName()} 👋
              </p>
              <p className="text-[11px] text-muted-foreground">{todayStr}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background transition-all">
                {getInitials()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2.5 border-b border-border">
                <p className="text-sm font-semibold">{getDisplayName()}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <DropdownMenuItem className="gap-2 mt-1">
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive gap-2">
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
