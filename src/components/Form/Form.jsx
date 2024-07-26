import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import SubmitButton from '../SubmitButton';
import elementsRoutes from '../../routes';

import '../../index.scss';
import classes from './Form.module.scss';

const Form = ({ title, onSubmit, authError }) => {
  const { username, email, token, image } = useSelector((state) => state.user);
  const [titleSB, setTitleSB] = useState('');
  useEffect(() => {
    switch (title) {
      case 'Create new account':
        setTitleSB('Create');
        break;
      case 'Sign In':
        setTitleSB('Login');
        break;
      case 'Edit Profile':
        setTitleSB('Save');
        break;
      default:
        setTitleSB('');
    }
  }, [title]);

  useEffect(() => {
    if (authError) {
      const { username: usernameError, email: emailError } =
        authError.data.errors;
      if (usernameError) toast.error(`Username ${usernameError}`);
      if (emailError) toast.error(`Email ${emailError}`);
    }
  }, [authError]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmitHandler = (data) => {
    console.log(data);
    onSubmit(data);
    if (authError) reset();
  };

  if (!token && titleSB === 'Save')
    return <Navigate to={`${elementsRoutes.HOME}`} />;

  return (
    <div className={classNames(classes.window, classes.center)}>
      <form
        className={classes.formInput}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h3 className={classes.head}>{title}</h3>
        {titleSB === 'Create' || titleSB === 'Save' ? (
          <label className={classes.label}>
            Username
            <input
              placeholder='Username'
              type='text'
              defaultValue={username || ''}
              className={classNames({
                [classes.input]: true,
                [classes.error]: errors?.username,
              })}
              {...register('username', {
                required: 'The field must be filled in.',
              })}
            />
            {errors?.username && (
              <p className={classes.errorText}>
                {errors?.username?.message || 'Error'}{' '}
              </p>
            )}
            {authError?.data.errors.username && (
              <p className='fieldError'>{`Username ${authError?.data.errors.username}`}</p>
            )}
          </label>
        ) : (
          ''
        )}
        <label className={classes.label}>
          Email address
          <input
            placeholder='Email is address'
            type='text'
            className={classNames({
              [classes.input]: true,
              [classes.error]: errors?.email,
            })}
            defaultValue={email || ''}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  // eslint-disable-next-line no-control-regex
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-] *[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-\9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-\9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: 'Please, enter your correct email',
              },
            })}
          />
          {errors?.email && (
            <p className={classes.errorText}>
              {errors?.email?.message || 'Error'}{' '}
            </p>
          )}
          {authError?.data.errors.email && (
            <p className='fieldError'>{`Email ${authError?.data.errors.email}`}</p>
          )}
        </label>
        {titleSB === 'Create' || titleSB === 'Login' ? (
          <label className={classes.label}>
            Password
            <input
              placeholder='Password'
              type='text'
              className={classNames({
                [classes.input]: true,
                [classes.error]: errors?.password,
              })}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'You password needs to be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Your password must be no more than 40 characters',
                },
              })}
            />
            {errors?.password && (
              <p className={classes.errorText}>
                {errors?.password?.message || 'Error'}{' '}
              </p>
            )}
          </label>
        ) : (
          ''
        )}
        {titleSB === 'Create' && (
          <label className={classes.label}>
            Repeat Password
            <input
              placeholder='Repeat Password'
              type='text'
              className={classNames({
                [classes.input]: true,
                [classes.error]: errors.repPassword,
              })}
              {...register('repPassword', {
                required: 'Password is required',
                validate: (value) =>
                  value === String(getValues().password) ||
                  'Passwords must match',
              })}
            />
            {errors?.repPassword && (
              <p className={classes.errorText}>
                {errors?.repPassword?.message || 'Error'}{' '}
              </p>
            )}
          </label>
        )}
        {titleSB === 'Save' && (
          <label className={classes.label}>
            New password
            <input
              placeholder='New password'
              type='text'
              className={classNames({
                [classes.input]: true,
                [classes.error]: errors?.newPassword,
              })}
              {...register('newPassword')}
            />
            {errors?.newPassword && (
              <p className={classes.errorText}>
                {errors?.newPassword?.message || 'Error'}{' '}
              </p>
            )}
          </label>
        )}
        {titleSB === 'Save' && (
          <label className={classes.label}>
            Avatar image (url)
            <input
              placeholder='Avatar image'
              type='text'
              className={classNames({
                [classes.input]: true,
                [classes.error]: errors?.avatarImg,
              })}
              defaultValue={image || ''}
              {...register('avatarImg')}
            />
            {errors?.avatarImg && (
              <p className={classes.errorText}>
                {errors?.avatarImg?.message || 'Error'}{' '}
              </p>
            )}
          </label>
        )}

        <SubmitButton title={titleSB} />
      </form>
    </div>
  );
};

export default Form;
