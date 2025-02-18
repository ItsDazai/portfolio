import React, { useEffect } from "react";
import "./StackedCardsMobile.css";

const StackedCardsMobile = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".mobile-card");
    const stackArea = document.querySelector(".mobile-stack-area");

    const animateCards = () => {
      let angle = 0;
      cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
          card.style.transform = `translate(-50%, -150vh) rotate(-48deg)`;
        } else {
          card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
          angle -= 10;
          card.style.zIndex = cards.length - index;
        }
      });
    };

    const handleScroll = () => {
      const distance = window.innerHeight * 0.5;
      const topVal = stackArea.getBoundingClientRect().top;
      const index = Math.floor(-1 * (topVal / distance + 1));

      cards.forEach((card, i) => {
        card.classList.toggle("away", i <= index);
      });
      animateCards();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mobile-stack-area">
      <div className="mobile-left">
        <div className="mobile-title">Our Features</div>
        <div className="mobile-sub-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <br />
          <button>See More Details</button>
        </div>
      </div>

      <div className="mobile-right">
        <div className="mobile-card">
          <div className="mobile-sub">Simplified</div>
          <div className="mobile-content">Complex tasks are now simple</div>
        </div>
        <div className="mobile-card">
          <div className="mobile-sub">Boost Productivity</div>
          <div className="mobile-content">Perform Tasks in less time</div>
        </div>
        <div className="mobile-card">
          <div className="mobile-sub">Facilitated learning</div>
          <div className="mobile-content">Train anyone from anywhere</div>
        </div>
        <div className="mobile-card">
          <div className="mobile-sub">Support</div>
          <div className="mobile-content">Now its 24/7 support</div>
        </div>
      </div>
    </div>
  );
};

export default StackedCardsMobile;