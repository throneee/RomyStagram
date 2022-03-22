import React, { useContext, useState, useRef, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';
import AlertMessages from '../layout/AlertMessages';
import { imageUpload } from '../../utils/imageUpload';

import { Modal, Form, Button, Image } from 'react-bootstrap';

const UpdatePostModal = () => {
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
    const {
        postState: { post },
        setShowActionModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
    } = useContext(PostContext);

    // 3. Updated Post form
    const [content, setContent] = useState('');

    // 4. New Post-Images form
    const [updatedImages, setUpdatedImages] = useState([]);

    // 5. Stream
    const [stream, setStream] = useState(false);

    // 6. Ref
    const videoRef = useRef();
    const canvasRef = useRef();

    // 7. Tracks
    const [tracks, setTracks] = useState('');

    // 8. Alert
    const [alertState, setAlertState] = useState(null);

    useEffect(() => {
        if (post) {
            setContent(post.content);
            setUpdatedImages(post.images);
        }
    }, [post]);

    // ************************************* Function *************************************
    // 0. Close Modal
    const closeModal = () => {
        setContent('');
        setUpdatedImages([]);
        setStream(false);
        if (tracks) {
            tracks.stop();
        }
        setShowUpdatePostModal(false);
    };

    // 1. Onchange Update post form
    const onChangeUpdatePostForm = (e) => {
        setContent(e.target.value);
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

        setUpdatedImages([...updatedImages, ...newImages]);
    };

    // 3. Delete Image
    const deleteImage = (index) => {
        const newImages = [...updatedImages];
        newImages.splice(index, 1);
        setUpdatedImages(newImages);
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
        setUpdatedImages([...updatedImages, { camera: URL }]);
    };

    // 6. Stop Stream
    const handleStopStream = () => {
        if (tracks) {
            tracks.stop();
        }
        setStream(false);
    };

    // 7. Add post
    const handleUpdatePost = async (e) => {
        e.preventDefault();

        setShowLoading(true);

        const newImages = updatedImages.filter((image) => !image.url);
        const oldImages = updatedImages.filter((image) => image.url);

        // if no content or images update
        if (
            content === post.content &&
            newImages.length === 0 &&
            oldImages.length === post.images
        ) {
            return;
        }

        // upload images to cloudinary
        let media = [];
        if (newImages.length > 0) {
            media = await imageUpload(newImages);
        }

        // call api
        const response = await updatePost(post._id, {
            content,
            images: [...oldImages, ...media],
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
            message: 'Post updated.',
        });

        setShowLoading(false);

        setShowActionModal(false);
        closeModal();
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showUpdatePostModal}
            onHide={closeModal}
            centered
            className='add-post-modal'>
            <Modal.Header className='py-2'>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Edit post
                </Modal.Title>
            </Modal.Header>

            <Form
                className='flex-fill d-flex flex-column'
                onSubmit={handleUpdatePost}>
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

                    <Form.Group className='my-3'>
                        <Form.Control
                            as='textarea'
                            value={content}
                            onChange={onChangeUpdatePostForm}
                            rows={3}
                            placeholder={`What's on your mind, ${username}?`}
                            name='content'></Form.Control>
                    </Form.Group>

                    <div className='show-add-post-image'>
                        {updatedImages.map((image, index) => {
                            return (
                                <div
                                    key={index}
                                    className='w-100 h-100 position-relative py-1'>
                                    <Image
                                        className='w-100 h-100 img-thumbnail d-block img-cover'
                                        src={
                                            image.camera
                                                ? image.camera
                                                : image.url
                                                ? image.url
                                                : URL.createObjectURL(image)
                                        }
                                        alt='image'></Image>

                                    <i
                                        className='bi bi-x-circle text-danger shadow'
                                        onClick={() => {
                                            deleteImage(index);
                                        }}></i>
                                </div>
                            );
                        })}
                    </div>

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
                    <Button type='submit' className='flex-fill add-post-btn'>
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;
