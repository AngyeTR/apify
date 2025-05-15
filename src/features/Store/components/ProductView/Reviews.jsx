import { Stars } from "../Stars/Stars"
import {Avatar} from "../../../../shared/components/uikit/avatar"

export const Reviews = ({data})=>{
    let items = [{id:1, user:"user1", score: 4, review: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"},
        {id:2, user:"user2", score: 1, review: "Not Good"},
        {id:3, user:"user3", score: 5, review: "Excellent"},
        {id:4, user:"user4", score: 5, review: ""}]
    // data && (items = data)
    const promScore = items.length > 0 ? items.reduce((sum, item) => sum + item.score, 0) / items.length : 0

    const getPercent= (items, value)=>{
        const percent = (items.filter(item => item.score === value).length / items.length ) * 100
        return percent}

    return (
    <section aria-labelledby="reviews-heading" className="bg-white">
        {data && 
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-zinc-900">Comentarios de los compradores</h2>
          <div className="mt-3 flex items-center">
            <Stars maxScore={5} score={promScore} />
            <p className="ml-2 text-sm text-zinc-900">Basado en {items.length} comentarios</p>
          </div>

        <div className="my-6">
          {Array.from({ length: 5 }).map((_, i) =>(
            <div className="flex items-center justify-self-end w-full  text-sm">
            <p className="w-3 font-medium text-zinc-900 mx-2 ">{i}</p>
            <Stars maxScore={5} score={i} className="mx-2"/>
            <p className="mx-2">{getPercent(items, i)}%</p>
             </div>))}
        </div>
        </div>

        <div className="mt- lg:col-span-7 lg:col-start-6 lg:mt-0">
          <div className="flow-root">
            <div className="-my-4 divide-y divide-zinc-200">
        {items.map((item)=>{
            return (
                <div className="py-4">
                <div className="flex items-center">
                  <Avatar src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="Emily Selman." className="size-8"/>
                  <div className="ml-4">
                    <h4 className="text-sm font-bold text-zinc-900">{item.user}</h4>
                    <div className="mt-1 flex items-center">
                     <Stars maxScore={5} score={item.score} />
                    </div>
                  </div>
                </div>
                <p className="space-y-6 text-base text-zinc-600 italic">{item.review}</p>
              </div> )})}
            </div>
          </div>
        </div>
      </div>}
    </section>
    )
}