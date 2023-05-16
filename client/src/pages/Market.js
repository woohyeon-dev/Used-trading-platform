import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, ProductList, Pagination } from '../components';
import { useLocation, useParams } from 'react-router-dom';
import callApi from '../utils/callApi';
import CATEGORIES from '../utils/categories';

const MarketBlock = styled.div`
  padding: 40px 20px;

  .listTitle {
    font-size: 20px;
    margin: 40px 0 20px 10px;
    text-align: bottom;
  }

  .value {
    font-weight: bold;
  }

  .count {
    font-family: 'YES24';
    font-size: 15px;
    color: silver;
    letter-spacing: 0.5px;
  }
`;

function Market() {
  const { state } = useLocation();
  const searchWord = state ? state.searchWord : '';
  const params = useParams();
  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCatId, setSelectedCatId] = useState(params.cat_id);

  // 전체 게시물 개수
  const totalPostCnt = prods.length;

  useEffect(() => {
    setSelectedCatId(params.cat_id);
    setCurrentPage(1);
  }, [selectedCatId, params]);

  useEffect(() => {
    if (searchWord) {
      callApi('get', '/market/product', { params: { searchWord } }, setProds);
    } else {
      callApi(
        'get',
        '/market/product',
        { params: { cat_id: selectedCatId } },
        setProds
      );
    }
  }, [searchWord, selectedCatId]);

  return (
    <MarketBlock>
      <Category CATEGORIES={CATEGORIES} />
      {searchWord ? (
        <div className='listTitle'>
          <span className='value'>'{searchWord}'</span>에 대한 검색결과 &nbsp;
          <span className='count'>{totalPostCnt}개</span>
        </div>
      ) : selectedCatId ? (
        <div className='listTitle'>
          <span className='value'>{CATEGORIES[selectedCatId - 1]}</span>
          &nbsp;&nbsp;
          <span className='count'>{totalPostCnt}개</span>
        </div>
      ) : (
        <div className='listTitle'>
          <span className='value'>전체 상품</span>
          &nbsp;&nbsp;
          <span className='count'>{totalPostCnt}개</span>
        </div>
      )}
      <ProductList prods={prods} currentPage={currentPage} />
      <Pagination
        totalPostCnt={totalPostCnt}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </MarketBlock>
  );
}

export default Market;
