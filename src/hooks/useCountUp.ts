// src/hooks/useCountUp.ts
import { useEffect, useState, useRef } from "react";

interface UseCountUpOptions {
  end: number; // The target number
  duration?: number; // How long the animation should take in milliseconds
  //   startOnEnter?: boolean; // If true, the count starts when the component is in view
  startValue?: number; // The starting value (defaults to 0)
}

const useCountUp = (options: UseCountUpOptions) => {
  const {
    end,
    duration = 1500,
    // startOnEnter = false,
    startValue = 0,
  } = options;
  const [count, setCount] = useState(startValue);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false); // To ensure animation runs only once

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const progress = (timestamp - startTimeRef.current) / duration;
    const value = Math.min(progress, 1) * (end - startValue) + startValue;

    setCount(Math.floor(value)); // Use Math.floor for integer counts

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end); // Ensure it ends exactly at the target
      animationFrameRef.current = null;
    }
  };

  const startAnimation = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startTimeRef.current = null; // Reset start time for a fresh animation
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => stopAnimation();
  }, []);

  return {
    count,
    startAnimation,
    stopAnimation,
    hasStarted: hasStartedRef.current,
  };
};

export default useCountUp;
