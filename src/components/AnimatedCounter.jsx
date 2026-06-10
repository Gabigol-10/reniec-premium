import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const AnimatedCounter = ({ value, duration = 1 }) => {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

export default AnimatedCounter;
