import React, { useContext, useState, useRef } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';
import AlertMessages from '../layout/AlertMessages';
import { imageUpload } from '../../utils/imageUpload';
import CarouselPostImages from './CarouselPostImages';

import { Modal, Form, Button, Image } from 'react-bootstrap';

const AddPostModal = () => {
    // ************************************* State *************************************
    // 1. User context
    const {
        userState: {
            user: { avatar, username },
        },
        setShowLoading,
        setShowToast,
    } = useContext(UserContext);

    // 2. Post context
    const { showAddPostModal, setShowAddPostModal, createPost } =
        useContext(PostContext);

    // 3. New Post form
    const [newPost, setNewPost] = useState({
        content: '',
    });
    const { content } = newPost;

    // 4. New Post-Images form
    const [images, setImages] = useState([]);

    // 5. Stream
    const [stream, setStream] = useState(false);

    // 6. Ref
    const videoRef = useRef();
    const canvasRef = useRef();

    // 7. Tracks
    const [tracks, setTracks] = useState('');

    // 8. Alert
    const [alertState, setAlertState] = useState(null);

    // ************************************* Function *************************************
    // 0. Close Modal
    const closeModal = () => {
        setNewPost({ content: '' });
        setImages([]);
        setStream(false);
        if (tracks) {
            tracks.stop();
        }
        setShowAddPostModal(false);
    };

    // 1. Onchange Add post form
    const onChangeAddPostForm = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    // 2. Onchange Image
    const onChangeImages = (e) => {
        const files = [...e.target.files];
        let newImages = [];

        files.forEach((file) => {
            if (!file) {
                setAlertState({ message: 'File does not exist.' });
                setTimeout(() => {
                    setAlertState(null);
                }, 5000);

                return;
            }

            if (
                file.type !== 'image/jpeg' &&
                file.type !== 'image/png' &&
                file.type !== 'image/gif'
            ) {
                setAlertState({
                    message:
                        'Image Format is incorrect. Only accept .jpg, .png or .gif file.',
                });
                setTimeout(() => {
                    setAlertState(null);
                }, 5000);
                return;
            }

            return newImages.push(file);
        });

        setImages([...images, ...newImages]);
    };

    // 3. Delete Image
    const deleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    // 4. Enable Stream
    const handleStream = () => {
        setStream(true);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch((err) => console.log(err));
        }
    };

    // 5. Take a photo
    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        canvasRef.current.setAttribute('width', width);
        canvasRef.current.setAttribute('height', height);

        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = canvasRef.current.toDataURL();
        setImages([...images, { camera: URL }]);
    };

    // 6. Stop Stream
    const handleStopStream = () => {
        if (tracks) {
            tracks.stop();
        }
        setStream(false);
    };

    // 7. Add post
    const handleAddPost = async (e) => {
        e.preventDefault();

        setShowLoading(true);

        // upload images to cloudinary
        let media = [];
        if (images.length > 0) {
            media = await imageUpload(images);
        }

        // call api
        const response = await createPost({
            content,
            images: media,
        });

        if (!response.success) {
            setAlertState({ message: response.message });
            setTimeout(() => {
                setAlertState(null);
            }, 5000);

            setShowLoading(false);
            return;
        }

        // create successull
        setShowToast({
            show: true,
            type: 'info',
            message: 'Create Post Successfully.',
        });

        setShowLoading(false);

        closeModal();
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showAddPostModal}
            onHide={closeModal}
            centered
            className='add-post-modal'>
            <div className='show-add-post-images flex-fill w-100'>
                {images.length === 0 ? (
                    <div className='h-100 d-flex flex-column justify-content-center align-items-center text-secondary'>
                        <i className='bi bi-image display-3'></i>
                        <span
                            className='display-5'
                            style={{ fontStyle: 'italic' }}>
                            No photos
                        </span>
                    </div>
                ) : images.length > 1 ? (
                    <CarouselPostImages
                        images={images}
                        path='add-update-post-modal'
                        deleteImage={deleteImage}
                    />
                ) : (
                    <div className='position-relative w-100 h-100 add-post-img'>
                        <Image
                            className='w-100 h-100 img-thumbnail'
                            src={
                                images[0].camera
                                    ? images[0].camera
                                    : URL.createObjectURL(images[0])
                            }></Image>

                        <i
                            className='bi bi-x-circle text-danger'
                            onClick={() => {
                                deleteImage(0);
                            }}></i>
                    </div>
                )}
            </div>

            <div className='flex-fill w-100 d-flex flex-column'>
                <Modal.Header className='py-2'>
                    <Modal.Title className='w-100 text-center fw-bold'>
                        Create new post
                    </Modal.Title>
                </Modal.Header>

                <Form
                    className='flex-fill d-flex flex-column'
                    onSubmit={handleAddPost}>
                    <Modal.Body className='d-flex flex-column '>
                        <div className='d-flex align-items-center'>
                            <Image
                                className='img-cover border'
                                roundedCircle={true}
                                src={avatar}
                                width={'30px'}
                                height={'30px'}></Image>
                            <h6 className='mb-0 ms-3'>{username}</h6>
                        </div>

                        <Form.Group className='my-3 flex-fill'>
                            <Form.Control
                                as='textarea'
                                value={content}
                                onChange={onChangeAddPostForm}
                                rows={8}
                                placeholder={`What's on your mind, ${username}?`}
                                name='content'></Form.Control>
                        </Form.Group>

                        {stream && (
                            <div className='position-relative stream'>
                                <video
                                    autoPlay
                                    muted
                                    ref={videoRef}
                                    width={'100%'}
                                    height={'100%'}></video>

                                <i
                                    className='bi bi-x-circle text-danger'
                                    onClick={handleStopStream}></i>

                                <canvas
                                    ref={canvasRef}
                                    style={{ display: 'none' }}></canvas>
                            </div>
                        )}

                        <div className='d-flex align-items-center justify-content-center add-post-image text-secondary'>
                            {stream ? (
                                <i
                                    className='bi bi-camera-fill'
                                    onClick={handleCapture}></i>
                            ) : (
                                <>
                                    <div
                                        className='flex-fill d-flex align-items-center justify-content-center'
                                        onClick={handleStream}>
                                        <i className='bi bi-camera-fill'></i>
                                        <span className='fw-bolder ms-2'>
                                            Take a photo
                                        </span>
                                    </div>

                                    <Form.Group className='flex-fill position-relative d-flex align-items-center justify-content-center'>
                                        <i className='bi bi-images'></i>

                                        <span className='fw-bolder ms-2'>
                                            Choose a file
                                        </span>

                                        <Form.Control
                                            className='position-absolute'
                                            type='file'
                                            name='file'
                                            id='file'
                                            multiple
                                            accept='image/*'
                                            onChange={
                                                onChangeImages
                                            }></Form.Control>
                                    </Form.Group>
                                </>
                            )}
                        </div>

                        <div className='d-flex align-items-center justify-content-center mt-3'>
                            <AlertMessages info={alertState} />
                        </div>
                    </Modal.Body>

                    <Modal.Footer className='justify-content-center'>
                        <Button
                            onClick={closeModal}
                            className='flex-fill btn-cancel'>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            className='flex-fill add-post-btn'>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </div>
        </Modal>
    );
};

export default AddPostModal;
