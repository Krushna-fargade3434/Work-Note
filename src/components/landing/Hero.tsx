import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import worknoteLogo from '@/assets/worknote-logo.png';

const features = [
  { icon: CheckCircle2, text: 'Simple task management' },
  { icon: Calendar, text: 'Smart scheduling' },
  { icon: TrendingUp, text: 'Progress tracking' },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-12 sm:py-20">
      {/* Background gradient orbs - subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col items-center">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo with glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="flex justify-center mb-6 relative"
            >
              <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-primary/15 rounded-full blur-2xl" />
              <img 
                src={worknoteLogo} 
                alt="Work-Note" 
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10 drop-shadow-lg" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/15 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Your productivity companion
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6"
            >
              Plan smarter.{' '}
              <span className="text-gradient">Finish faster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto"
            >
              A minimal task manager to help you stay focused, organized, and in control.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/80 text-secondary-foreground text-sm"
                >
                  <feature.icon className="w-3.5 h-3.5 text-primary" />
                  {feature.text}
                </div>
              ))}
            </motion.div>

            {/* CTA buttons with improved hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Link to="/auth?mode=signup" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="btn-primary w-full sm:w-auto text-base sm:text-lg px-8 py-5 sm:py-6 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth?mode=signin" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="w-full sm:w-auto text-base sm:text-lg px-8 py-5 sm:py-6 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-sm text-muted-foreground/70 mt-6"
            >
              Free forever • No credit card required
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};