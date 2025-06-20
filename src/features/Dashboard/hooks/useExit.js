import { useEffect } from 'react';

export function useExit(message = '¿Estás seguro de que quieres salir?') {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   event.returnValue = message; 
    //   return message;
    console.log(message)
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [message]);
}

