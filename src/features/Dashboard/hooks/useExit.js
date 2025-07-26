import { useEffect } from 'react';
import { adaptNavigationModel } from '../utils/adaptDataModel';
import {postNavigation} from "../../../shared/services/API/landingApi"
import { navigationModel } from '../utils/models';

export function useExit(message = '¿Estás seguro de que quieres salir?', uuid, idLayout) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   event.returnValue = message; 
    //   return message;
      const adaptedModel = adaptNavigationModel(navigationModel,  "exit", data.layouts[0].idLayout, uuid, 0, 0, 3)
       postNavigation( adaptedModel).then(res=> console.log(res))
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [message]);
}

