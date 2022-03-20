import React, { useContext, useState, useRef } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';

import { Modal, Form, Button, Image } from 'react-bootstrap';

const AddPostModal = () => {
    // ************************************* State *************************************
    const {
        userState: {
            user: { avatar, username },
        },
        setShowToast,
    } = useContext(UserContext);

    const { showAddPostModal, setShowAddPostModal } = useContext(PostContext);

    const [images, setImages] = useState([]);

    const [stream, setStream] = useState(false);

    const videoRef = useRef();
    const canvasRef = useRef();

    const [tracks, setTracks] = useState('');

    // ************************************* Function *************************************
    // 1. Close Modal
    const closeModal = () => {
        setImages([]);
        setStream(false);
        if (tracks) {
            tracks.stop();
        }
        setShowAddPostModal(false);
    };

    // 2. Onchange Image
    const onChangeImages = (e) => {
        const files = [...e.target.files];
        let newImages = [];

        files.forEach((file) => {
            if (!file) {
                setShowToast({
                    show: true,
                    message: 'File does not exist.',
                });
                return;
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                setShowToast({
                    show: true,
                    message: 'Image format is incorrect.',
                });
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

    // 4. Take a photo
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

    const handleStopStream = () => {
        if (tracks) {
            tracks.stop();
        }
        setStream(false);
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showAddPostModal}
            onHide={closeModal}
            centered
            className='add-post-modal'>
            <Modal.Header className='py-2'>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Create new post
                </Modal.Title>
            </Modal.Header>

            <Form className='flex-fill d-flex flex-column'>
                <Modal.Body className='d-flex flex-column '>
                    <div className='d-flex align-items-center'>
                        <Image
                            roundedCircle={true}
                            src={avatar}
                            width={'30px'}
                            height={'30px'}></Image>
                        <h6 className='mb-0 ms-3'>{username}</h6>
                    </div>

                    <Form.Group className='my-3'>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder={`What's on your mind, ${username}?`}
                            name='content'></Form.Control>
                    </Form.Group>

                    <div className='show-add-post-image'>
                        {images.map((image, index) => {
                            return (
                                <div
                                    key={index}
                                    className='w-100 h-100 position-relative py-1'>
                                    <Image
                                        className='w-100 h-100 img-thumbnail d-block img-cover'
                                        src={
                                            image.camera
                                                ? image.camera
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
                                    className='d-flex align-items-center'
                                    onClick={handleStream}>
                                    <i className='bi bi-camera-fill'></i>
                                    <span className='fw-bolder ms-2'>
                                        Take a photo
                                    </span>
                                </div>

                                <Form.Group className='ms-5 position-relative d-flex align-items-center'>
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
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button
                        onClick={closeModal}
                        className='flex-fill btn-cancel'>
                        Cancel
                    </Button>
                    <Button type='submit' className='flex-fill add-post-btn'>
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
