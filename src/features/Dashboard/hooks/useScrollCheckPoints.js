import { useEffect, useRef, useState } from "react";

export const useScrollCheckpoints = (sections = 5) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const entryTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight;

      if (docHeight - windowHeight <= 0) return;
      const percentage = scrollTop / (docHeight - windowHeight);
      const newSection = Math.floor(percentage * sections);

      if (newSection !== currentSection) {
        const now = Date.now();
        const timeSpent = (now - entryTimeRef.current) / 1000; 
        console.log("!!!!!!!", `Sección ${currentSection} → ${newSection} : ${timeSpent - currentTime}s en pantalla, tiempo total: ${timeSpent}s`);
        setCurrentSection(newSection)
        setCurrentTime( timeSpent)
        if (scrollTop + windowHeight >= docHeight - 1) {
        console.log(' El usuario llegó al final de la página');
  }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, sections]);
};