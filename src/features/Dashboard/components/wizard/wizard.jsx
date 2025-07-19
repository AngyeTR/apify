import { MyProgressBar } from '../../components/myComponents/MyProgressBar'
import { Button } from "../../../../shared/components/uikit/button"
import { useEffect, useState } from 'react'
import { CampaignStep } from './CampaingStep'
import { TunnelStep } from './TunnelStep'
import { ProductStep } from './ProductStep'
import { OrderBound } from './OrderBoundStep'
import { UpsellStep } from './UpsellStep'
import { DownsellStep } from './DownsellStep'
import { edit, getByCompanyId, getByID, post } from '../../../../shared/services/API/api'
import { salesTunnelModel } from '../../utils/models'
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

export const Wizard = ({action, id})=> {
  const [data, setData] = useState({prices: []})
  const [stored] = useLocalStorage("data")
  // const [currentStep, setCurrentStep]  = useState(stored.implementation.implementationStep  )
  const [currentStep, setCurrentStep]  = useState(1)
  const handleClick = ()=> { setCurrentStep(currentStep +1) }
  const handleBack = ()=> { setCurrentStep(currentStep -1) }
  const nav = useNavigate()

useEffect(()=>{action == "Crear" ? setData(prev=>({...salesTunnelModel, prices : prev.prices})) : getByID("SalesTunnel", id ).then(res=> {setData(res.data); console.log(res)})},[])

const saveTunnel = async ()=>{
  console.log(data)
 const res = action == "Crear" ? await post("SalesTunnel", data).then(res=> res) :
  await edit("SalesTunnel", data).then(res=> res) 
//  res.isValid && nav(0)
} 

const steps = [
    {component: <div><CampaignStep data={data} setData={setData}/><Button disabled={!data.idCampaign || !data.idProduct || !data.domain || !(!!data.facebookPixel || !!data.tikTokPixel)} color="yellow" onClick={handleClick}>Siguiente</Button></div> }, 
    {component: <div><TunnelStep data={data} setData={setData}/><Button color="red" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleBack}>Atrás</Button><Button color="yellow" className="ml-2" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleClick}>Siguiente</Button></div> },
    {component:  <div><ProductStep data={data} setData={setData}/><Button color="red" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleBack}>Atrás</Button><Button color="yellow" className="ml-2" disabled={ data?.prices?.length==0 } onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><OrderBound data={data} setData={setData}/><Button color="red" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleBack}>Atrás</Button><Button color="yellow"  className="ml-2" onClick={handleClick}>Siguiente</Button><Button onClick={handleClick} className="mx-1">Omitir</Button></div>},
    {component: <div><UpsellStep data={data} setData={setData}/><Button color="red" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleBack}>Atrás</Button><Button color="yellow" className="ml-2" disabled={!!data?.upsell?.idProduct && (!data?.upsell?.idProduct || !data?.upsell?.idLayout || !data?.upsell?.price)  }  onClick={handleClick}>Siguiente</Button><Button onClick={handleClick} className="mx-1">Omitir</Button></div>},
    {component: <div><DownsellStep data={data} setData={setData}/><Button color="red" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleBack}>Atrás</Button><Button className="ml-2" disabled={!!data?.downsell?.idLayout && (!data?.downsell?.idLayout || !data.downsell?.price)} onClick={saveTunnel}>Guardar Tunel</Button></div>},]

    const render = (currentStep)=> {return steps[currentStep-1].component}

  return (
      <div className='justify-self-center w-full justify-items-center '>
        {console.log(data)}
        <MyProgressBar currentStep={currentStep} steps={steps.length}  className="w-full"/>
        {render(currentStep)}
      </div>
  )
}