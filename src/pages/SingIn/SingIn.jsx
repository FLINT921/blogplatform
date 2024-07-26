import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import userApi from '../../service/userApi';
import { setToken } from '../../utils/getToken';
import { setUser } from '../../store/userSlice';
import elementsRoutes from '../../routes';

const SingIn = () => {
  const [loginRequest, { data, isSuccess, error: authError }] =
    userApi.useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token } = data.user;
      toast.success('You have logged');
      dispatch(setUser({ username, email, token, image: null }));
      setToken(token);
      navigate(`${elementsRoutes.HOME}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (authError) {
      toast.error('Email or password is not correctly!');
    }
  }, [authError]);

  const onSubmit = (submitData) => {
    const { email, password } = submitData;
    loginRequest({ user: { email, password } });
  };
  return <Form title={'Sign In'} onSubmit={onSubmit} authError={authError} />;
};

export default SingIn;
