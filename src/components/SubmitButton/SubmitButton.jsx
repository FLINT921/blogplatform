import React from 'react';
import { Link } from 'react-router-dom';

import elementsRoutes from '../../routes';

import classes from './SubmitButton.module.scss';

const SubmitButton = ({ title }) => {
  return (
    <React.Fragment>
      <button className={classes.submitButton}>{title}</button>
      {title === 'Create' || title === 'Login' ? (
        <p className={classes.textUnderButton}>
          {title === 'Create'
            ? 'Already tou have an account?'
            : "Don't have an account?"}
          <Link
            to={
              title === 'Create'
                ? `${elementsRoutes.SIGN_IN}`
                : `${elementsRoutes.SIGN_UP}`
            }
            className={classes.sign}
          >
            {title === 'Create' ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default SubmitButton;
