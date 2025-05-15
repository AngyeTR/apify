
import { MyProgressBar } from '../../components/myComponents/MyProgressBar'
import { StackedLayout } from '../../../../shared/components/uikit/stacked-layout'
import { Button } from "../../../../shared/components/uikit/button"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormCompany } from '../../components/forms/FormCompany'
import { FormUser } from '../../components/forms/FormUser'
import { FormWarehouse } from '../../components/forms/FormWarehouse'
import { FormProduct } from '../../components/forms/FormProduct'
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage'
import { finishWizard, getByID,  updateWizard } from '../../../../shared/services/API/api/'
import { getUpdatedLocalData } from '../../utils/functions'

export const WizardPage = ()=> {
  const [stored] = useLocalStorage("data")
  const [data, setData] = useLocalStorage("data", null)
  const [currentStep, setCurrentStep]  = useState(stored.implementation.implementationStep  )
  const nav = useNavigate()

  const handleClick = async()=> { 
    (currentStep == steps.length -1 )? await finish(currentStep):  await update(currentStep)
    (currentStep == steps.length -1 ) ? setCurrentStep(currentStep +1) : await finish(currentStep)}
  const steps = [{component: <FormCompany handleClick={handleClick} step={1} origin="wizard" /> }, 
    // {component: <FormOffice handleClick={handleClick} step={2} origin="wizard"/>},
    {component: <FormUser handleClick={handleClick} step={2} origin="wizard" /> },
    // {component: <FormSalesman handleClick={handleClick} step={4} origin="wizard"/>},
    {component:  <FormWarehouse handleClick={handleClick} step={3} origin="wizard" />},
    {component: < FormProduct handleClick={handleClick} step={4} origin="wizard"   />}]
  const render = (currentStep)=> {return steps[currentStep-1].component}

  const finish= async(step)=>{
    await finishWizard(step)
    const company =await  getByID("Companies", data.company.id).then((res) =>  res.data)
    let newData = getUpdatedLocalData(data, company)
    setData(newData)
     nav("/dashboard/")
  }
  const update= async(step)=>{
    await updateWizard(step)
    const company =await  getByID("Companies", data.company.id).then((res) => res.data)
    let newData = getUpdatedLocalData(data, company)
    setData(newData)
     nav("/dashboard/")
  }

  return (
    <StackedLayout>
      <div className='justify-self-center'>
        <div className='grid grid-flow-col justify-items-end'><Button className=" my-5" onClick={finish}>Finalizar</Button></div>
        <MyProgressBar currentStep={currentStep} steps={steps.length} />
        {render(currentStep)}
      </div>
    </StackedLayout>
  )
}
