 

export const stringToTime = (isoString) => {
    const date = new Date(isoString.slice(0, 23)); 

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    const formatted = `${hours}:${minutes} - ${day}/${month}/${year}`;

    return formatted

}

export const  Check24hRange = (dateString)=> {
  const receivedDate = new Date(dateString);
  const now = new Date();
  const diffInMs = now - receivedDate;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return diffInHours <= 24;
}
