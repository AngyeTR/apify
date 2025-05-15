import { useState, useEffect } from "react"
import { CollectionsList } from "../components/CollectionsList";
import { ResourcesView } from "../components/ResourcesView";
import { HiOutlineHome } from "react-icons/hi";
import { Button } from "../../../shared/components/uikit/button"
import { useNavigate } from "react-router-dom";
import { getByCompanyId } from "../../../shared/services/API/api"

export const ResourcesPage=()=>{
    const [collection, setCollection] = useState(null)
    console.log(collection)
    const nav = useNavigate()
    const cols = [ 
        {name: "Collection 1", id:1,
        data:[
            {name:"file", type:"image", url:"https://contents.mediadecathlon.com/p2671912/1cr1/k$09097b15becc8c1847d604fcbcfbb926/guayos-futbol-viralto-iii-3d-air-mesh-fg.jpg?format=auto&f=768x0"},
            {name:"file", type:"image", url:"https://contents.mediadecathlon.com/p2671912/1cr1/k$09097b15becc8c1847d604fcbcfbb926/guayos-futbol-viralto-iii-3d-air-mesh-fg.jpg?format=auto&f=768x0"},
            {name:"file", type:"image", url:"https://contents.mediadecathlon.com/p2671912/1cr1/k$09097b15becc8c1847d604fcbcfbb926/guayos-futbol-viralto-iii-3d-air-mesh-fg.jpg?format=auto&f=768x0"},
            {name:"file", type:"video", url:"https://contents.mediadecathlon.com/p2671912/1cr1/k$09097b15becc8c1847d604fcbcfbb926/guayos-futbol-viralto-iii-3d-air-mesh-fg.jpg?format=auto&f=768x0"},
            {name:"file", type:"video", url:"https://www.youtube.com/embed/-VGQxQHLXEI?si=trey54RoReblOwn4"}
        ]}, 
        {name: "Collection 2", id:2,
            data:[   ]}, 
            {name: "Collection 3", id:3,
                data:[
                     {name:"file", type:"image", url:"https://contents.mediadecathlon.com/p2671912/1cr1/k$09097b15becc8c1847d604fcbcfbb926/guayos-futbol-viralto-iii-3d-air-mesh-fg.jpg?format=auto&f=768x0"}
                ]}, 
    ]
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        getByCompanyId(1).then((res) => console.log(res));
        getByCompanyId(1).then((res) => {setCollections(res)});
      }, []);

    return ( 
        <div >
            <Button onClick={()=>nav("/designer/editor")} className="mt-5" color="light"><HiOutlineHome className="size-6 justify-self-start" />
            </Button>
        <div className=" h-[90vh] w-[90vw] sm:grid sm:grid-cols-6 gap-1 justify-items-center m-0 p-0 mt-1 justify-self-center">
           <CollectionsList collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />
        <div className="border border-zinc-400 w-full m-1 rounded-lg p-1 pt-2 col-span-5 ">
            <ResourcesView  collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />
         </div>
    </div></div>
    )
}