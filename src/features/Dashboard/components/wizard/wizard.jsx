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
 const res = action == "Crear" ? await post("SalesTunnel", data).then(res=> res) :
  await edit("SalesTunnel", data).then(res=> res) 
 res && console.log(res)
//  res.isValid && nav(0)
}


const steps = [
    {component: <div><CampaignStep data={data} setData={setData}/><Button disabled={!data.idCampaign || !data.productId } color="yellow" onClick={handleClick}>Siguiente</Button></div> }, 
    {component: <div><TunnelStep data={data} setData={setData}/><Button color="yellow" disabled={!data.name || data.layouts.length == 0 || !data.initialDate || !data.endDate} onClick={handleClick}>Siguiente</Button></div> },
    {component:  <div><ProductStep data={data} setData={setData}/><Button color="yellow" disabled={ data?.prices?.length==0 } onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><OrderBound data={data} setData={setData}/><Button color="yellow"  onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><UpsellStep data={data} setData={setData}/><Button color="yellow" disabled={!!data?.upsell?.idProduct && (!data?.upsell?.idProduct || !data?.upsell?.idLayout || !data?.upsell?.price)  }  onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><DownsellStep data={data} setData={setData}/><Button disabled={!!data?.downsell?.idLayout && (!data?.downsell?.idLayout || !data.downsell?.price)} onClick={saveTunnel}>Guardar Tunel</Button></div>},]

    const render = (currentStep)=> {return steps[currentStep-1].component}

  return (
      <div className='justify-self-center w-full justify-items-center '>
        <MyProgressBar currentStep={currentStep} steps={steps.length}  className="w-full"/>
        {render(currentStep)}
      </div>
  )
}