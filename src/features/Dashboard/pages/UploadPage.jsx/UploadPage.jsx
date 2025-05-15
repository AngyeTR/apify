import { MyFileUploader } from "../../components/myComponents/MyFileUploader"
import { MyLayout } from "../../components/myComponents/MyLayout"

export const UploadPage = ()=> {
    return (
        <MyLayout>
            <MyFileUploader uploadType="stocks" />
        </MyLayout>
    )
}