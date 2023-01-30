import { Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import { useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { IDocument } from '../../../types/document';
import { DEFAULT_PARAGRAPH_ALIGNMENT_CLASS, PARAGRAPH_ALIGNMENT_CLASS_MAPPING } from '../../../utils/constants';
import DocumentDefinitionPopover from './DocumentDefinitionPopover';
import DocumentToken from './DocumentToken';

interface Props {
  paragraphItem: IDocument;
  paragraphIndex: number;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}
const DocumentParagraph = ({ paragraphItem, paragraphIndex, virtualizer }: Props) => {
  const [definitionPopover, setDefinitionPopover] = useState<{ pIndex: number; tokenIndex: number } | undefined>(
    undefined,
  );
  const [popoverYPosition, setPopoverYPosition] = useState(0);
  const definitionPopoverRef = useRef<HTMLSpanElement>(null);

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
      <p
        className={cn(alignmentClass, 'whitespace-pre-wrap', { footnote: isFootnote })}
        style={{ marginLeft: indentationLevel + 'rem' }}
      >
        {definitionPopover && paragraphIndex === definitionPopover.pIndex && (
          <DocumentDefinitionPopover popoverYPosition={popoverYPosition} definitionPopoverRef={definitionPopoverRef} />
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
            token={token}
            tokenIndex={tokenIndex}
            key={tokenIndex}
            setPopoverYPosition={setPopoverYPosition}
            setDefinitionPopover={setDefinitionPopover}
            definitionPopover={definitionPopover}
            paragraphIndex={paragraphIndex}
          />
        ))}
      </p>
    </div>
  );
};

export default DocumentParagraph;
