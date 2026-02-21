import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Mail, Calendar, CheckCircle2, ListTodo, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/hooks/useTasks';

const EASE = 'easeOut' as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: EASE },
});

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();
  const email = user?.email ?? '';
  const joinedDate = user?.created_at ? format(parseISO(user.created_at), 'MMMM d, yyyy') : '—';

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, pct };
  }, [tasks]);

  const statCards = [
    { label: 'Total tasks',  value: stats.total,     icon: ListTodo,     color: 'text-primary',                    bg: 'bg-primary/10' },
    { label: 'Completed',   value: stats.completed,  icon: CheckCircle2, color: 'text-[hsl(var(--success))]',     bg: 'bg-[hsl(var(--success-light))]' },
    { label: 'Pending',     value: stats.pending,    icon: Clock,        color: 'text-[hsl(var(--warning))]',     bg: 'bg-[hsl(var(--warning-light))]' },
    { label: 'Completion',  value: `${stats.pct}%`,  icon: TrendingUp,   color: 'text-[hsl(var(--accent))]',     bg: 'bg-[hsl(var(--accent-light))]' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl hover:bg-secondary transition-colors flex-shrink-0"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-display font-bold text-lg">Profile</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8 space-y-6">

        {/* ── Avatar card ── */}
        <motion.div {...fadeUp(0)} className="bg-card border border-border rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center text-primary-foreground font-display font-bold text-4xl shadow-lg shadow-primary/20">
                {initials}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[hsl(var(--success))] rounded-full border-2 border-card" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h2 className="font-display font-bold text-2xl sm:text-3xl truncate">{displayName}</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mt-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {email}
                </span>
                <span className="hidden sm:block text-muted-foreground/30">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  Joined {joinedDate}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Active account
                </span>
                <Link
                  to="/settings"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground text-xs font-semibold hover:bg-muted transition-colors"
                >
                  Edit in settings →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.div {...fadeUp(0.07)}>
          <h3 className="font-display font-semibold text-xs mb-3 text-muted-foreground uppercase tracking-wide">Your activity</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(0.08 + i * 0.05)}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Progress bar ── */}
        {stats.total > 0 && (
          <motion.div {...fadeUp(0.18)} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Overall progress</span>
              <span className="text-sm font-bold text-primary">{stats.pct}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--gradient-hero)' }}
                initial={{ width: 0 }}
                animate={{ width: `${stats.pct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stats.completed} of {stats.total} tasks completed</p>
          </motion.div>
        )}

        {/* ── Account info ── */}
        <motion.div {...fadeUp(0.22)} className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display font-semibold text-sm">Account information</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: 'Full name',    value: displayName },
              { label: 'Email',        value: email },
              { label: 'Member since', value: joinedDate },
              { label: 'Account ID',   value: user?.id ? user.id.slice(0, 18) + '…' : '—' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-medium font-mono truncate max-w-[200px] text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Profile;
