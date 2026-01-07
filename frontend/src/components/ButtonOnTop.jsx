import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export default function EnhancedButtonOnTop() {
  const [show, setShow] = useState(false);
  
  // 1. Lấy phần trăm đã cuộn trang
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      // Hiện nút khi cuộn xuống 400px
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50 group"
        >
          {/* Tooltip hiển thị khi hover */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Lên đầu trang
          </span>

          <motion.button
            whileHover={{ scale: 1.1, shadow: "0 0 20px rgba(220, 38, 38, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-14 h-14 rounded-full 
                       bg-gradient-to-br from-red-500 to-red-700 
                       text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                       backdrop-blur-md border border-white/20
                       overflow-hidden"
          >
            {/* Vòng tròn tiến trình bao quanh nút */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                stroke="white"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="0 1"
                style={{ pathLength: scrollYProgress, opacity: 0.3 }}
              />
            </svg>

            {/* Icon với hiệu ứng trượt khi hover */}
            <div className="relative overflow-hidden h-6 w-6">
               <motion.svg 
                xmlns="www.w3.org" 
                className="h-6 w-6"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </motion.svg>
            </div>

            {/* Hiệu ứng tia sáng quét qua khi hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
