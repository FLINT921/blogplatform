import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import userApi from '../../service/userApi';
import { setToken } from '../../utils/getToken';
import { setUser } from '../../store/userSlice';
import elementsRoutes from '../../routes';

const SingUp = () => {
  const [registrationRequest, { data, isSuccess, error: authError }] =
    userApi.useRegisterUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token } = data.user;

      toast.success('You have logged');
      dispatch(setUser({ username, email, token, image: null }));
      setToken(token);
      <Navigate to={`${elementsRoutes.HOME}`} />;
    }
  }, [isSuccess]);

  const onSubmit = (submitData) => {
    const { username, email, password } = submitData;
    console.log(username, email, password);
    registrationRequest({ user: { username, email, password } });
  };
  return (
    <Form
      title={'Create new account'}
      onSubmit={onSubmit}
      authError={authError}
    />
  );
};

export default SingUp;
