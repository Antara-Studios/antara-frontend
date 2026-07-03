export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
}

export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  },
}

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}
