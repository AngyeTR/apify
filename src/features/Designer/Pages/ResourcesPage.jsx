import { useState, useEffect } from "react"
import { CollectionsList } from "../components/CollectionsList";
import { useLocalStorage} from "../../../shared/hooks/useLocalStorage"
import { ResourcesView } from "../components/ResourcesView";
import { HiOutlineHome } from "react-icons/hi";
import { Button } from "../../../shared/components/uikit/button"
import { useNavigate } from "react-router-dom";
import { getByCompanyId } from "../../../shared/services/API/api"
import { SidebarLayout } from "../../../shared/components/uikit/sidebar-layout";

export const ResourcesPage=()=>{
    const [collection, setCollection] = useState(null)
    const [data] = useLocalStorage("data")
    const nav = useNavigate()
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        getByCompanyId("Libraries", data.company.id).then((res) => {setCollections(res.data)});
      }, []);

    return (    
    //     <div className=" h-[90vh] w-[90vw] sm:grid sm:grid-cols-6 gap-1 justify-items-center m-0 p-0 mt-1 justify-self-center">
    //        <CollectionsList collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />
    //     <div className="border border-zinc-200 bg-zinc-100 w-full m-1 rounded-xl p-1 pt-2 col-span-5 ">
    //         <ResourcesView  collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />
    //      </div>
    // </div>

    <SidebarLayout sidebar={<CollectionsList collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />} >
         {/* <div className="border border-zinc-200 bg-zinc-100 w-full m-1 rounded-xl p-1 pt-2 col-span-5 "> */}
             <ResourcesView  collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />
          {/* </div> */}
    </SidebarLayout>



    )
}