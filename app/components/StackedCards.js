import React, { useEffect } from "react";
import "./StackedCards.css";

const StackedCards = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    const stackArea = document.querySelector(".stack-area");

    const animateCards = () => {
      const isMobile = window.innerWidth <= 768;
      let angle = 0;
      
      cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
          card.style.transform = isMobile 
            ? "translate(-50%, -150vh) rotate(-48deg)"
            : "translateY(-120vh) rotate(-48deg)";
        } else {
          const transform = isMobile
            ? `translate(-50%, -50%) rotate(${angle}deg)`
            : `rotate(${angle}deg)`;
          card.style.transform = transform;
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
    <div className="stack-area">
      <div className="left">
        <div className="title">Certifications</div>
        <div className="sub-title">
          Throughout the expriences I have certainly gained some valuable ones
          <br />
          <button>Connect With me</button>
        </div>
      </div>

      <div className="right">
        <div className="card">
          <div className="sub">UpGrad</div>
          <div className="content">Full-Stack Java Dev</div>
        </div>
        <div className="card">
          <div className="sub">Father Agnel</div>
          <div className="content">Diploma in IT Advance</div>
        </div>
        <div className="card">
          <div className="sub">Intelectual Property India</div>
          <div className="content">IP Awarness Training</div>
        </div>
        <div className="card">
          <div className="sub">Lokmanya Tilak College Of Eng.</div>
          <div className="content">Python Workshop</div>
        </div>
      </div>
    </div>
  );
};

export default StackedCards;