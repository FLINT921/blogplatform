import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import elementsRoutes from '../../routes';
import Header from '../Header/Header';
import SingUp from '../../pages/SingUp';
import SingIn from '../../pages/SingIn';
import userApi from '../../service/userApi';
import { getToken } from '../../utils/getToken';
import { setUser } from '../../store/userSlice';
import ListArticles from '../../pages/ListAricles/ListArticles';
import ArticleItem from '../../pages/ArticleItem/ArticleItem';
import CreateArticle from '../../pages/CreateArticle/CreateArticle';
import EditArticle from '../../pages/EditArticle/EditArticle';
import Edit from '../../pages/EditProfile/Edit';

import classes from './App.module.scss';

const App = () => {
  const [getUser] = userApi.useLazyGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken()) {
      getUser(null, true)
        .unwrap()
        .then((data) => {
          const { username, email, token, image } = data.user;
          if (data) dispatch(setUser({ username, email, token, image: image || null }));
        });
    }
  }, []);

  return (
    <div className={classes.app}>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Header />
      <Routes>
        <Route path={`${elementsRoutes.SIGN_IN}`} element={<SingIn />} />
        <Route path={`${elementsRoutes.SIGN_UP}`} element={<SingUp />} />
        <Route path={`${elementsRoutes.PROFILE}`} element={<Edit />} />
        <Route path={`${elementsRoutes.CREATE_ARTICLE}`} element={<CreateArticle />} />
        <Route path={`${elementsRoutes.ARTICLE}/:slug${elementsRoutes.EDIT_ARTICLE}`} element={<EditArticle />} />
        <Route path={`${elementsRoutes.HOME}`} element={<ListArticles />} />
        <Route path={`${elementsRoutes.ARTICLE}`} element={<ListArticles />} />
        <Route path={`${elementsRoutes.ARTICLE}/:slug`} element={<ArticleItem />} />
      </Routes>
    </div>
  );
};

export default App;
