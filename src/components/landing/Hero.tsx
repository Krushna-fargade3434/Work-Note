import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import worknoteLogo from '@/assets/worknote-logo.png';

const features = [
  { icon: CheckCircle2, text: 'Simple task management' },
  { icon: Calendar, text: 'Date-wise organization' },
  { icon: TrendingUp, text: 'Track your progress' },
];


export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-12 sm:py-20">
      {/* Centered content layout */}
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
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
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="flex justify-center mb-8"
            >
              <img src={worknoteLogo} alt="Work-Note" className="w-24 h-24 sm:w-28 sm:h-28 object-contain" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-light border border-primary/20 text-primary text-sm sm:text-base font-medium mb-6 sm:mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Your daily productivity companion
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8"
            >
              Get things done with{' '}
              <span className="text-gradient">Work-Note</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto"
            >
              A minimal, beautiful task manager designed to help you focus on what matters most.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center mb-8 sm:mb-10"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm sm:text-base"
                >
                  <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  {feature.text}
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/auth?mode=signup" className="w-full sm:w-auto">
                <Button size="lg" className="btn-primary w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-10 py-6">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/auth?mode=signin" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="btn-secondary w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-10 py-6">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};