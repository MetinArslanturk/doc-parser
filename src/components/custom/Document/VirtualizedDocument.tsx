import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { IDocument } from '../../../types/document';
import useWindowSize from '../../../hooks/useWindowSize';
import { DEFAULT_INITIAL_SCREEN_WIDTH, DEFAULT_MAX_TEXT_LENGTH } from '../../../utils/constants';
import DocumentParagraph from './DocumentParagraph';

interface Props {
  docData: IDocument[];
}
const VirtualizedDocument = ({ docData }: Props) => {
  const scrollableParentRef = useRef<HTMLDivElement>(null);
  const count = docData.length;
  let maxLength = DEFAULT_MAX_TEXT_LENGTH;

  docData.forEach((doc) => {
    if (doc.text.length > maxLength) {
      maxLength = doc.text.length;
    }
  });

  const windowSize = useWindowSize();
  const windowWidth =
    windowSize.width || typeof window !== 'undefined' ? window.innerWidth : DEFAULT_INITIAL_SCREEN_WIDTH;
  const halfWindow = windowWidth / 2;
  const initialAreaWidth = 416 < halfWindow ? (1280 < halfWindow ? 1280 : halfWindow) : 416;

  const maxSentenceCount = (maxLength * 8) / initialAreaWidth;

  const estimatedSize = maxSentenceCount * 20 || 1500 - initialAreaWidth;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollableParentRef.current,
    estimateSize: () => estimatedSize,
  });
  const docItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={scrollableParentRef}
      className="min-w-[26rem] w-1/2 max-w-7xl border-2 border-gray-200 dynamic-h-100 overflow-auto contain-strict"
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${docItems[0].start}px)`,
          }}
        >
          {docItems.map((docItem) => {
            const paragraphItem = docData[docItem.index];

            return (
              <DocumentParagraph
                key={docItem.index}
                paragraphItem={paragraphItem}
                paragraphIndex={docItem.index}
                virtualizer={virtualizer}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedDocument;
