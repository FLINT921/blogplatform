import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import elementsRoutes from '../../routes';
import { removeToken } from '../../utils/getToken';
import { logOut } from '../../store/userSlice';

import classes from './Header.module.scss';

const Header = () => {
  const { username, token, image } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={classes.header}>
      <Link className={classes.head} to={`${elementsRoutes.HOME}`}>
        Realworld Blog
      </Link>
      <div className={classes.rightSide}>
        {token ? (
          <>
            <Link className={classes.createArticleButton} to={`${elementsRoutes.CREATE_ARTICLE}`}>
              Create article
            </Link>
            <div className={classes.profile}>
              <Link className={classes.profileUsername} to={`${elementsRoutes.PROFILE}`}>
                {username}
                <img
                  src={image ? image : 'https://platform.kata.academy/images/profile-big-photo.png'}
                  alt='user-img'
                  className={classes.userImg}
                />
              </Link>
            </div>
            <button
              className={classes.logOutButton}
              type='button'
              onClick={() => {
                dispatch(logOut());
                removeToken();
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link className={classes.signInButton} to={`${elementsRoutes.SIGN_IN}`}>
              Sign In
            </Link>
            <Link className={classes.signUpButton} to={`${elementsRoutes.SIGN_UP}`}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
