import { motion } from "framer-motion";

export default function TopToBot({ children, ...props }) {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [ -20, 5, 0 ], opacity: [0, 1, 1] }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            {...props}
        >
            {children}
        </motion.div>
    );
}