import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import Article from '../../components/Article/Article';
import articleApi from '../../service/articleApi';
import elementsRoutes from '../../routes';

const ListArticles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const limitArticles = 5;

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get('page')) || 1;

  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError } = articleApi.useGetArticlesQuery({
    page,
    limit: limitArticles,
  });

  useEffect(() => {
    navigate(`${elementsRoutes.ARTICLE}?page=${page}`);
  }, [page, navigate]);

  return (
    <>
      {isError && <h3>An error occurred while loading data. Please refresh the page!</h3>}
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
    </>
  );
};

export default ListArticles;
