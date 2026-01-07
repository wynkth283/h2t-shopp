import { useState } from "react";
import FadeDown from "../../../animation/FadeDown";

export default await function Advertisement() {
    const [hidden, setHidden] = useState(false);
    // Close alert handler
    function handleCloseAdvertisement(e) {
        if (e.target.dataset.dismiss === "alert") {
            setHidden(true);
        }
    }
    if (hidden) return null;
    // Open alert

    return (
        <div data-id="alert" className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
  <FadeDown className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-[420px] shadow-2xl border border-white/20">
    
    {/* Icon + title */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold shadow-md">
        %
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Special Offer</h2>
    </div>

    {/* Content */}
    <p className="text-gray-600 leading-relaxed mb-6">
      Get exclusive **50% discount** for first purchase today.  
      Offer ends in <span className="font-semibold text-red-600">24 hours</span>.
    </p>

    {/* Close top */}
    <button
      onClick={handleCloseAdvertisement}
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
    >
      ✕
    </button>

  </FadeDown>
</div>

    );
}