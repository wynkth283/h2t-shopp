import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContainerScrollInViewIn({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,  // thời gian xuất hiện từng item
        delayChildren: 0.1     // trễ trước khi chạy item đầu tiên
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
