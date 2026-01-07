import { motion } from "framer-motion";

export default function ItemScrollInView({ children, className }) {
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
