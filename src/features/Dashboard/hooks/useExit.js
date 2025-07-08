import { useEffect } from 'react';
import { adaptNavigationModel } from '../utils/adaptDataModel';
import { navigationModel } from '../utils/models';

export function useExit(message = '¿Estás seguro de que quieres salir?', uuid, idLayout) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   event.returnValue = message; 
    //   return message;
      const adaptedModel = adaptNavigationModel(navigationModel,  "exit", data.layouts[0].id, uuid, 0, 0, 3)
       post("Navigation", adaptedModel).then(res=> console.log(res))
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [message]);
}

