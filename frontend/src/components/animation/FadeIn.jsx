import { motion } from "framer-motion";

export default function FadeIn({ children, ...props }) {
    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} {...props}>
            {children}
        </motion.div>
    );
}