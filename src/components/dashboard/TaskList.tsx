import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, parseISO } from 'date-fns';
import { Inbox, Sparkles } from 'lucide-react';
import { Task, UpdateTaskInput } from '@/hooks/useTasks';
import { TaskItem } from './TaskItem';
import { TaskFilters, FilterType } from './TaskFilters';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateTaskInput) => void;
}

export const TaskList = ({ tasks, loading, onToggle, onDelete, onUpdate }: TaskListProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [customDate, setCustomDate] = useState<Date | undefined>();

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    today: tasks.filter(t => t.due_date && isToday(parseISO(t.due_date))).length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      switch (activeFilter) {
        case 'today':
          return task.due_date && isToday(parseISO(task.due_date));
        case 'completed':
          return task.status === 'completed';
        case 'pending':
          return task.status === 'pending';
        case 'custom':
          if (!customDate || !task.due_date) return false;
          return format(parseISO(task.due_date), 'yyyy-MM-dd') === format(customDate, 'yyyy-MM-dd');
        default:
          return true;
      }
    });
  }, [tasks, activeFilter, customDate]);

  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'today':
        return "Today's Tasks";
      case 'completed':
        return 'Completed Tasks';
      case 'pending':
        return 'Pending Tasks';
      case 'custom':
        return customDate ? `Tasks for ${format(customDate, 'MMMM d, yyyy')}` : 'Select a Date';
      default:
        return 'All Tasks';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {[80, 72, 96, 56].map((w, i) => (
            <div key={i} className={`h-9 rounded-xl bg-secondary skeleton`} style={{ width: w }} />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-elevated p-4">
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-secondary skeleton flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary skeleton rounded-lg" style={{ width: `${60 + i * 15}%` }} />
                  <div className="h-3 bg-secondary skeleton rounded-lg w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TaskFilters
        activeFilter={activeFilter}
        customDate={customDate}
        onFilterChange={setActiveFilter}
        onCustomDateChange={setCustomDate}
        taskCounts={taskCounts}
      />

      <div>
        <h2 className="font-display text-lg font-semibold mb-4">{getFilterTitle()}</h2>

        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-elevated p-12 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                {activeFilter === 'all' && tasks.length === 0
                  ? <Sparkles className="w-8 h-8 text-primary/60" />
                  : <Inbox className="w-8 h-8 text-muted-foreground" />}
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {activeFilter === 'all' && tasks.length === 0
                  ? "You're all clear!"
                  : 'Nothing here'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {activeFilter === 'all' && tasks.length === 0
                  ? 'Add your first task above to get started.'
                  : 'No tasks match this filter — try a different one.'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
