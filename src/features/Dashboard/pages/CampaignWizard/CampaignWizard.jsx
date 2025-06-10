import { MyLayout } from "../../components/myComponents/MyLayout"
import { Wizard} from "../../components/wizard/wizard"

export const CampaignWizard =()=>{
    return (
        <MyLayout>
            <h1 className="text-red-500">Campaña</h1>
            <Wizard />
        </MyLayout>)
}