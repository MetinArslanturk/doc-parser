import { Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import useDefinitionPopover from '../../../hooks/useDefinitionPopover';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { IDocument } from '../../../types/document';
import { DEFAULT_PARAGRAPH_ALIGNMENT_CLASS, PARAGRAPH_ALIGNMENT_CLASS_MAPPING } from '../../../utils/constants';
import DocumentDefinitionPopover from './DocumentDefinitionPopover';
import DocumentToken from './DocumentToken';

interface Props {
  paragraphIndex: number;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  docData: IDocument[];
  asPopover?: boolean;
  definitionPopoverSpecs: ReturnType<typeof useDefinitionPopover>;
}
const DocumentParagraph = ({ paragraphIndex, virtualizer, docData, asPopover, definitionPopoverSpecs }: Props) => {
  const { definitionPopover, setDefinitionPopover, definitionPopoverRef, popoverYPosition } = definitionPopoverSpecs;
  const paragraphItem = docData[paragraphIndex];
  const popoverDefinitionDocData = definitionPopover?.definitionPayload
    ? docData.slice(
        definitionPopover.definitionPayload.value.startIndex,
        definitionPopover.definitionPayload.value.endIndex,
      )
    : [];

  useOnClickOutside(definitionPopoverRef, () => {
    setDefinitionPopover(undefined);
  });

  const { tokens, paragraphAlignment, indentationLevel, isFootnote, listItemLabel, firstLineIndentationLevel } =
    paragraphItem;
  const alignmentClass = PARAGRAPH_ALIGNMENT_CLASS_MAPPING[paragraphAlignment] || DEFAULT_PARAGRAPH_ALIGNMENT_CLASS;

  return (
    <div
      data-index={paragraphIndex}
      className={cn('py-2 px-2', {
        relative: paragraphIndex === definitionPopover?.pIndex,
      })}
      ref={virtualizer.measureElement}
    >
      <div
        className={cn(alignmentClass, 'whitespace-pre-wrap', { footnote: isFootnote })}
        style={{ marginLeft: indentationLevel + 'rem' }}
      >
        {definitionPopover && paragraphIndex === definitionPopover.pIndex && (
          <DocumentDefinitionPopover
            popoverYPosition={popoverYPosition}
            definitionPopoverRef={definitionPopoverRef}
            definitionDocData={popoverDefinitionDocData}
          />
        )}
        {firstLineIndentationLevel !== 0 && (
          <span
            style={{
              marginLeft: firstLineIndentationLevel - indentationLevel + 'rem',
            }}
          ></span>
        )}
        {listItemLabel && <span>{listItemLabel}&nbsp;</span>}
        {tokens.map((token, tokenIndex) => (
          <DocumentToken
            asPopover={asPopover}
            token={token}
            tokenIndex={tokenIndex}
            key={tokenIndex}
            definitionPopoverSpecs={definitionPopoverSpecs}
            paragraphIndex={paragraphIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentParagraph;
