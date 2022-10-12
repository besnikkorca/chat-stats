import * as React from 'react';
import { GenericVoidFunc } from 'types/global';

export default function useScrollToBottomAction(
  container: Document | Element | null,
  callback: GenericVoidFunc,
  offset = 0
) {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!container) return;
    const handleScroll = () => {
      let scrollContainer = (
        container === document ? document.scrollingElement : container
      ) as Element;

      if (
        scrollContainer &&
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, offset]);
}
