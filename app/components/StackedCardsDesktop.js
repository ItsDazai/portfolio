import React, { useEffect } from "react";
import "./StackedCardsDesktop.css";

const StackedCardsDesktop = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".desktop-card");
    const stackArea = document.querySelector(".desktop-stack-area");

    const rotateCards = () => {
      let angle = 0;
      cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
          card.style.transform = `translateY(-120vh) rotate(-48deg)`;
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle = angle - 10;
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
      rotateCards();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="desktop-stack-area">
      <div className="desktop-left">
        <div className="desktop-title">Our Features</div>
        <div className="desktop-sub-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <br />
          <button>See More Details</button>
        </div>
      </div>

      <div className="desktop-right">
        <div className="desktop-card">
          <div className="desktop-sub">Simplified</div>
          <div className="desktop-content">Complex tasks are now simple</div>
        </div>
        <div className="desktop-card">
          <div className="desktop-sub">Boost Productivity</div>
          <div className="desktop-content">Perform Tasks in less time</div>
        </div>
        <div className="desktop-card">
          <div className="desktop-sub">Facilitated learning</div>
          <div className="desktop-content">Train anyone from anywhere</div>
        </div>
        <div className="desktop-card">
          <div className="desktop-sub">Support</div>
          <div className="desktop-content">Now its 24/7 support</div>
        </div>
      </div>
    </div>
  );
};

export default StackedCardsDesktop;