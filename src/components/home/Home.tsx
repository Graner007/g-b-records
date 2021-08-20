import { Layout } from "antd";

import ImageSlider from "./ImageSlider";
import RecommendRecordList from "../record/RecommendRecordList";
import RecordUnderPrice from "../record/RecordUnderPrice";
import Decades from "./Decades";
import { Content } from '../Styles';

const Home = () => {
    return (
        <Layout>
            <Content>
                <ImageSlider />
                <RecommendRecordList />
                <Decades />
                {/* <RecordUnderPrice price={30} /> */}
            </Content>
        </Layout>
    )
}

export default Home;