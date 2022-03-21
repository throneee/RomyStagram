import React from 'react';

import { Carousel, Image } from 'react-bootstrap';

const CarouselPostImages = ({ images, path }) => {
    return (
        <Carousel>
            {images.map((image, index) => {
                return (
                    <Carousel.Item key={index}>
                        <Image
                            className={
                                path === 'profile'
                                    ? 'w-100 rounded-3 border'
                                    : 'w-100'
                            }
                            height={path === 'profile' ? '200px' : '600px'}
                            src={image.url}></Image>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default CarouselPostImages;
