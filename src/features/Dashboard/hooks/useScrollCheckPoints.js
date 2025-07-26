import { useEffect, useRef } from "react";
import { postNavigation } from "../../../shared/services/API/landingApi";
import { navigationModel } from "../utils/models";
import { adaptNavigationModel } from "../utils/adaptDataModel";

export const useScrollCheckpoints = (sections = 5, uuid, idLayout) => {
  const entryTimeRef = useRef(Date.now());
  const currentSectionRef = useRef(0);
  const currentTimeRef = useRef(0);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight;

      if (docHeight - windowHeight <= 0) return;
      
      const percentage = scrollTop / (docHeight - windowHeight);
      const newSection = Math.floor(percentage * sections);
      
      if (newSection !== currentSectionRef.current) {
        const now = Date.now();
        const timeSpent = (now - entryTimeRef.current) / 1000; 
        const adaptedModel = adaptNavigationModel( navigationModel,  `${currentSectionRef.current}-${newSection}`, idLayout, uuid, timeSpent - currentTimeRef.current, timeSpent, 1)
        currentSectionRef.current = newSection;
        currentTimeRef.current = timeSpent;
        await postNavigation( adaptedModel).then(res=> console.log(res))

      if (scrollTop + windowHeight >= docHeight - 1) {
        const adaptedModel = adaptNavigationModel( navigationModel, "end", idLayout, uuid, timeSpent - currentTimeRef.current, timeSpent, 1)
        await postNavigation( adaptedModel).then(res=> console.log(res))
  }}};
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, uuid, idLayout])
};





