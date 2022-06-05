import React from 'react';
import { PageConfig } from '../../container/PlaylistContainer';
import IconButton from '../Icon/IconButton';
import { PageSkipWrapper, PaginationWrapper } from './Pagination.styled';

interface PaginationProps {
  onClickPagination: (pageNum: number) => void;
  pageConfig: PageConfig;
}

const Pagination = ({ onClickPagination, pageConfig }: PaginationProps) => {
  const { totalPage, curPage } = pageConfig;

  const handleClickPrevPage = () => {
    if (curPage <= 1) return;
    onClickPagination(curPage - 1);
  };

  const handleClickNextPage = () => {
    if (curPage >= totalPage) return;
    onClickPagination(curPage + 1);
  };
  return (
    <PaginationWrapper>
      <PageSkipWrapper>
        <IconButton
          className="prev"
          title="이전 페이지로 이동"
          shape="play-solid"
          onClick={handleClickPrevPage}
        />
        <p className="currentPage">현재 페이지: {curPage}</p>
        <IconButton
          className="next"
          title="다음 페이지로 이동"
          shape="play-solid"
          onClick={handleClickNextPage}
        />
      </PageSkipWrapper>
      <ul>
        {Array.from(new Array(totalPage), (x, i) => i + 1).map((v, i) => (
          <li key={i} onClick={() => onClickPagination(v)}>
            {v}
          </li>
        ))}
      </ul>
    </PaginationWrapper>
  );
};

export default Pagination;
