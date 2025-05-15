import { HighlightsContainer} from "../components/Highlights/HighLightsContainer"
import { CategoriesContainer} from "../components/categories/CategoriesContainer"
import { PromosContainer } from "../components/Promos/PromosContainer"
import { Layout } from "./Layout"

export const HomePage=()=>{
    return (
        <Layout >
            <HighlightsContainer />
            <CategoriesContainer />
            <PromosContainer />
        </Layout>
    )
}