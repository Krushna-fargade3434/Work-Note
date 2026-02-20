import { motion } from 'framer-motion';
import { ListTodo, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react';

export type FilterType = 'all' | 'today' | 'completed' | 'pending' | 'custom';

interface TaskFiltersProps {
  activeFilter: FilterType;
  customDate: Date | undefined;
  onFilterChange: (filter: FilterType) => void;
  onCustomDateChange: (date: Date | undefined) => void;
  taskCounts?: Partial<Record<FilterType, number>>;
}

export const TaskFilters = ({
  activeFilter,
  onFilterChange,
  taskCounts = {},
}: TaskFiltersProps) => {
  const filters = [
    { id: 'today' as const, label: 'Today', icon: CalendarIcon },
    { id: 'completed' as const, label: 'Completed', icon: CheckCircle2 },
    { id: 'all' as const, label: 'All', icon: ListTodo },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const count = taskCounts[filter.id];
        const isActive = activeFilter === filter.id;
        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange(filter.id)}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'hero-gradient text-primary-foreground shadow-primary'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            <filter.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {filter.label}
            {count !== undefined && (
              <span
                className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-muted-foreground/10 text-muted-foreground'
                }`}
              >
                {count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
