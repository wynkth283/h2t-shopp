import { motion as Motion } from "framer-motion";

export default function ContainerListSlide({ children, className, ...props }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.15 }
    }
  };

  return (
    <Motion.div variants={container} initial="hidden" animate="show" className={ className } {...props}>
      {children}
    </Motion.div>
  );
}
