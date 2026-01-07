import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function ScrollInViewRight({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
        <motion.div ref={ref} initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
            {children}
        </motion.div>
    );
}