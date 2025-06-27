export const Modal = ({children})=> {
    return ( 
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-30">
        {children}
    </div>)
}