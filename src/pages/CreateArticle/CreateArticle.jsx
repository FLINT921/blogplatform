import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import ArticleForm from '../../components/ArticleForm';
import articleApi from '../../service/articleApi';
import elementsRoutes from '../../routes';

const CreateArticle = () => {
  const [createArticle, { data, isSuccess, error }] =
    articleApi.useCreateArticleMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success('Article has created!');
      navigate(`${elementsRoutes.HOME}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error('Article not created!');
    }
  }, [error]);

  const submitHandler = (article) => {
    createArticle(article);
    console.log('Я получил', article);
  };
  return <ArticleForm submitHandler={submitHandler} />;
};

export default CreateArticle;
