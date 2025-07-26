import { useState, useEffect } from "react"
import { CollectionsList } from "../components/CollectionsList";
import { useLocalStorage} from "../../../shared/hooks/useLocalStorage"
import { ResourcesView } from "../components/ResourcesView";
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
    <SidebarLayout sidebar={<CollectionsList collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />} >
             <ResourcesView  collection={collection} setCollection={setCollection} data={collections} setData={setCollections} />
    </SidebarLayout>)
}