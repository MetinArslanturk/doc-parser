import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import cn from 'classnames';
import documentData from './assets/document.json';
import {
  IDocument,
  DescriptorType,
  ParagraphAlignment,
  PayloadType,
} from './types/document';

const App = () => {
  const docData = documentData as IDocument[];
  const scrollableParentRef = useRef<HTMLDivElement>(null);
  const count = docData.length;
  let maxLength = 300;

  docData.forEach((doc) => {
    if (doc.text.length > maxLength) {
      maxLength = doc.text.length;
    }
  });

  const windowWidth = window.innerWidth;
  const halfWindow = windowWidth / 2;
  const initialAreaWidth =
    416 < halfWindow ? (1280 < halfWindow ? 1280 : halfWindow) : 416;

  const maxSentenceCount = (maxLength * 8) / initialAreaWidth;

  const estimatedSize = maxSentenceCount * 20 || 1500 - initialAreaWidth;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollableParentRef.current,
    estimateSize: () => estimatedSize,
  });
  const docItems = virtualizer.getVirtualItems();

  return (
    <div className="flex justify-center py-2">
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
              const {
                tokens,
                paragraphAlignment,
                indentationLevel,
                isFootnote,
                listItemLabel,
                firstLineIndentationLevel,
              } = docData[docItem.index];
              const alignmentClass =
                paragraphAlignment === ParagraphAlignment.Left
                  ? 'text-left'
                  : paragraphAlignment === ParagraphAlignment.Center
                  ? 'text-center'
                  : 'text-justify';
              return (
                <div
                  key={docItem.index}
                  data-index={docItem.index}
                  className="border border-red-200 py-2 px-2"
                  ref={virtualizer.measureElement}
                >
                  <p
                    className={cn(alignmentClass, 'whitespace-pre-wrap')}
                    style={{ marginLeft: indentationLevel + 'rem' }}
                  >
                    {firstLineIndentationLevel !== 0 && (
                      <span
                        style={{
                          marginLeft:
                            firstLineIndentationLevel -
                            indentationLevel +
                            'rem',
                        }}
                      ></span>
                    )}
                    {listItemLabel && <span>{listItemLabel}&nbsp;</span>}
                    {tokens.map((token, tokenIndex) => {
                      let combinedClassName = '';
                      const formattingDescriptor = token.descriptors.find(
                        (desc) => desc.type === DescriptorType.Formatting
                      );
                      const formatting = formattingDescriptor?.formatting;
                      if (formatting) {
                        combinedClassName = cn(combinedClassName, {
                          'font-bold': formatting.isBold,
                          italic: formatting.isItalic,
                          underline: formatting.isUnderline,
                        });
                      }

                      const diffDescriptor = token.descriptors.find(
                        (desc) => desc.type === DescriptorType.Diff
                      );

                      const diff = diffDescriptor?.diff;

                      if (diff) {
                        let diffClassName = '';
                        if (diff.payload === PayloadType.Del) {
                          diffClassName = 'text-red-600 line-through';
                        } else if (diff.payload === PayloadType.DelBlock) {
                          diffClassName = 'text-green-600 line-through';
                        } else if (diff.payload === PayloadType.Ins) {
                          diffClassName = 'text-blue-600 underline';
                        } else if (diff.payload === PayloadType.Move) {
                          diffClassName = 'text-green-600';
                        } else if (diff.payload === PayloadType.Noop) {
                          diffClassName = '';
                        }

                        combinedClassName = cn(
                          combinedClassName,
                          diffClassName
                        );
                      }

                      return (
                        <span className={combinedClassName} key={tokenIndex}>
                          {token.text}
                        </span>
                      );
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
