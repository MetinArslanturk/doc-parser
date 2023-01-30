import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import cn from 'classnames';
import documentData from './assets/document.json';
import {
  IDocument,
  DescriptorType,
  ParagraphAlignment,
  PayloadType,
  Descriptor,
} from './types/document';
import useOnClickOutside from './hooks/useOnClickOutside';

const App = () => {
  const [definitionPopover, setDefinitionPopover] = useState<
    { pIndex: number; tokenIndex: number } | undefined
  >(undefined);
  const [popoverYPosition, setPopoverYPosition] = useState(0);
  const definitionPopoverRef = useRef<HTMLSpanElement>(null);

  useOnClickOutside(definitionPopoverRef, () => {
    setDefinitionPopover(undefined);
  });

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
                  className={cn('border border-red-200 py-2 px-2', {
                    relative: docItem.index === definitionPopover?.pIndex,
                  })}
                  ref={virtualizer.measureElement}
                >
                  <p
                    className={cn(alignmentClass, 'whitespace-pre-wrap')}
                    style={{ marginLeft: indentationLevel + 'rem' }}
                  >
                    {docItem.index === definitionPopover?.pIndex && (
                      <span
                        className="absolute h-40 border border-red-400 left-0 transition-opacity duration-300 w-full z-10 bg-red-400 inline-block"
                        style={{ top: popoverYPosition + 'px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        ref={definitionPopoverRef}
                      ></span>
                    )}
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
                      let combinedClassName = 'p-text';
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

                      const definitionDescriptor = token.descriptors.find(
                        (desc) => desc.type === DescriptorType.Definition
                      ) as Descriptor | undefined;

                      const definition = definitionDescriptor?.definition;

                      if (definition) {
                        combinedClassName = cn(
                          combinedClassName,
                          'underline decoration-dotted hover:decoration-solid hover:cursor-pointer inline-block'
                        );
                      }

                      const definitionSourceDescriptor = token.descriptors.find(
                        (desc) => desc.type === DescriptorType.DefinitionSource
                      );

                      const definitionSource =
                        definitionSourceDescriptor?.definitionSource;

                      if (definitionSource) {
                        combinedClassName = cn(
                          combinedClassName,
                          'underline decoration-dotted hover:decoration-solid'
                        );
                      }

                      const searchFilterDescriptor = token.descriptors.find(
                        (desc) =>
                          desc.type === DescriptorType.SearchResult ||
                          desc.type === DescriptorType.FilterText
                      );

                      if (searchFilterDescriptor) {
                        combinedClassName = cn(
                          combinedClassName,
                          'bg-yellow-200'
                        );
                      }

                      const clauseSnippetDescriptor = token.descriptors.find(
                        (desc) => desc.type === DescriptorType.ClauseSnippetTag
                      );

                      const clauseSnippetTag =
                        clauseSnippetDescriptor?.clauseSnippetTag;

                      if (clauseSnippetTag) {
                        combinedClassName = cn(
                          combinedClassName,
                          'bg-gray-300'
                        );
                      }

                      if (tokenIndex === definitionPopover?.tokenIndex) {
                        combinedClassName = cn(combinedClassName, 'pt-40');
                      }

                      return (
                        <span
                          className={combinedClassName}
                          key={tokenIndex}
                          role={definition ? 'button' : undefined}
                          onClick={
                            definition
                              ? (e) => {
                                  const elementClickedYDistance =
                                    e.clientY -
                                    e.currentTarget.getBoundingClientRect().top;

                                  const parentRect =
                                    // @ts-ignore
                                    e.currentTarget.parentElement.getBoundingClientRect();
                                  setPopoverYPosition(
                                    e.clientY -
                                      parentRect.top -
                                      elementClickedYDistance +
                                      5
                                  );
                                  console.log('Clicked definition');
                                  setDefinitionPopover({
                                    pIndex: docItem.index,
                                    tokenIndex,
                                  });
                                }
                              : undefined
                          }
                        >
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

{
  /* <svg
className="absolute h-3 left-4 top-full"
x="0px"
y="0px"
viewBox="0 0 510 510"
xmlSpace="preserve"
>
<polygon
  className="fill-current"
  points="0,0 255,255 510,0"
/>
</svg> */
}

export default App;
