import Markdown from 'react-markdown';
import { useEffect } from 'react';
import classNames from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import { toast } from 'react-toastify';

import Likes from '../Likes/Likes';
import elementsRoutes from '../../routes';
import articleApi from '../../service/articleApi';

import classes from './Article.module.scss';

const Article = ({ article }) => {
  const { slug } = useParams();
  const { username } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [deleteArticleRequest, { isSuccess, error }] =
    articleApi.useDeleteArticleMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Article was deleted successfully.');
      navigate(`${elementsRoutes.HOME}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error('Article has not deleted.');
    }
  }, [error]);

  if (!article) {
    return <div>No article data</div>;
  }

  const deleteArticle = () => {
    if (slug) deleteArticleRequest(slug);
  };

  const {
    title,
    slug: articleSlug,
    tagList,
    description,
    author,
    favorited,
    favoritesCount,
    createdAt,
  } = article;

  const isEnoughPage = !!slug;

  return (
    <div className={classes.article}>
      <div className={classNames(classes.text, classes.open)}>
        <div className={classes.title}>
          <Link
            className={classes.title}
            to={`${elementsRoutes.ARTICLE}/${articleSlug}`}
          >
            {!isEnoughPage && title?.length > 110
              ? `${title.slice(0, 100)}...`
              : title}
          </Link>
          <Likes
            favorited={favorited}
            favoritesCount={favoritesCount}
            slug={articleSlug}
          />
        </div>

        <div className={classes.tags}>
          {tagList &&
            tagList.map((tag, index) => (
              <div key={index} className={classes.tag}>
                {tag}
              </div>
            ))}
        </div>
        <div className={classes.textDescription}>{description}</div>
      </div>
      <div className={classes.profile}>
        <p className={classes.username}>{author.username}</p>
        <p className={classes.date}>
          {new Date(createdAt).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <img
          src={
            author.image
              ? author.image
              : 'https://platform.kata.academy/images/profile-big-photo.png'
          }
          alt='user-img'
          className={classes.userImg}
        />
        {author.username === username && slug && (
          <div className={classes.boxButton}>
            <Popconfirm
              title='Are you sure to delete this article?'
              okText='Yes'
              cancelText='No'
              placement='right'
              onConfirm={() => deleteArticle()}
            >
              <button className={classNames(classes.button, classes.delete)}>
                Delete
              </button>
            </Popconfirm>
            <Link
              className={classNames(classes.button, classes.edit)}
              to={`${elementsRoutes.ARTICLE}/${articleSlug}${elementsRoutes.EDIT_ARTICLE}`}
            >
              Edit
            </Link>
          </div>
        )}
      </div>

      {slug === articleSlug && (
        <div className={classes.textBody}>
          <Markdown>{article.body}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Article;
