import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { IDocument } from '../../../types/document';
import DocumentParagraph from './DocumentParagraph';
import useDefinitionPopover from '../../../hooks/useDefinitionPopover';
import { useSearchParams } from 'react-router-dom';

interface Props {
  docData: IDocument[];
  estimatedSize: number;
  asPopover?: boolean;
}
const VirtualizedDocument = ({ docData, estimatedSize, asPopover = false }: Props) => {
  const scrollableParentRef = useRef<HTMLDivElement>(null);
  const count = docData.length;

  const [searchParams] = useSearchParams();
  const indexParam = searchParams.get('index');

  const definitionPopoverSpecs = useDefinitionPopover();

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollableParentRef.current,
    estimateSize: () => estimatedSize,
  });

  useEffect(() => {
    if (indexParam && !isNaN(indexParam as never) && !asPopover) {
      setTimeout(() => {
        virtualizer.scrollToIndex(Number(indexParam));
      }, 100);
    }
  }, [indexParam, virtualizer, asPopover]);

  const docItems = virtualizer.getVirtualItems();

  return (
    <div ref={scrollableParentRef} className="w-full h-full overflow-auto contain-strict">
      <div
        className="relative w-full"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            transform: `translateY(${docItems[0].start}px)`,
          }}
        >
          {definitionPopoverSpecs.definitionPopover && (
            <div className="absolute h-full w-full backdrop-blur-xs backdrop-opacity-60 z-10"></div>
          )}
          {docItems.map(({ index }) => (
            <DocumentParagraph
              key={index}
              paragraphIndex={index}
              virtualizer={virtualizer}
              docData={docData}
              asPopover={asPopover}
              definitionPopoverSpecs={definitionPopoverSpecs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedDocument;
