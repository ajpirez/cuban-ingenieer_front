'use client';
import {useCallback} from 'react';

const useScrollToTop = () => {
  return useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
};

export default useScrollToTop;
