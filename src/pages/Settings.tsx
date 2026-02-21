import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Moon, Sun, LogOut, AlertTriangle, Save, Eye, EyeOff, Shield, Bell, BellOff, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

/* ── theme helpers ── */
const getTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('wn-theme') ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
};
const applyTheme = (t: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', t === 'dark');
  localStorage.setItem('wn-theme', t);
};

const EASE = 'easeOut' as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: EASE },
});

/* ── section wrapper ── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="px-5 py-4 border-b border-border">
      <h3 className="font-display font-semibold text-sm text-foreground">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </motion.div>
);

/* ── toggle row ── */
const ToggleRow = ({
  icon: Icon, label, desc, checked, onChange,
}: { icon: React.ElementType; label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? 'hero-gradient' : 'bg-secondary border border-border'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  </div>
);

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  /* profile form */
  const [name, setName] = useState(displayName);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  /* password form */
  const [newPwd, setNewPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);

  /* theme */
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTheme() as 'light' | 'dark');

  /* notifications (local pref only) */
  const [notifEnabled, setNotifEnabled] = useState(() => localStorage.getItem('wn-notif') !== 'off');

  /* apply theme on change */
  useEffect(() => { applyTheme(theme); }, [theme]);

  /* save notifications pref */
  const handleNotifToggle = (v: boolean) => {
    setNotifEnabled(v);
    localStorage.setItem('wn-notif', v ? 'on' : 'off');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSavingProfile(true);
    // Supabase update metadata
    const { supabase } = await import('@/integrations/supabase/client');
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setSavingProfile(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
      toast({ title: 'Profile updated', description: 'Your display name has been saved.' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd.length < 6) {
      toast({ title: 'Password too short', description: 'At least 6 characters required.', variant: 'destructive' });
      return;
    }
    setSavingPwd(true);
    const { supabase } = await import('@/integrations/supabase/client');
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setSavingPwd(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setNewPwd('');
      toast({ title: 'Password updated', description: 'Your password has been changed successfully.' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl hover:bg-secondary transition-colors flex-shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-display font-bold text-lg">Settings</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8 space-y-5">

        {/* ── Profile ── */}
        <motion.div {...fadeUp(0)}>
          <Section title="Profile">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Display name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-modern"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Email address</label>
                <input
                  type="email"
                  value={user?.email ?? ''}
                  disabled
                  className="input-modern opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">Email address cannot be changed here.</p>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="btn-primary h-9 px-5 text-sm gap-2" disabled={savingProfile || !name.trim()}>
                  {profileSaved ? <><Check className="w-4 h-4" /> Saved</> : savingProfile ? 'Saving…' : <><Save className="w-4 h-4" /> Save profile</>}
                </Button>
              </div>
            </form>
          </Section>
        </motion.div>

        {/* ── Security ── */}
        <motion.div {...fadeUp(0.06)}>
          <Section title="Security">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">New password</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="input-modern pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="btn-primary h-9 px-5 text-sm gap-2" disabled={savingPwd || newPwd.length < 6}>
                  {savingPwd ? 'Updating…' : <><Shield className="w-4 h-4" /> Update password</>}
                </Button>
              </div>
            </form>
          </Section>
        </motion.div>

        {/* ── Preferences ── */}
        <motion.div {...fadeUp(0.12)}>
          <Section title="Preferences">
            <div className="space-y-5">
              <ToggleRow
                icon={theme === 'dark' ? Moon : Sun}
                label="Dark mode"
                desc="Switch between light and dark interface"
                checked={theme === 'dark'}
                onChange={(v) => setTheme(v ? 'dark' : 'light')}
              />
              <div className="h-px bg-border" />
              <ToggleRow
                icon={notifEnabled ? Bell : BellOff}
                label="Due-date reminders"
                desc="Visual overdue highlights in the dashboard"
                checked={notifEnabled}
                onChange={handleNotifToggle}
              />
            </div>
          </Section>
        </motion.div>

        {/* ── Danger zone ── */}
        <motion.div {...fadeUp(0.18)}>
          <div className="bg-card border border-destructive/30 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-destructive/20">
              <h3 className="font-display font-semibold text-sm text-destructive flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Danger zone
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-medium">Sign out</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Log out of your account on this device.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSignOut}
                  className="border-border text-muted-foreground hover:text-foreground gap-2 h-9 text-sm flex-shrink-0"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Settings;
