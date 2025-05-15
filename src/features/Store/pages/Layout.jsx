import { Header } from "../components/Header/Header"

export const Layout = ({children})=>{
    return (
<div className="bg-white">
  <Header/>
  <main className="mx-auto max-w-7xl sm:px-6 sm:pt-4 lg:px-8 w-[100vw] h-[80vh]">{children}</main>
  <footer aria-labelledby="footer-heading" className="border-t border-zinc-200 bg-white">
    <h2 id="footer-heading" className="sr-only">Footer</h2> 
  </footer>
</div>




        
    )
}