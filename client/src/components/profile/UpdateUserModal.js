import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { imageUpload } from '../../utils/imageUpload';

import { Modal, Form, Button, Image } from 'react-bootstrap';

const UpdateUserModal = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        showUpdateUserModal,
        setShowUpdateUserModal,
        setShowToast,
        setShowLoading,
        updateUser,
    } = useContext(UserContext);

    const [updatedUser, setUpdatedUser] = useState(user);
    const { fullname, gender, phone, address, birthday, bio } = updatedUser;

    const [avatar, setAvatar] = useState('');

    // ************************************* Function *************************************
    const onChangeUpdateUserForm = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const onChangeUpdateUserAvatar = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const closeModal = () => {
        setUpdatedUser(user);
        setShowUpdateUserModal(false);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        setShowLoading(true);

        let media;
        if (avatar) {
            media = await imageUpload([avatar]);
        }

        const response = await updateUser(user._id, {
            fullname,
            gender,
            phone,
            address,
            birthday,
            bio,
            avatar: avatar ? media[0].url : user.avatar,
        });

        setShowToast({
            show: true,
            message: 'Profile update successfully.',
        });

        setShowLoading(false);

        closeModal();
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showUpdateUserModal}
            onHide={closeModal}
            centered
            className='update-user-modal'>
            <Form className='d-flex flex-column' onSubmit={handleUpdateUser}>
                <Modal.Header className='py-2'>
                    <Modal.Title className='w-100 text-center fw-bold'>
                        Update User
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='d-flex flex-column'>
                    <div className='profile-avatar mb-3 position-relative text-center mx-auto overflow-hidden'>
                        <Image
                            roundedCircle={true}
                            src={
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : user.avatar
                            }
                            alt='avatar'
                            width={'100px'}
                            height={'100px'}></Image>

                        <span className='position-absolute choose-avatar text-center text-info'>
                            <i className='bi bi-camera-fill'></i>
                            <p className='mb-0'>Change</p>
                            <Form.Control
                                type='file'
                                name='avatar'
                                id='avatar'
                                accept='image/*'
                                onChange={
                                    onChangeUpdateUserAvatar
                                }></Form.Control>
                        </span>
                    </div>

                    <Form.Group className='d-flex align-items-center mb-3'>
                        <Form.Label className='mb-0 fw-bolder'>
                            Full Name
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Full Name'
                            name='fullname'
                            value={fullname}
                            onChange={onChangeUpdateUserForm}
                            className='ms-2'></Form.Control>
                    </Form.Group>

                    <Form.Group className='d-flex align-items-center mb-3'>
                        <Form.Label className='mb-0 fw-bolder'>
                            Birthday
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Birthday'
                            name='birthday'
                            value={birthday}
                            onChange={onChangeUpdateUserForm}
                            className='ms-2'></Form.Control>
                    </Form.Group>

                    <Form.Group className='d-flex align-items-center mb-3'>
                        <Form.Label className='mb-0 fw-bolder'>
                            Gender
                        </Form.Label>
                        <Form.Control
                            name='gender'
                            value={gender}
                            onChange={onChangeUpdateUserForm}
                            as='select'
                            className='ms-2'>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Unknown'>Unknown</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='d-flex align-items-center mb-3'>
                        <Form.Label className='mb-0 fw-bolder'>
                            Phone
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Phone'
                            name='phone'
                            value={phone}
                            onChange={onChangeUpdateUserForm}
                            className='ms-2'></Form.Control>
                    </Form.Group>

                    <Form.Group className='d-flex align-items-center mb-3'>
                        <Form.Label className='mb-0 fw-bolder'>
                            Address
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Address'
                            name='address'
                            value={address}
                            onChange={onChangeUpdateUserForm}
                            className='ms-2'></Form.Control>
                    </Form.Group>

                    <Form.Group className='d-flex align-items-center mb-3'>
                        <Form.Label className='mb-0 fw-bolder'>Bio</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            value={bio}
                            onChange={onChangeUpdateUserForm}
                            placeholder='Bio'
                            name='bio'
                            className='ms-2'></Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer className='py-2'>
                    <Button
                        className='flex-fill rounded-3 btn-cancel'
                        onClick={closeModal}>
                        Cancle
                    </Button>
                    <Button
                        type='submit'
                        className='flex-fill update-user-btn rounded-3'>
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateUserModal;
