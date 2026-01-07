import { useState, useEffect } from 'react';
import ContainerScrollInViewIn from '../../../animation/Scroll_In_View/container/ContainerScrollInViewIn';
import ItemScrollInViewLeft from '../../../animation/Scroll_In_View/item/ItemScrollInViewLeft';
import ScrollInViewRight from '../../../animation/ScrollInViewRight';

// Thời gian đếm ngược (giờ)
const CountdownTargetHours = 72;

// Tính toán số ngày/giờ/phút/giây còn lại tới thời điểm target
const getCountdownState = (target) => {
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

// Component hiển thị countdown
export const Countdown = () => {
  const [countdownTarget] = useState(
    () => Date.now() + CountdownTargetHours * 60 * 60 * 1000
  );
  const [countdown, setCountdown] = useState(getCountdownState(countdownTarget));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownState(countdownTarget));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTarget]);

  return (
    <ContainerScrollInViewIn className="flex gap-4 sm:gap-6">
      {Object.entries(countdown).map(([label, value]) => (
        <ItemScrollInViewLeft
          key={label}
          className="relative group flex flex-col items-center min-w-[80px] sm:min-w-[90px]"
        >
          <div className="relative w-full flex flex-col items-center justify-center 
                          rounded-2xl bg-gradient-to-br from-red-900 to-red-950 
                          px-4 py-4 text-white shadow-2xl shadow-red-900/40 
                          border border-white/10 overflow-hidden transition-transform 
                          group-hover:-translate-y-2 duration-500">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors"></div>
              
              <span className="relative z-10 text-3xl sm:text-4xl font-black tracking-tighter tabular-nums drop-shadow-md">
                {value.toString().padStart(2, '0')}
              </span>

              <div className="absolute w-full h-px bg-black/10 top-1/2 left-0 shadow-[0_2px_0_rgba(255,255,255,0.09)]"></div>
          </div>
          <div className="mt-1 w-8 h-1 bg-red-900/10 blur-md rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </ItemScrollInViewLeft>
      ))}
    </ContainerScrollInViewIn>

  );
};

export default Countdown;