import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const ScrollToTopButton = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const totalScroll = fullHeight - windowHeight;
    const scrolled = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;

    setScrollPercent(scrolled);
    setVisible(scrollTop > 100);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Circle length for 15.9155 radius
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 w-14 h-14 z-50 cursor-pointer transition-all duration-500 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <div className="relative w-full h-full">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <path
            className="fill-none stroke-gray-300 stroke-[3]"
            d="
              M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831
            "
          />
          {/* Progress circle */}
          <path
            className="fill-none stroke-red-600 stroke-[3] stroke-linecap-round transition-all duration-200 ease-out"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
            d="
              M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831
            "
          />
        </svg>
        {/* Center arrow icon */}
        <div className="absolute inset-0 flex items-center justify-center text-red-600">
          <FaArrowUp className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ScrollToTopButton;
