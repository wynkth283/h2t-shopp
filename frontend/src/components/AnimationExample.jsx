import { motion as Motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Ví dụ các animation cơ bản với framer-motion
 */

// 1. Fade In đơn giản
export function FadeInExample() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-blue-500 text-white rounded"
    >
      Fade In Animation
    </motion.div>
  );
}

// 2. Slide In từ trái
export function SlideInLeftExample() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-green-500 text-white rounded"
    >
      Slide In từ trái
    </motion.div>
  );
}

// 3. Scale Animation
export function ScaleExample() {
  return (
    <motion.div  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring", stiffness: 200 }} className="p-4 bg-purple-500 text-white rounded" >
      Scale Animation
    </motion.div>
  );
}

// 4. Hover Effect
export function HoverExample() {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
      whileTap={{ scale: 0.9 }}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg"
    >
      Hover me!
    </motion.button>
  );
}

// 5. Animation khi scroll vào view
export function ScrollInViewExample() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
      Animation khi scroll vào view
    </motion.div>
  );
}

// 6. Stagger Animation (cho danh sách)
export function StaggerListExample() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {items.map((entry, index) => (
        <Motion.div
          key={index}
          variants={itemVariant}
          className="p-4 bg-yellow-500 text-white rounded"
        >
          {entry}
        </Motion.div>
      ))}
    </motion.div>
  );
}

// 7. Component tổng hợp các animation
export default function AnimationExamples() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold mb-8">Framer Motion Examples</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">1. Fade In</h2>
        <FadeInExample />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">2. Slide In từ trái</h2>
        <SlideInLeftExample />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">3. Scale Animation</h2>
        <ScaleExample />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">4. Hover Effect</h2>
        <HoverExample />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">5. Scroll In View</h2>
        <div className="h-96 overflow-y-scroll">
          <div className="h-64"></div>
          <ScrollInViewExample />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">6. Stagger List</h2>
        <StaggerListExample />
      </div>
    </div>
  );
}

