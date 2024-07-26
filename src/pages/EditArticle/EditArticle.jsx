import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

import ArticleForm from '../../components/ArticleForm';
import articleApi from '../../service/articleApi';
import elementsRoutes from '../../routes';

const EditArticle = () => {
  const { slug } = useParams();
  const { data: fetchedArticles, isLoading: articleLoading } = articleApi.useGetArticleQuery({
    slug,
  });

  const { username } = useSelector((state) => state.user);

  const [editArticleRequest, { data, isSuccess: isArticleCreated, error: editError }] =
    articleApi.useEditArticleMutation();

  const submitHandler = (article) => {
    if (slug) editArticleRequest({ body: article, slug });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isArticleCreated && data) {
      toast.success('Article editing completed! ');
      navigate(`${elementsRoutes.HOME}`);
    }
  });
  useEffect(() => {
    if (editError) {
      toast.error('Article has not edited!');
    }
  }, [editError]);

  if (articleLoading || !fetchedArticles) {
    return (
      <div>
        <Spin size='large' />
      </div>
    );
  }

  if (username !== fetchedArticles.article.author.username) {
    return (
      <div className='page-error'>
        <p>You cannot edit other articles!</p>
      </div>
    );
  }

  return <ArticleForm submitHandler={submitHandler} fetchedArticles={fetchedArticles} />;
};

export default EditArticle;
