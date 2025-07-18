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
import { getByCompanyId, post } from "../../../../shared/services/API/api.js";
import { campaignModel } from "../../utils/models.js";
import { FaFacebook, FaTiktok  } from "react-icons/fa";
import { DropdownButton, DropdownMenu, Dropdown, DropdownItem} from "../../../../shared/components/uikit/dropdown.jsx"
import { FormNewCampaign } from "../forms/FormNewCampaign.jsx";

const Table  = ({data, headers, setModal}) => {
    const params = useParams()
    const nav = useNavigate()
    const tableRef = useRef(null);

  return (
    <DataTable data={data} className="display "  key={params.option} ref={tableRef}  id="myTable"
    slots={{0: (data) => (
    <div className="justify-center" style={{display: "flex"}}>
      <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=>setModal({status:true, id: data, action: "Editar"})}/>
      <HiOutlineEye  className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=>nav(`/dashboard/salestunnel/${data}`)}/>
      <FaClone className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=>setModal({status:true, id: data, action: "Clonar"})}/></div>
    ),
    7: (data) => ( // columna al final
      <div className="justify-center" style={{ display: "flex" }}>
        {data[0] && <FaFacebook className="mx-1 text-blue-800"/>}
        {data[1] && <FaTiktok className="mx-1 text-blue-500"/>}
      </div>
    )
    }}>
      <TableHead>
        <TableRow className="justify-center " >
          {headers.map((option)=><TableHeader key={option}>{option}</TableHeader>)}
        </TableRow>
      </TableHead>
      </DataTable> )} 

export function TunnelTable({data}) {
  const [dataToShow, setDataToShow] = useState(data[0]?.domain ? data: [])
  const [modal, setModal] = useState({status:false, id: null, action: null})
  const [filter, setFilter] = useState(null)
  const [loading, setLoading] = useState(false) 
  const [camps, setCamps] = useState(null) 
  const [stored] = useLocalStorage("data")

 useEffect(()=>{ setLoading(true)
    getByCompanyId("CampaingCompanies", stored.company.id).then(res=>setCamps(res.data))
    setDataToShow(data)
    setLoading(false)},[])

  useEffect(()=>{setLoading(true)
    const filteredD= filter ? data?.[0]?.domain ? data.filter(item=> item.idCampaign == filter) : [] : data?.[0]?.domain? data : []
  setDataToShow(filteredD) 
  setLoading(false)},[data, filter])
  
  useEffect(()=>{setLoading(true) 
  filteredData && render()
  setLoading(false)}, [data])
  const filteredData = dataToShow?.map(item => [item.id, item.name, item.description ? item.description: " ", camps?.filter(camp=> camp.id==item.idCampaign)[0] ? camps?.filter(camp=> camp.id==item.idCampaign)[0].name: "", item.initialDate, item.endDate, item.domain, [item.facebookPixel, item.tikTokPixel], item?.prices?.length, item?.orderBounds?.length, item?.upsell?.idProduct? "Si": "No", item?.downsell?.idLayout? "Si": "No"] )
  const headers = ["Acciones", "Nombre", "Descripción", "Campaña", "Fecha de Inicio", "Fecha de Fin", "Dominio", "Pixel", "precios", "orderBounds", "upsell", "downsell"]
  
  const clone = async () =>{console.log("clonning")}

  const render = (data)=> {
    if(data?.length > 0 && headers.length > 0 &&  data[0].length == headers.length ){
      return (
        <div className="w-[99%] overflow-x-scroll">
        <Table  data={data.reverse()} headers={headers} setModal={setModal} />
        </div>
      )}}

  return (
    <>
     <Navbar className="grid grid-flow-col justify-items-end" >
      <NavbarSection className="w-full flex-wrap sm:grid sm:grid-cols-5">
      {/* <NavbarSection className="w-full flex-wrap"> */}
        <div className="flex col-span-4">
        <FormNewCampaign/>
         <Dropdown>
          <DropdownButton outline> Filtrar</DropdownButton>
          <DropdownMenu>
            <DropdownItem onClick={() => setFilter(null)}>Ver todos</DropdownItem>
            {camps?.map(camp =>  <DropdownItem onClick={() => setFilter(camp.id)}>{camp.name}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
        </div>
        <div className="col-span-1 flex justify-end items-center w-full">
          <Button className="justify-self-right"  onClick={()=>setModal({status:true, id: null, action: "Crear"})}>Crear Tunel</Button>
          </div> 
      </NavbarSection>
    </Navbar>
    

    {loading || !filteredData  ? <Loader/> : 
    filteredData?.length ==0 ? <p>No se encontraron registros </p> :
    render(filteredData)}
    
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
        <Wizard action={modal.action} id={modal.id}/>
        }
      </div>
      </Modal>}
    </>)
}