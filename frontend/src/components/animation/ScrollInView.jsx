import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function ScrollInView({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5 }}>
            {children}
        </motion.div>
    );
}