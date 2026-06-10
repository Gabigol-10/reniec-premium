// Framer Motion animation variants reutilizables

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const tapScale = {
  scale: 0.95
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 }
};

// Custom easing curves
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOutCubic = [0.65, 0, 0.35, 1];
export const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

// Keyframe animations
export const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const rotate = {
  rotate: 360,
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear'
  }
};

export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};
