import { useEffect, useRef, useState } from "react";
import { postNavigation } from "../../../shared/services/API/landingApi";
import { navigationModel } from "../utils/models";
import { adaptNavigationModel } from "../utils/adaptDataModel";

export const useScrollCheckpoints = (sections = 5, uuid, idLayout) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const entryTimeRef = useRef(Date.now());


  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight;

      if (docHeight - windowHeight <= 0) return;
      const percentage = scrollTop / (docHeight - windowHeight);
      const newSection = Math.floor(percentage * sections);

      if (newSection !== currentSection) {
        const now = Date.now();
        const timeSpent = (now - entryTimeRef.current) / 1000; 
        const adaptedModel = adaptNavigationModel( navigationModel,  `${currentSection}-${newSection}`, idLayout, uuid, timeSpent - currentTime, timeSpent, 1)
        await postNavigation( adaptedModel).then(res=> console.log(res))
        setCurrentSection(newSection)
        setCurrentTime( timeSpent)
        if (scrollTop + windowHeight >= docHeight - 1) {
          const adaptedModel = adaptNavigationModel( navigationModel, "end", idLayout, uuid, timeSpent - currentTime, timeSpent, 1)
          await postNavigation( adaptedModel).then(res=> console.log(res))
  }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, sections]);
};