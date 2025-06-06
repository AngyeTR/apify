import { StackedLayout } from '../../../../shared/components/uikit/stacked-layout'
import { Button } from "../../../../shared/components/uikit/button"
import { useState } from 'react'
import { CustomerForm } from './CustomerForm'
import { MyProgressBar } from '../myComponents/MyProgressBar'
import { SalesForm } from './SalesForm'
import { Upsale } from './Upsale'
import { Downsale } from './Downsale'
import { Summary } from './Summary'
import { Thanks } from './Thanks'


export const SalesWizard = ()=> {
    const [dataSet, setDataSet] = useState({upsaleAccepted: false, orderBoundAccepted: false, downsaleAccepted: false})

const tunnelModel = {
    id:1,
    name: "Lanzamiento Junio 2025",
    campaignId:1,
    startDate:"2025-06-05T09:49:05.7191555",
    productId: 1,
    endDate:"2025-06-15T09:49:05.7191555",
    comment: "Esta promoción es válida únicamente para compra online.",
    paymentMethods: [{name:"Efectivo Contraentrega", status: true}, {name:"Pago online", status: true}],
    layout: 1,
    prices:[{
        name: "paga 1 lleva 2",
        initialPrice: 100000,
        finalPrice:50000,
        tag: "Hot",
        tagColor:"red"
    }, {
        name: "paga 2 lleva 5",
        initialPrice:250000,
        finalPrice:100000,
        tag: "Mas popular",
        tagColor:"green"
    }],
    orderBoundId: 2,
    orderBoundPrice: 40000,
    upsellId: 3,
    upsellLayout: 2,
    upsellPrice:30000,
    downsellLayout:4,
    downsellPrice:25000,
}

  const [data, setData] = useState(tunnelModel)
  const [currentStep, setCurrentStep]  = useState(2)
  const handleClick = (step)=> { 
    setCurrentStep(currentStep + step) }
  const handleUpsell = ()=> {const steps = dataSet.upsaleAccepted ? 2: (data.downsellLayout ? 1 : 2)
    handleClick(steps)
  }

const stepsComplete = [
    {component: <div><CustomerForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div><SalesForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div> <Upsale data={data} dataSet={dataSet} setDataSet={setDataSet} handleUpsell={handleUpsell}/></div> }, 
    {component: <div> <Downsale data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div> <Summary data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div> <Thanks data={data} dataSet={dataSet} setDataSet={setDataSet}/></div> }, 
]
const stepsWithoutUpsell = [
    {component: <div><CustomerForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div><SalesForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
     {component: <div> <Summary data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div> <Thanks data={data} dataSet={dataSet} setDataSet={setDataSet}/></div> }, 
]
const steps = data.upsellId ? stepsComplete : stepsWithoutUpsell 
    const render = (currentStep)=> {return steps[currentStep-1].component}

  return (
      <div className='justify-self-center bg-zinc-50 p-2 pt-10  mt-5 rounded-lg'>
        <div className='w-[400px]'>
            <MyProgressBar currentStep={currentStep} steps={steps.length} /></div>
        {render(currentStep)}
      </div>
  )
}