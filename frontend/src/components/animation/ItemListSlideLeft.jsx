import { motion as Motion } from "framer-motion";

export default function ItemListSlideLeft({ children, ...props }) {
    const variants = {
        hidden: { opacity: 0, x: 40 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } }
    };
    return (
        <Motion.div variants={variants} {...props}>
            {children}
        </Motion.div>
    );
}