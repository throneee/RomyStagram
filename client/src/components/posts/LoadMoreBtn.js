import React from 'react';

import { Button } from 'react-bootstrap';

const LoadMoreBtn = ({ postsCount, page, exploreLoading, handleLoadMore }) => {
    console.log(postsCount, page);

    return (
        <>
            {postsCount < 9 * (page - 1)
                ? ''
                : !exploreLoading && (
                      <Button
                          className='btn-load-more text-secondary'
                          onClick={handleLoadMore}>
                          Load more
                      </Button>
                  )}
        </>
    );
};

export default LoadMoreBtn;
