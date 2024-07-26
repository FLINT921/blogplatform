import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import articleApi from '../../service/articleApi';

import classes from './Likes.module.scss';

const Likes = ({ favorited, favoritesCount, slug }) => {
  const [likeArticle, { isError: isLikeError }] =
    articleApi.useLikeArticleMutation();
  const [removeLikeArticle, { isError: isRemoveLikedError }] =
    articleApi.useRemoveLikeFromArticleMutation();

  const { username } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLikeError || isRemoveLikedError) {
      toast.error('Article is no liked!');
    }
  }, [isLikeError, isRemoveLikedError]);

  const handlerLikeChange = () => {
    console.log(slug);
    if (!username) {
      toast.info('Please lot in to like to.');
      return;
    }
    if (!favorited) likeArticle(slug);
    else removeLikeArticle(slug);
  };
  return (
    <label
      className={classNames({
        [classes.like]: true,
        [classes.likeActive]: favorited,
      })}
    >
      <input type='checkbox' onChange={handlerLikeChange} />
      <span>{favoritesCount}</span>
    </label>
  );
};

export default Likes;
