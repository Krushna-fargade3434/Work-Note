import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, ListTodo, CheckCircle2, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type FilterType = 'all' | 'today' | 'completed' | 'pending' | 'custom';

interface TaskFiltersProps {
  activeFilter: FilterType;
  customDate: Date | undefined;
  onFilterChange: (filter: FilterType) => void;
  onCustomDateChange: (date: Date | undefined) => void;
}

export const TaskFilters = ({
  activeFilter,
  customDate,
  onFilterChange,
  onCustomDateChange,
}: TaskFiltersProps) => {
  const filters = [
    { id: 'all' as const, label: 'All', icon: ListTodo },
    { id: 'today' as const, label: 'Today', icon: CalendarIcon },
    { id: 'completed' as const, label: 'Completed', icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(filter.id)}
          className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? 'hero-gradient text-primary-foreground shadow-primary'
              : 'bg-secondary text-secondary-foreground hover:bg-muted'
          }`}
        >
          <filter.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {filter.label}
        </motion.button>
      ))}

      {/* Date picker - before Pending */}
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeFilter === 'custom'
                ? 'hero-gradient text-primary-foreground shadow-primary'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {customDate ? format(customDate, 'MMM d') : 'Pick Date'}
          </motion.button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={customDate}
            onSelect={(date) => {
              onCustomDateChange(date);
              if (date) onFilterChange('custom');
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Pending filter - after Date picker */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onFilterChange('pending')}
        className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
          activeFilter === 'pending'
            ? 'hero-gradient text-primary-foreground shadow-primary'
            : 'bg-secondary text-secondary-foreground hover:bg-muted'
        }`}
      >
        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        Pending
      </motion.button>
    </div>
  );
};
