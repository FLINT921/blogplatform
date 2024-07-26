import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import userApi from '../../service/userApi';
import { setToken } from '../../utils/getToken';
import { setUser } from '../../store/userSlice';
import elementsRoutes from '../../routes';

const Edit = () => {
  const [editUserRequest, { data, isSuccess, error: authError }] =
    userApi.useEditUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token, image } = data.user;
      console.log();

      toast.success('You have logged');
      dispatch(setUser({ username, email, token, image }));
      setToken(token);
      navigate(`${elementsRoutes.HOME}`);
    }
  }, [isSuccess]);

  const onSubmit = (submitData) => {
    console.log(submitData);
    const {
      username: usernameSubmit,
      email: emailSubmit,
      newPassword: passwordSubmit,
      avatarImg: avatarSubmit,
    } = submitData;

    editUserRequest({
      user: {
        username: usernameSubmit,
        email: emailSubmit,
        password: passwordSubmit,
        image: avatarSubmit,
      },
    });
  };
  return (
    <Form title={'Edit Profile'} onSubmit={onSubmit} authError={authError} />
  );
};

export default Edit;
