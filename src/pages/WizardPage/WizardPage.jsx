
import { MyProgressBar } from '../../components/myComponents/MyProgressBar'
import { StackedLayout } from '../../components/stacked-layout'
import { useState } from 'react'
import { FormCompany } from '../../components/myComponents/forms/FormCompany'
import { FormBranch } from '../../components/myComponents/forms/Formbranch'
import { FormUser } from '../../components/myComponents/forms/FormUser'
import { FormWarehouse } from '../../components/myComponents/forms/FormWarehouse'
import { FormProduct } from '../../components/myComponents/forms/FormProduct'

export const WizardPage = ()=> {
  const [currentStep, setCurrentStep]  = useState(1)
  const handleClick = ()=> setCurrentStep(currentStep +1)

  const steps = [{component: <FormCompany handleClick={handleClick} /> }, 
    {component: <FormBranch handleClick={handleClick}/>},
    {component: <FormUser handleClick={handleClick}/>},
    {component:  <FormWarehouse handleClick={handleClick}/>},
    {component: < FormProduct handleClick={handleClick}/>}
]
  const render = (currentStep)=> {
    return steps[currentStep-1].component
  }

  return (
    <StackedLayout>
      <div className='justify-self-center'>
        <MyProgressBar currentStep={currentStep} steps={steps.length} />
        {render(currentStep)}
      </div>
    </StackedLayout>
  )
}
