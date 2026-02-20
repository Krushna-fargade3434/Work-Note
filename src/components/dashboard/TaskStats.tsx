import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ListTodo } from 'lucide-react';
import { Task } from '@/hooks/useTasks';

interface TaskStatsProps {
  tasks: Task[];
}

// Count-up animation hook
const useCountUp = (target: number, duration = 800) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const total = useCountUp(totalTasks);
  const completed = useCountUp(completedTasks);

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.4 }}
        className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <ListTodo className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Total</span>
        </div>
        <p className="text-3xl font-display font-bold">{total}</p>
        <p className="text-xs text-muted-foreground mt-1">Tasks created</p>
      </motion.div>

      {/* Completed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-card border border-success/20 rounded-2xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-success-light flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <span className="text-[10px] font-medium text-success/70 uppercase tracking-wide">Done</span>
        </div>
        <p className="text-3xl font-display font-bold text-success">{completed}</p>
        <p className="text-xs text-muted-foreground mt-1">Completed</p>
      </motion.div>

    </div>
  );
};
