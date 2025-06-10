import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);
import { TableHead, TableHeader, TableRow } from "../../../../shared/components/uikit/table.jsx"
import { HiOutlinePencil, HiOutlineEye  } from "react-icons/hi";
import { FaClone } from "react-icons/fa6";
import { useRef } from "react";
import { Modal } from "../../../../shared/components/Modal.jsx";
import { Navbar, NavbarSection,} from '../../../../shared/components/uikit/navbar'
import { Button } from "../../../../shared/components/uikit/button";
import { Heading } from "../../../../shared/components/uikit/heading";
import { Field, Label } from "../../../../shared/components/uikit/fieldset";
import { Input } from "../../../../shared/components/uikit/input";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { Loader} from "../../../../shared/components/Loader.jsx"
import { Wizard } from "../wizard/wizard.jsx"
import { getByCompanyId } from "../../../../shared/services/API/api.js";

const Table  = ({data, headers, setModal}) => {
  console.log(data)
    const params = useParams()
    const nav = useNavigate()
    const tableRef = useRef(null);
    const [stored] = useLocalStorage("data")
    data.reverse()
  return (
    <DataTable data={data.reverse()} className="display "  key={params.option} ref={tableRef}  id="myTable"
    slots={{0: (data) => (
    <div className="justify-center" style={{display: "flex"}}>
      <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=>setModal({status:true, id: data, action: "Editar"})}/>
      <HiOutlineEye  className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=>nav(`/dashboard/salestunnel/${data}`)}/>
      <FaClone className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=>setModal({status:true, id: data, action: "Clonar"})}/></div>
    )}}>
      <TableHead>
        <TableRow className="justify-center " >
          {headers.map((option)=><TableHeader key={option}>{option}</TableHeader>)}
        </TableRow>
      </TableHead>
      </DataTable> )} 

export function TunnelTable({data}) {
  const [modal, setModal] = useState({status:false, id: null, action: null})
  const [newCampaign, setNewCampaign] = useState(null)
  const [loading, setLoading] = useState(false) 
   const [camps, setCamps] = useState(null) 
  const nav = useNavigate()
   const [stored] = useLocalStorage("data")

  const filteredData = data?.map(item => [item.id, item.name, item.description, camps?.filter(camp=> camp.id==item.idCampaign)[0].name, item.initialDate, item.endDate])
  const headers = ["Acciones", "Nombre", "Descripción", "Campaña", "Fecha de Inicio", "Fecha de Fin"]
  
  const clone = async () =>{
   console.log("clonning")
  }

  useEffect(()=>{getByCompanyId("CampaingCompanies", stored.company.id).then(res=>setCamps(res.data))},[])
 useEffect(()=>{filteredData && render()}, [data])
  const render = ()=> {
    if(filteredData?.length > 0 && headers.length > 0 ){
      return (
        <div className="w-[99%] overflow-x-scroll">
        <Table  data={filteredData.reverse()} headers={headers} setModal={setModal} />
        </div>
      )}}

  return (
    <>
     <Navbar className="grid grid-flow-col justify-items-end" >
      <NavbarSection className="w-fit">
          <Input className="w-xs" placeholder="Nombre de nueva campaña" onChange={(e)=>setNewCampaign(e.target.value)}/>
          <Button  onClick={()=>setCampaignCreator(true)}>Añadir Campaña</Button>
          <Button  onClick={()=>setModal({status:true, id: null, action: "Crear"})}>Crear Tunel</Button>
      </NavbarSection>
    </Navbar>
    { !filteredData  ? <p>Cargando tabla.. </p> : filteredData?.length ==0 ? <p>No se encontraron registros </p> :render()}
    {modal.status && <Modal>
      <div className="bg-zinc-50 rounded-lg w-[90%] md:w-[70%] h-[90%] overflow-scroll py-10 justify-items-center"> 
        <div className="grid grid-cols-6 w-full"><div/><Heading className="mb-5 col-span-4 justify-self-center">{modal.action} Tunel de Ventas </Heading>
        <Button className="w-fit h-fit justify-self-center" onClick={()=>setModal({status:false, id: null, action: null})}>Cerrar</Button></div>
     { modal.action == "Clonar" ?  <Field className="w-md justify-items-center">
          <Label >Nombre del Nuevo Tunel</Label>
          <Input className="w-sm mb-5" placeholder="Inserte de nombre del nuevo Tunel" onChange={e=> setIdToClone(prev=> ({...prev, name: e.target.value}))}/>
          <Label>Producto del nuevo Layout</Label>
          <Input className="my-3" type="datetime-local" placeholder="Fecha de Inicio" />
          <Input className="my-3" type="datetime-local" placeholder="Fecha de Fin" />
        {<Button onClick={clone} className="mx-1" >{loading ? <Loader/> :"Clonar"}</Button>}
        <Button onClick={()=>setIdToClone(null)} color="red" className="mx-1">{loading ? <Loader/> : "Cerrar"}</Button>
        </Field> : 
        <Wizard/>
        }
      </div>
      </Modal>}
      {/* {campaignCreator && <Modal>
        <div className="bg-zinc-50 rounded-lg w-[80vw] h-[90vh] py-10 justify-items-center"> 
          <div className="grid grid-cols-6 w-full"><div/><Heading className="mb-5 col-span-4 justify-self-center">Nueva Campaña </Heading>
          <Button className="w-fit h-fit justify-self-center" onClick={()=>setCampaignCreator(null)}>Cerrar</Button></div>   
<FormCampaign/>
</div>   </Modal>} */}
    </>)
}