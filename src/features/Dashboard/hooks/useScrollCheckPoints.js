import { useEffect, useRef, useState } from "react";

export const useScrollCheckpoints = (sections = 5) => {
  const [currentSection, setCurrentSection] = useState(0);
  const entryTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const percentage = scrollTop / docHeight;
      const newSection = Math.floor(percentage * sections);

      if (newSection !== currentSection) {
        const now = Date.now();
        const timeSpent = (now - entryTimeRef.current) / 1000; // en segundos
        console.log("!!!!!!!", `Sección ${currentSection} → ${newSection}, tiempo: ${timeSpent}s`);
        setCurrentSection(prev => prev + 1)
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, sections]);
};