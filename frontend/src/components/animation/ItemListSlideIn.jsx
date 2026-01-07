import { motion } from "framer-motion";

export default function ItemListSlideIn({ children, ...props }) {
    const variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }
    };
    return (
        <motion.div variants={variants} {...props}>
            {children}
        </motion.div>
    );
}