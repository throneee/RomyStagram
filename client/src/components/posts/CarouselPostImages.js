import React from 'react';

import { Carousel, Image } from 'react-bootstrap';

const CarouselPostImages = ({ images, path, deleteImage }) => {
    if (path === 'add-update-post-modal') {
        return (
            <Carousel className='carousel-add-post h-100'>
                {images.map((image, index) => {
                    return (
                        <Carousel.Item
                            key={index}
                            className='w-100 h-100 position-relative add-post-img'>
                            <Image
                                className='w-100 h-100 img-thumbnail'
                                src={
                                    image.camera
                                        ? image.camera
                                        : image.url
                                        ? image.url
                                        : URL.createObjectURL(image)
                                }
                                alt='image'></Image>

                            <i
                                className='bi bi-x-circle text-danger'
                                onClick={() => {
                                    deleteImage(index);
                                }}></i>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        );
    }

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
