import { useEffect, useState } from 'react'
import { CustomerForm } from './CustomerForm'
import { MyProgressBar } from '../myComponents/MyProgressBar'
import { SalesForm } from './SalesForm'
import { Upsale } from './Upsale'
import { Downsale } from './Downsale'
import { Summary } from './Summary'
import { Thanks } from './Thanks'
import { useParams } from 'react-router-dom'


export const SalesWizard = ({data, uuid})=> {
    const [dataSet, setDataSet] = useState({upsaleAccepted: false, downsaleAccepted: false})
    const params = useParams()
    const [currentStep, setCurrentStep]  = useState(1)
    
  const handleClick = (step)=> { 
    setCurrentStep(currentStep + step) }

    const handleUpsell = ()=> {const steps = dataSet.upsaleAccepted ? 2: (data.downsell.idLayout ? 1 : 2)
    handleClick(steps)  }
  
const stepsComplete = [
    {component: <div><CustomerForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div><SalesForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div> <Upsale data={data} dataSet={dataSet} setDataSet={setDataSet} handleUpsell={handleUpsell}/></div> }, 
    {component: <div> <Downsale data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div> <Summary data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick} uuid={uuid}/></div> }, 
    {component: <div> <Thanks data={data} dataSet={dataSet} setDataSet={setDataSet} /></div> }, 
]
const stepsWithoutUpsell = [
    {component: <div><CustomerForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
    {component: <div><SalesForm data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick}/></div> }, 
     {component: <div> <Summary data={data} dataSet={dataSet} setDataSet={setDataSet} handleClick={handleClick} uuid={uuid}/></div> }, 
    {component: <div> <Thanks data={data} dataSet={dataSet} setDataSet={setDataSet} /></div> }, 
]
const steps = data?.upsell?.id ? stepsComplete : stepsWithoutUpsell 
    const render = (currentStep)=> {return steps[currentStep-1].component}

  return (
      <div className='justify-self-center bg-zinc-50 p-2 pt-10  mt-5 rounded-lg'>
        <div className='w-[400px]'>
            <MyProgressBar currentStep={currentStep} steps={steps.length} /></div>
        {render(currentStep)}
      </div>)}