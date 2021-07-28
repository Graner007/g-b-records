import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';

import ErrorMessage from "../warning/ErrorMessage";
import Loading from "../warning/Loading";
import { ImageModel } from "../interface/ImageModel";

const ImageSlider = () => {

    const [images, setImages] = useState<ImageModel[]>([] as ImageModel[]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

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
                    <Link key={index} to={image.collectionUrl}><img src={image.src} className="sliderimg" alt="" /></Link>
                ))}
            </AliceCarousel>
        </div>
    )
}

export default ImageSlider;