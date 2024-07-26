import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

import Article from '../../components/Article/Article';
import articleApi from '../../service/articleApi';

const ArticleItem = () => {
  const { slug } = useParams();
  const {
    data,
    isLoading,
    isError: notAvailable,
  } = articleApi.useGetArticleQuery({ slug });

  const { article } = data ?? {};

  if (notAvailable) {
    return (
      <div>
        <p>Server error! Article is not available.</p>
      </div>
    );
  }

  if (!article) {
    return <div>No article data</div>;
  }

  return (
    <>
      {isLoading && <Spin size='large' />}
      {!isLoading && article && <Article article={article} />}
    </>
  );
};

export default ArticleItem;
