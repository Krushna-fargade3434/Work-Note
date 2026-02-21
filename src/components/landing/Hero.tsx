import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, Calendar, TrendingUp, Sparkles, ArrowRight,
  Zap, Shield, Bell, Star, Users, Clock, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import worknoteLogo from '@/assets/worknote-logo.png';

/* ─── data ─── */
const FEATURES = [
  {
    icon: Zap,
    title: 'Instant capture',
    desc: 'Add tasks in seconds. Never lose a thought — just type and hit enter.',
    color: 'text-[hsl(var(--warning))]',
    bg: 'bg-[hsl(var(--warning-light))]',
  },
  {
    icon: Calendar,
    title: 'Smart scheduling',
    desc: 'Assign due dates, filter by Today, and stay ahead of every deadline.',
    color: 'text-primary',
    bg: 'bg-[hsl(var(--primary-light))]',
  },
  {
    icon: TrendingUp,
    title: 'Progress tracking',
    desc: 'Visual stats and completion counters keep you motivated every day.',
    color: 'text-[hsl(var(--success))]',
    bg: 'bg-[hsl(var(--success-light))]',
  },
  {
    icon: Shield,
    title: 'Secure & private',
    desc: 'Your notes are encrypted and stored safely — only you can see them.',
    color: 'text-[hsl(var(--accent))]',
    bg: 'bg-[hsl(var(--accent-light))]',
  },
  {
    icon: Bell,
    title: 'Overdue alerts',
    desc: 'Visual cues surface overdue items automatically, nothing slips.',
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  {
    icon: CheckCircle2,
    title: 'One-tap complete',
    desc: 'Mark done instantly. Completed tasks fade gracefully out of the way.',
    color: 'text-primary',
    bg: 'bg-[hsl(var(--primary-light))]',
  },
];

const STEPS = [
  { n: '01', title: 'Create an account', desc: 'Sign up free in under 30 seconds — no card required.' },
  { n: '02', title: 'Add your tasks', desc: 'Type your first task, set a due date, and you are ready.' },
  { n: '03', title: 'Stay on track', desc: 'Filter, complete, and track progress — all from one screen.' },
];

const STATS = [
  { value: '100%', label: 'Free forever', icon: Star },
  { value: '<1s', label: 'Load time', icon: Zap },
  { value: '∞', label: 'Tasks supported', icon: CheckCircle2 },
  { value: '24/7', label: 'Always available', icon: Clock },
];

const EASE = 'easeOut' as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: EASE },
});

/* ─── component ─── */
export const Hero = () => {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20">
        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/6 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="flex justify-center mb-7"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
              <img src={worknoteLogo} alt="Work-Note" className="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10 drop-shadow-xl" />
            </div>
          </motion.div>

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-7 tracking-tight"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Your productivity companion — 100% free
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            Plan smarter.{' '}
            <span className="text-gradient">Finish faster.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            A beautifully focused task manager that helps you capture ideas, track deadlines, 
            and reach your goals — without the clutter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
          >
            <Link to="/auth?mode=signup" className="w-full sm:w-auto">
              <Button size="lg" className="btn-primary w-full sm:w-auto text-base px-8 py-6 group">
                Start for free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth?mode=signin" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-base px-8 py-6 text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border"
              >
                Sign in
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sm text-muted-foreground/60 flex items-center justify-center gap-4 flex-wrap"
          >
            {['No credit card', 'Free forever', 'Instant setup'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                {t}
              </span>
            ))}
          </motion.p>

          {/* ── UI preview card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: 'easeOut' }}
            className="mt-20 mx-auto max-w-2xl"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-x-8 -bottom-6 h-24 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-secondary/30">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--warning))/60]" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--success))/60]" />
                  <div className="flex-1 mx-4 h-5 rounded-lg bg-secondary/80 text-[10px] flex items-center pl-3 text-muted-foreground/50 font-mono select-none">
                    app.work-note.com/dashboard
                  </div>
                </div>
                {/* Mock dashboard content */}
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Total', val: '12', c: 'text-foreground' },
                      { label: 'Done', val: '8', c: 'text-[hsl(var(--success))]' },
                    ].map((s) => (
                      <div key={s.label} className="bg-background rounded-xl p-3 border border-border">
                        <p className={`text-2xl font-display font-bold ${s.c}`}>{s.val}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[
                      { done: true, text: 'Review Q1 report', date: 'Today' },
                      { done: false, text: 'Schedule team standup', date: 'Tomorrow' },
                      { done: false, text: 'Update project roadmap', date: 'Feb 24' },
                    ].map((task) => (
                      <div key={task.text} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${task.done ? 'bg-secondary/30 border-border/40 opacity-60' : 'bg-background border-border'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${task.done ? 'bg-[hsl(var(--success))] border-[hsl(var(--success))]' : 'border-border'}`}>
                          {task.done && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className={`flex-1 text-sm font-medium ${task.done ? 'line-through text-muted-foreground' : ''}`}>{task.text}</span>
                        <span className="text-[11px] text-muted-foreground">{task.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="border-y border-border bg-secondary/20">
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.07)} className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Features
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Everything you need.<br />
              <span className="text-gradient">Nothing you don't.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Work-Note is designed around one goal: helping you get things done without friction.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.06)}
                className="group p-6 bg-card border border-border rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24 px-4 bg-secondary/20 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
              <Users className="w-3.5 h-3.5" /> How it works
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Up and running in{' '}
              <span className="text-gradient">60 seconds</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-7 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...fadeUp(i * 0.1)} className="relative text-center">
                <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-5 shadow-primary/30 shadow-lg">
                  <span className="font-display font-bold text-primary-foreground text-lg">{s.n}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-28 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp()}>
            <div className="relative inline-flex mb-8">
              <div className="absolute inset-0 bg-primary/25 rounded-full blur-2xl scale-150" />
              <img src={worknoteLogo} alt="" className="w-16 h-16 object-contain relative z-10" />
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-5">
              Ready to take back<br />your{' '}
              <span className="text-gradient">productivity?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
              Join today — free forever. No complexity, no noise. Just tasks, done.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="btn-primary text-base px-10 py-6 group">
                Get started — it's free
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground/50 mt-5">No credit card required · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={worknoteLogo} alt="" className="w-6 h-6 object-contain" />
            <span className="font-display font-semibold text-sm">Work-Note</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Work-Note. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/auth?mode=signin" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
            <Link to="/auth?mode=signup" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};