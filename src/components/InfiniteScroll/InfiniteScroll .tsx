import React, { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  children?: React.ReactNode;
  loader?: React.ReactNode;
  fetchMore?: () => void;
  hasMore?: boolean;
  endMessage?: React.ReactNode;
  className?: string;
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const { children, loader, fetchMore, hasMore, endMessage, className } = props;
  const pageEndRef = useRef(null);
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // kiểm tra element có nằm trong viewport không?
          fetchMore?.();
        }
      });

      if (pageEndRef && pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore]);
  return (
    <div className={className}>
      {children}

      {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
    </div>
  );
};

export default InfiniteScroll;
