import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Check, Calendar, Trash2, Edit3, MoreVertical } from 'lucide-react';
import { Task, UpdateTaskInput } from '@/hooks/useTasks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskEditDialog } from './TaskEditDialog';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateTaskInput) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onUpdate }: TaskItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isCompleted = task.status === 'completed';

  const formatDueDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const isOverdue = task.due_date && isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date)) && !isCompleted;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className={`task-item group relative ${isCompleted ? 'opacity-60' : ''}`}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
              isCompleted
                ? 'bg-success border-success'
                : 'border-border hover:border-primary'
            }`}
          >
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-3 h-3 text-success-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

            <div className="flex-1 min-w-0">
            <motion.p
              className={`font-medium transition-colors duration-300 ${isCompleted ? 'text-muted-foreground' : ''}`}
              animate={isCompleted ? { opacity: 0.7 } : { opacity: 1 }}
            >
              <motion.span
                animate={isCompleted
                  ? { textDecorationLine: 'line-through' }
                  : { textDecorationLine: 'none' }
                }
                transition={{ duration: 0.3 }}
                style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
              >
                {task.title}
              </motion.span>
            </motion.p>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {task.due_date && (
                <div
                  className={`flex items-center gap-1.5 text-xs ${
                    isOverdue ? 'text-destructive' : 'text-muted-foreground'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDueDate(task.due_date)}
                </div>
              )}
            </div>
          </div>

          {/* Actions - always visible on mobile, hover on desktop */}
          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <TaskEditDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onUpdate={onUpdate}
      />
    </>
  );
};
