import { motion } from "framer-motion";

export default function ItemScrollInViewRight({ children, className }) {
  const item = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
