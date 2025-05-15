import { Carousel } from "../Carousel/Carousel"

export const PromosContainer= ()=> {
    return (
        <div className="bg-white">
            <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
                <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Promos</h2>
                </div>
                <Carousel type="card"/>
            </div>
        </div>)
}



