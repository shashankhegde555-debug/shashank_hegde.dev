import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const x = useSpring(mouseX, { damping: 20, stiffness: 350, mass: 0.1 });
  const y = useSpring(mouseY, { damping: 20, stiffness: 350, mass: 0.1 });

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return null;

  useEffect(() => {
    // Only render on fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const t = e.target;
      setIsHovering(!!(t.closest('button') || t.closest('a') || t.closest('[data-hover="true"]')));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []); // eslint-disable-line

  // The outer shell is a zero-size anchor point (w:0 h:0) fixed to the spring position.
  // The visible ring is absolutely centered on that point using translate(-50%,-50%).
  // This prevents ANY layout artifact — the outer div contributes zero pixels.
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        x,
        y,
        zIndex: 99999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Visible ring — centered on the anchor via translate */}
      <motion.div
        animate={{
          width:  isHovering ? 90 : 40,
          height: isHovering ? 90 : 40,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.7)',
          /* invert(1) flips all colors inside the circle — works on video too
             because backdrop-filter operates on the final composited pixels */
          backdropFilter: 'invert(1)',
          WebkitBackdropFilter: 'invert(1)',
          background: 'transparent',
          boxShadow: isHovering
            ? '0 0 0 1px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.15)'
            : '0 0 0 1px rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.15 }}
              style={{
                color: '#000',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precision center dot */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: 'white',
          opacity: isHovering ? 0 : 0.9,
          transition: 'opacity 0.15s ease',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </motion.div>
  );
}
