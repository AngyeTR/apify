import { Header } from "../components/Header/Header"

export const Layout = ({children})=>{
    return (
<div className="bg-white">
  <Header />
  <main className="mx-auto max-w-7xl sm:px-6 sm:pt-4 lg:px-8 w-[100vw] h-full">{children}</main>
  <footer className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-white/10 py-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center gap-x-6 md:order-2">
            {/* {footerNavigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))} */}
          </div>
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
</div>




        
    )
}