import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, ArrowLeft, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import worknoteLogo from '@/assets/worknote-logo.png';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Password strength calculator
const getPasswordStrength = (password: string) => {
  let score = 0;
  const checks = {
    length: password.length >= 6,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  if (checks.length) score++;
  if (checks.hasLower) score++;
  if (checks.hasUpper) score++;
  if (checks.hasNumber) score++;
  if (checks.hasSpecial) score++;
  
  return { score, checks };
};

const getStrengthLabel = (score: number) => {
  if (score <= 1) return { label: 'Weak', color: 'bg-destructive' };
  if (score <= 2) return { label: 'Fair', color: 'bg-warning' };
  if (score <= 3) return { label: 'Good', color: 'bg-primary' };
  return { label: 'Strong', color: 'bg-success' };
};

export const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';
  const isSignUp = mode === 'signup';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);
  const strengthInfo = useMemo(() => getStrengthLabel(passwordStrength.score), [passwordStrength.score]);

  const validateField = (field: string, value: string) => {
    try {
      if (field === 'email') {
        z.string().email('Please enter a valid email').parse(value);
      } else if (field === 'password') {
        z.string().min(6, 'Password must be at least 6 characters').parse(value);
      } else if (field === 'fullName') {
        z.string().min(2, 'Name must be at least 2 characters').parse(value);
      }
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0]?.message || '' }));
      }
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateForm = () => {
    try {
      if (isSignUp) {
        signUpSchema.parse({ email, password, fullName });
      } else {
        signInSchema.parse({ email, password });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isSignUp) {
        console.log('Attempting sign up for:', email);
        const { error } = await signUp(email, password, fullName);
        console.log('Sign up result:', error ? `Error: ${error.message}` : 'Success');
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
              variant: 'destructive',
            });
          } else {
            throw error;
          }
        } else {
        toast({
            title: 'Welcome to Work-Note!',
            description: 'Your account has been created successfully.',
          });
          navigate('/dashboard');
        }
      } else {
        console.log('Attempting sign in for:', email);
        const { error } = await signIn(email, password);
        console.log('Sign in result:', error ? `Error: ${error.message}` : 'Success');
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Invalid credentials',
              description: 'Please check your email and password.',
              variant: 'destructive',
            });
          } else {
            throw error;
          }
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: unknown) {
      console.error('Auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    navigate(`/auth?mode=${isSignUp ? 'signin' : 'signup'}`);
    setErrors({});
    setTouched({});
  };

  const handleForgotPassword = () => {
    toast({
      title: 'Password Reset',
      description: 'Please contact support to reset your password.',
    });
  };

  const isFormValid = isSignUp 
    ? email && password && fullName && password.length >= 6
    : email && password && password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-background">
      {/* Background effects - subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-72 h-72 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to home</span>
        </motion.button>

        {/* Logo - consistent size */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <img src={worknoteLogo} alt="Work-Note Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
          </motion.div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            {isSignUp
              ? 'Stay focused, organized, and in control.'
              : 'Sign in to continue to your dashboard'}
          </p>
        </div>

        {/* Form card */}
        <div className="card-elevated p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <label htmlFor="fullName" className="block text-sm font-medium cursor-pointer">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground pointer-events-none" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={(e) => handleBlur('fullName', e.target.value)}
                      placeholder="John Doe"
                      className="input-modern pl-11"
                      autoComplete="name"
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium cursor-pointer">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  placeholder="you@example.com"
                  className="input-modern pl-11"
                  autoComplete="email"
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium cursor-pointer">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => handleBlur('password', e.target.value)}
                  placeholder="••••••••"
                  className="input-modern pl-11 pr-11"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
              
              {/* Password strength indicator for signup */}
              {isSignUp && password && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 pt-1"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        className={`h-full ${strengthInfo.color} transition-all duration-300`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.score <= 1 ? 'text-destructive' : 
                      passwordStrength.score <= 2 ? 'text-warning' : 
                      passwordStrength.score <= 3 ? 'text-primary' : 'text-success'
                    }`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { key: 'length', label: '6+ characters' },
                      { key: 'hasNumber', label: 'Number' },
                      { key: 'hasUpper', label: 'Uppercase' },
                      { key: 'hasSpecial', label: 'Special char' },
                    ].map(({ key, label }) => (
                      <span 
                        key={key}
                        className={`text-[10px] flex items-center gap-1 ${
                          passwordStrength.checks[key as keyof typeof passwordStrength.checks] 
                            ? 'text-success' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        {passwordStrength.checks[key as keyof typeof passwordStrength.checks] 
                          ? <Check className="w-2.5 h-2.5" /> 
                          : <span className="w-2.5 h-2.5 rounded-full border border-current" />
                        }
                        {label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {touched.password && errors.password && (
                <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !isFormValid}
              className="btn-primary w-full text-base py-3 h-12 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </span>
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={switchMode}
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                {isSignUp ? 'Sign in' : 'Create one'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
