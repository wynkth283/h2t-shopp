import { motion } from "framer-motion";

export default function ItemListSlideUp({ children, ...props }) {
    const variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
    };
    return (
        <motion.div variants={variants} {...props}>
            {children}
        </motion.div>
    );
}