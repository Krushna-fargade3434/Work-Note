import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';
import { Task } from '@/hooks/useTasks';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-primary',
      bgColor: 'bg-primary-light',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success-light',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'text-accent',
      bgColor: 'bg-accent-light',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary-light',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-2 sm:p-3 text-center"
        >
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-1.5`}>
            <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color}`} />
          </div>
          <p className="text-lg sm:text-xl font-display font-bold">{stat.value}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};
