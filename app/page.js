"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './globals.css';
import StackedCards from './components/StackedCards';

const imagesData = [
  { image: '/IPR_EVENT.png', title: 'Image 1' },
  { image: '/Pythonworkshop.png', title: 'Image 2' },
  { image: '/IPR_EVENT.png', title: 'Image 3' },
  { image: '/Pythonworkshop.png', title: 'Image 2' },
];

const Avatar = () => {
  const avatarRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef(null);

  // Initialize client-side rendering check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mouse move effect for avatar
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (event) => {
      if (avatarRef.current) {
        const { clientX, clientY } = event;
        const { left, top, width, height } = avatarRef.current.getBoundingClientRect();
        const offsetX = (clientX - (left + width / 2)) / 20;
        const offsetY = (clientY - (top + height / 2)) / 20;
        avatarRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (avatarRef.current) {
        avatarRef.current.style.transform = 'translate(0, 0)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    if (avatarRef.current) {
      avatarRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (avatarRef.current) {
        avatarRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isClient]);

  // Optimized scroll effect for parallax with requestAnimationFrame
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrollPosition(scrollY);

        // Slower speed multipliers for smoother parallax
        const speed1 = 0.2;
        const speed2 = -0.15;

        if (row1Ref.current) {
          const newScrollLeft1 = scrollY * speed1;
          row1Ref.current.style.transform = `translateX(${newScrollLeft1}px)`;
          setScrollLeft1(newScrollLeft1);
        }
        if (row2Ref.current) {
          const newScrollLeft2 = scrollY * speed2;
          row2Ref.current.style.transform = `translateX(${newScrollLeft2}px)`;
          setScrollLeft2(newScrollLeft2);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient]);

  // About me animation with client-side check
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const aboutMeContainer = document.querySelector('.about-me-container');
      if (!aboutMeContainer) return;

      const text = aboutMeContainer.querySelector('text');
      if (!text) return;

      const triggerPoint = aboutMeContainer.offsetTop - window.innerHeight * 0.8;

      if (window.scrollY > triggerPoint) {
        text.style.animationPlayState = 'running';
      } else {
        text.style.animationPlayState = 'paused';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Text container animation with client-side check
  useEffect(() => {
    if (!isClient) return;

    const handleTextScroll = () => {
      const textContainer = document.querySelector('.text-container');
      if (!textContainer) return;

      const paragraphs = textContainer.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
        const triggerPoint = textContainer.offsetTop - window.innerHeight * 0.8;

        if (window.scrollY > triggerPoint) {
          paragraph.style.animationPlayState = 'running';
        } else {
          paragraph.style.animationPlayState = 'paused';
        }
      });
    };

    window.addEventListener('scroll', handleTextScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleTextScroll);
  }, [isClient]);

  const imagesPerRow = Math.ceil(imagesData.length / 2);

  const calculateRepetitions = () => {
    if (!isClient) return 1;
    const visibleWidth = window.innerWidth;
    return Math.ceil((visibleWidth * 3) / 310) + 2;
  };

  const repetitions = calculateRepetitions();
  const repeatedImagesData1 = Array(repetitions).fill(imagesData.slice(0, imagesPerRow)).flat();
  const repeatedImagesData2 = Array(repetitions).fill(imagesData.slice(imagesPerRow)).flat();

  const initialOffset1 = isClient ? -(window.innerWidth / 2) : 0;
  const initialOffset2 = isClient ? -(window.innerWidth / 2) : 0;

  const imageRowStyle = {
    display: 'flex',
    transition: 'transform 0.05s linear',
    gap: '0px',
    willChange: 'transform'
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  
  




  
//   #############################################################################
  return (
    <div className="grid grid-rows-[10px_1fr_20px] items-center justify-items-center min-h-screen bg-black p-8 pb-20 gap-16 sm:p-[1vw] sm:mt-[3vw] font-[family-name:var(--font-montserrat)]">
      

      {/* Title main text */}
  
      <h1 className="text-[20vw] sm:text-[15vw] font-black text-center sm:text-center mt-[30vw] sm:mt-[5vw] text-white">
        HI, THERE
      </h1>


      {/* Avatar Div */}


      <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start mt-[1rem] sm:mt-[-5rem]">
        <Image
          ref={avatarRef}
          src="/avatar.png"
          alt="Avatar"
          width={1080}
          height={720}
          priority
          className="rounded-full transition-transform duration-200 ease-out"
        />
      </main>


      {/* Parallax Div */}


      <div className="parallax-container overflow-hidden bg-black">
        <div className="image-row" ref={row1Ref} style={{ transform: `translateX(${initialOffset1}px)` }}>
          {repeatedImagesData1.map((image, index) => (
            <div key={index} className="image-item">
              <Image src={image.image} alt={image.title} width={300} height={200} />
            </div>
          ))}
        </div>
        <div className="image-row" ref={row2Ref} style={{ transform: `translateX(${initialOffset2}px)` }}>
          {repeatedImagesData2.map((image, index) => (
            <div key={index} className="image-item">
              <Image src={image.image} alt={image.title} width={300} height={200} />
            </div>
          ))}
        </div>
      </div>  
      <div className="parallax-placeholder"></div>


      {/* About me Div */}


<div className='full-screen-section'>
      <div className="about-me-container">
        <text x="50%" y="50%" className="stroke-text" dominantBaseline="middle" textAnchor="middle">
          About Me
        </text>
      </div>
        
      <div class="text-container justify-center items-center align-middle mt-[1rem] sm:mt-[-20rem]">
        <p>Recent computer science graduate with a strong foundation in programming, algorithms, and software
engineering principles.</p>
        <p>Skilled in Python, JavaScript, and web development basics, with a passion for
building efficient, user-centered applications.</p> 
        <p>Quick learner with a keen interest in expanding skills through
real-world projects and collaborative environments.</p>
        <p>Committed to bring creativity and a problem-solving mindset to a dynamic development team</p>
      </div>  
      </div>

      {/* Education */}
<div>
  <StackedCards />
</div>

      <section className="full-screen-section services-container"> 
        <div className="services-content"> {/* Container for the content */}
          <h2 className="services-title mt-[-1rem] sm:mt-[-10rem]">Education</h2>

          <div className="service-item mt-[10rem]">
            <div className="service-number mb-[-1rem] mt-[-1.5rem] pl-2 pr-5">01</div>
            <div className="service-description">
              <h3 className="service-subtitle">Govt. Polytechnic Thane</h3>
              <p className='mt-[-1rem]'>Diploma in Mechanical Engineering</p>
              <p className='mt-[-0.5rem]'>~ Jul 2018 to May 2021</p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-number mb-[-1rem] mt-[-1.5rem] p-1">02</div>
            <div className="service-description">
              <h3 className="service-subtitle">Lokmanya Tilak College Of Eng.</h3>
              <p className='mt-[-1rem]'>B.E Computer Science Engineering (IOT, BlockChain & CyberSecurity)</p>
              <p className='mt-[-0.5rem]'>~ Jul 2021 to May 2024</p>
            </div>
          </div>

          {/* Add more service items as needed */}
        </div>
      </section>  



                  {/* Certification */}


{/*
       <section className="full-screen-section services-container">  
        <div className="services-content">    {/* Container for the content */}
        {/*
        <h2 className="services-title mt-[-1rem] sm:mt-[-20rem]">Certification</h2>

          <div className="service-item">
            <div className="service-number mb-[-1rem] mt-[-1.5rem] pl-2 pr-5">01</div>
            <div className="service-description">
              <h3 className="service-subtitle">Father Agnel Technical Institute</h3>
              <p className='mt-[-1rem]'>Diploma in I.T Advance</p>
              <p className='mt-[-0.5rem]'>~ Jul 2017 to May 2028</p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-number mb-[-1rem] mt-[-1.5rem] p-1">02</div>
            <div className="service-description">
              <h3 className="service-subtitle">UpGrad</h3>
              <p className='mt-[-1rem]'>Full Stack Java Development</p>
              <p className='mt-[-0.5rem]'>~ Nov 2023 to Dec 2024</p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-number mb-[-1rem] mt-[-1.5rem] p-1">02</div>
            <div className="service-description">
              <h3 className="service-subtitle">UpGrad</h3>
              <p className='mt-[-1rem]'>Full Stack Java Development</p>
              <p className='mt-[-0.5rem]'>~ Nov 2023 to Dec 2024</p>
            </div>
          </div>

          {/* Add more service items as needed */}
          {/*
        </div>
      </section>   */}

    </div>
  );
};

export default Avatar;