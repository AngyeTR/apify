import { MyProgressBar } from '../../components/myComponents/MyProgressBar'
import { Button } from "../../../../shared/components/uikit/button"
import { useState } from 'react'
import { CampaignStep } from './CampaingStep'
import { TunnelStep } from './TunnelStep'
import { ProductStep } from './ProductStep'
import { OrderBound } from './OrderBoundStep'
import { UpsellStep } from './UpsellStep'
import { DownsellStep } from './DownsellStep'

const tunnelModel = {
    id:0,
    name: "string",
    campaignId:0,
    startDate:"string",
    productId: 0,
    endDate:"string",
    comment: "string",
    paymentMethods: [],
    layout: 0,
    prices:[{
        name: "string",
        initialPrice:0,
        finalPrice:0,
        tag: "string",
        tagColor:"string"
    }],
    oderBoundId: 0,
    orderBoundPrice: 0,
    upsellId: 0,
    upsellLayout: 0,
    upsellPrice:0,
    downsellLayout:0,
    downsellPrice:0,
}


export const Wizard = ()=> {
  const [data, setData] = useState({prices: []})
  // const [currentStep, setCurrentStep]  = useState(stored.implementation.implementationStep  )
  const [currentStep, setCurrentStep]  = useState(1)
  const handleClick = ()=> { setCurrentStep(currentStep +1) }
  const handleBack = ()=> { setCurrentStep(currentStep -1) }

const steps = [
    {component: <div><CampaignStep data={data} setData={setData}/><Button disabled={!data.campaignId || !data.productId } color="yellow" onClick={handleClick}>Siguiente</Button></div> }, 
    {component: <div><TunnelStep data={data} setData={setData}/><Button color="yellow" disabled={!data.name || !data.layout || !data.startDate || !data.endDate} onClick={handleClick}>Siguiente</Button></div> },
    {component:  <div><ProductStep data={data} setData={setData}/><Button color="yellow" disabled={ data.prices.length==0 } onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><OrderBound data={data} setData={setData}/><Button color="yellow"  onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><UpsellStep data={data} setData={setData}/><Button color="yellow" disabled={!!data.upsellProductId && (!data.upsellProductId || !data.upsellLayout || !data.upsellPrice)  }  onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><DownsellStep data={data} setData={setData}/><Button disabled={!!data.downsellLayout && (!data.downsellLayout || !data.downsellPrice)}>Guardar Tunel</Button></div>},]

    const render = (currentStep)=> {return steps[currentStep-1].component}

  return (
      <div className='justify-self-center w-full justify-items-center '>
        {console.log(data)}
        <MyProgressBar currentStep={currentStep} steps={steps.length}  className="w-full"/>
        {render(currentStep)}
      </div>
  )
}