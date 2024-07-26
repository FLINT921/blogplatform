import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import Article from '../../components/Article/Article';
import articleApi from '../../service/articleApi';
import elementsRoutes from '../../routes';

const ListArticles = () => {
  const [page, setPage] = useState(1);
  const limitArticles = 5;
  const navigate = useNavigate();
  const { data, isLoading, isError } = articleApi.useGetArticlesQuery({
    page,
    limit: limitArticles,
  });

  useEffect(() => {
    navigate(`${elementsRoutes.ARTICLE}?page=${page}`);
  }, [page]);
  return (
    <>
      {isError && (
        <h3>An error occurred while loading data. Please refresh the page!</h3>
      )}
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <>
          {data?.articles.map((article) => (
            <Article
              key={`${article.author} ${article.updatedAt} ${article.slug} ${article.tagList.join()}`}
              article={article}
            />
          ))}
        </>
      )}
      <Pagination
        align='center'
        showSizeChanger={false}
        pageSize={limitArticles}
        current={page}
        total={data?.articlesCount}
        onChange={(newPage) => setPage(newPage)}
      />
      ;
    </>
  );
};

export default ListArticles;
