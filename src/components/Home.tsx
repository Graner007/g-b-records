import ImageSlider from "./ImageSlider";
import RecommendRecordList from "./record/RecommendRecordList";

const Home = () => {
    return (
        <div className="container" style={{paddingRight: 100, paddingLeft: 100}}>
            <ImageSlider />
            <RecommendRecordList />
        </div>
    )
}

export default Home;