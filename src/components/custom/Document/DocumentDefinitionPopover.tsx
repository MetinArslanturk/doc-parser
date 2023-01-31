import { Virtualizer } from '@tanstack/react-virtual';
import { useSearchParams } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import { DefinitionPayload, IDocument } from '../../../types/document';
import { getEstimatedParagprahSize } from '../../../utils/estimateSize';
import { DefinitionPopoverState } from './DocumentToken';
import VirtualizedDocument from './VirtualizedDocument';

interface Props {
  definitionDocData: IDocument[];
  popoverYPosition: number;
  definitionPopoverRef: React.RefObject<HTMLSpanElement>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  setDefinitionPopover: React.Dispatch<React.SetStateAction<DefinitionPopoverState>>;
  definitionPayload: DefinitionPayload;
}
const DocumentDefinitionPopover = ({
  popoverYPosition,
  definitionPopoverRef,
  definitionDocData,
  definitionPayload,
  setDefinitionPopover,
  virtualizer,
}: Props) => {
  const windowSize = useWindowSize();
  const estimatedSize = getEstimatedParagprahSize(windowSize.width, definitionDocData);
  const [searchParams, setSearchParams] = useSearchParams();
  const indexParam = searchParams.get('index');
  return (
    <span
      className="absolute h-40 border border-gray-500 bg-white rounded-md left-0 transition-opacity duration-300 z-40 inline-block popover absolute-center cursor-pointer shadow-md"
      style={{ top: popoverYPosition + 'px' }}
      onClick={(e) => {
        e.stopPropagation();
        setDefinitionPopover(undefined);
        if (Number(indexParam as never) === definitionPayload.value.startIndex) {
          virtualizer.scrollToIndex(definitionPayload.value.startIndex);
        } else {
          searchParams.set('index', definitionPayload.value.startIndex.toString());
          setSearchParams(searchParams);
        }
      }}
      ref={definitionPopoverRef}
    >
      <VirtualizedDocument estimatedSize={estimatedSize} docData={definitionDocData} asPopover />
    </span>
  );
};

export default DocumentDefinitionPopover;
