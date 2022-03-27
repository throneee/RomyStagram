import React from 'react';
import { Link } from 'react-router-dom';

import { Carousel, Image } from 'react-bootstrap';

const CarouselPostImages = ({ post, images, path, deleteImage }) => {
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
                if (path === 'profile') {
                    return (
                        <Carousel.Item
                            key={index}
                            className='profile-single-post position-relative'>
                            <Link to={`/post/${post._id}`}>
                                <Image
                                    className='w-100 rounded-3 border'
                                    height={'200px'}
                                    src={image.url}></Image>

                                <div className='profile-post-thumb position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded-3'>
                                    <div className='text-white me-3'>
                                        <i className='bi bi-suit-heart-fill me-2'></i>
                                        <span>{post && post.likes.length}</span>
                                    </div>
                                    <div className='text-white ms-3'>
                                        <i className='bi bi-chat-fill me-2'></i>
                                        <span>
                                            {post && post.comments.length}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </Carousel.Item>
                    );
                } else {
                    return (
                        <Carousel.Item key={index}>
                            <Image
                                className='w-100'
                                height={
                                    path === 'post-detail' ? '100%' : '600px'
                                }
                                src={image.url}></Image>
                        </Carousel.Item>
                    );
                }
            })}
        </Carousel>
    );
};

export default CarouselPostImages;
