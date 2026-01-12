import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/hooks/useTasks';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TaskStats } from '@/components/dashboard/TaskStats';
import { AddTaskForm } from '@/components/dashboard/AddTaskForm';
import { TaskList } from '@/components/dashboard/TaskList';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { tasks, loading, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?mode=signin');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
        <TaskStats tasks={tasks} />
        <AddTaskForm onAdd={createTask} />
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={toggleTaskStatus}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </main>
    </div>
  );
};

export default Dashboard;
