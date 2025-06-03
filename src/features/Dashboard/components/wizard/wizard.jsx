import { MyProgressBar } from '../../components/myComponents/MyProgressBar'
import { StackedLayout } from '../../../../shared/components/uikit/stacked-layout'
import { Button } from "../../../../shared/components/uikit/button"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage'
import { CampaignStep } from './CampaingStep'
import { TunnelStep } from './TunnelStep'
import { ProductStep } from './ProductStep'
import { OrderBound } from './OrderBoundStep'
import { UpsellStep } from './UpsellStep'
import { DownsellStep } from './DownsellStep'

const campaignModel= {
    name:"string",
    id: 0,
    startDate:"string",
    endDate:"string",
    tunnels: []
}

const tunnelModel = {
    id:0,
    name: "string",
    campaignId:0,
    startDate:"string",
    productId: 0,
    endDate:"string",
    comment: "string",
    paymentMethods: [],
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
  const [stored] = useLocalStorage("data")
  const [data, setData] = useState({})
  // const [currentStep, setCurrentStep]  = useState(stored.implementation.implementationStep  )
  const [currentStep, setCurrentStep]  = useState(1)
  const nav = useNavigate()

  const handleClick = async()=> { 
    setCurrentStep(currentStep +1) }

    const handleBack = async()=> { 
    setCurrentStep(currentStep -1) }

    console.log(data)

const steps = [
    {component: <div><CampaignStep data={data} setData={setData}/><Button disabled={!data.campaignId} color="yellow" onClick={handleClick}>Siguiente</Button></div> }, 
    {component: <div><TunnelStep data={data} setData={setData}/><Button color="blue" onClick={handleBack}>Anterior</Button><Button color="yellow" onClick={handleClick}>Siguiente</Button></div> },
    {component:  <div><ProductStep data={data} setData={setData}/><Button color="blue" onClick={handleBack}>Anterior</Button><Button color="yellow" onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><OrderBound data={data} setData={setData}/><Button color="blue" onClick={handleBack}>Anterior</Button><Button color="yellow" onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><UpsellStep data={data} setData={setData}/><Button color="blue" onClick={handleBack}>Anterior</Button><Button color="yellow" onClick={handleClick}>Siguiente</Button></div>},
    {component: <div><DownsellStep data={data} setData={setData}/><Button color="blue" onClick={handleBack}>Anterior</Button></div>},]

    const render = (currentStep)=> {return steps[currentStep-1].component}

  return (
    <StackedLayout>
      <div className='justify-self-center'>
        <MyProgressBar currentStep={currentStep} steps={steps.length} />
        {render(currentStep)}
      </div>
    </StackedLayout>
  )
}