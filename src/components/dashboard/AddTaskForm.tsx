import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Plus, Calendar as CalendarIcon, X } from 'lucide-react';
import { CreateTaskInput } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AddTaskFormProps {
  onAdd: (input: CreateTaskInput) => Promise<unknown>;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    await onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : undefined,
    });

    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setIsExpanded(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setIsExpanded(false);
  };

  return (
    <div className="card-elevated overflow-hidden">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="w-full p-4 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          >
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center" title="Add task">
              <Plus className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-medium text-muted-foreground/60">Create a new note...</span>
          </motion.button>
        ) : (
          <motion.form
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="p-4 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-primary-foreground" />
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Submit report by 6 PM"
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-muted-foreground"
                autoFocus
              />
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              className="input-modern min-h-[80px] resize-none"
            />

            <div className="flex flex-wrap gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-muted transition-colors"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {dueDate ? format(dueDate, 'MMM d') : 'Due date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || loading}
                className="btn-primary"
              >
                {loading ? 'Creating...' : 'Create Note'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
