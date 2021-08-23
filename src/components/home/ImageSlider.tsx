import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { useQuery, gql } from '@apollo/client';

import ErrorMessage from "../warning/ErrorMessage";
import Loading from "../warning/Loading";
import { MediaModel } from "../interface/MediaModel";
import { Content, Layout } from "../Styles";

const IMAGE_SLIDER_QUERY = gql`
    query ImageSliderQuery {
        imageSlider {   
            name
            linkUrl
        }
    }
`;

type ImageSliderType = {
    imageSlider: MediaModel[];
}

const ImageSlider = () => {
    const { data, loading, error } = useQuery<ImageSliderType>(IMAGE_SLIDER_QUERY);

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <div>
                    <AliceCarousel
                        autoPlayInterval={2000}
                        autoPlay={true}
                        disableButtonsControls={true}
                        disableDotsControls={true}
                        infinite={true}>
                        {data.imageSlider.map((image, index) => (
                            <Link key={index} to={image.linkUrl}><img src={image.name} className="sliderimg" alt="" /></Link>
                        ))}
                    </AliceCarousel>
                </div>
            }
        </> 
    )
}

export default ImageSlider;