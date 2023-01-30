import useWindowSize from '../../../hooks/useWindowSize';
import { IDocument } from '../../../types/document';
import { getEstimatedParagprahSize } from '../../../utils/estimateSize';
import VirtualizedDocument from './VirtualizedDocument';

interface Props {
  definitionDocData: IDocument[];
  popoverYPosition: number;
  definitionPopoverRef: React.RefObject<HTMLSpanElement>;
}
const DocumentDefinitionPopover = ({ popoverYPosition, definitionPopoverRef, definitionDocData }: Props) => {
  const windowSize = useWindowSize();
  const estimatedSize = getEstimatedParagprahSize(windowSize.width, definitionDocData);
  return (
    <span
      className="absolute h-40 border border-gray-500 bg-white rounded-md left-0 transition-opacity duration-300 z-10 inline-block popover absolute-center"
      style={{ top: popoverYPosition + 'px' }}
      onClick={(e) => {
        e.stopPropagation();
        console.log('Jump to definition');
      }}
      ref={definitionPopoverRef}
    >
      <VirtualizedDocument estimatedSize={estimatedSize} docData={definitionDocData} asPopover />
    </span>
  );
};

export default DocumentDefinitionPopover;
