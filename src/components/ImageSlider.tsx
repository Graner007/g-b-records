import React, { useEffect } from 'react';
import axios from "axios";
import { StatusCodeModel } from './interface/StatusCodeModel';
import ErrorMessage from "./warning/ErrorMessage";
import Loading from "./warning/Loading";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { ImageModel } from "./interface/ImageModel";
import { Link } from "react-router-dom";

const ImageSlider = () => {

    const [images, setImages] = React.useState<ImageModel[]>([] as ImageModel[]);
    const [error, setError] = React.useState<boolean>(false);
    const [statusCode, setStatusCode] = React.useState<StatusCodeModel>({code: "404"});
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + '/data/image.json')
            .then(res => {
                if (res.status === 200) {
                    setImages(res.data);                   
                    setError(false);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err.response.status);
                switch (err.response.status) {
                    case 404:
                        setStatusCode({code : "404"});
                        break;
                    case 500:
                        setStatusCode({code : "500"});
                        break;
                    default:
                        break;
                }
                setError(true);
                setLoading(false);
            })
    }, [images.length]);

    if (error) {
        return (
            <ErrorMessage text="Images can't be loaded." />
        )
    }

    return (
        loading ? <Loading size={30} /> : <div>
            <AliceCarousel
                autoPlayInterval={2000}
                autoPlay={true}
                disableButtonsControls={true}
                disableDotsControls={true}
                infinite={true}>
                {images.map((image, index) => (
                    <Link to={image.collectionUrl}><img key={index} src={image.src} className="sliderimg" alt="" /></Link>
                ))}
            </AliceCarousel>
        </div>
    )
}

export default ImageSlider;