
import { MyProgressBar } from '../../components/myComponents/MyProgressBar'
import { StackedLayout } from '../../components/stacked-layout'
import { Button } from "../../components/button"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormCompany } from '../../components/myComponents/forms/FormCompany'
import { FormBranch } from '../../components/myComponents/forms/Formbranch'
import { FormUser } from '../../components/myComponents/forms/FormUser'
import { FormWarehouse } from '../../components/myComponents/forms/FormWarehouse'
import { FormProduct } from '../../components/myComponents/forms/FormProduct'
import { FormSalesman } from '../../components/myComponents/forms/FormSalesman'

export const WizardPage = ()=> {
  const [currentStep, setCurrentStep]  = useState(3)
  const handleClick = ()=> setCurrentStep(currentStep +1)
  const nav = useNavigate()

  const steps = [{component: <FormCompany handleClick={handleClick} /> }, 
    {component: <FormBranch handleClick={handleClick}/>},
    {component: <FormUser handleClick={handleClick}/>},
    {component: <FormSalesman handleClick={handleClick}/>},
    {component:  <FormWarehouse handleClick={handleClick}/>},
    {component: < FormProduct handleClick={handleClick}/>}
]
  const render = (currentStep)=> {
    return steps[currentStep-1].component
  }

  const finish=()=>{
    //Pendiente gestionar el cambio en la implementación
     nav("/")
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
