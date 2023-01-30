interface Props {
  popoverYPosition: number;
  definitionPopoverRef: React.RefObject<HTMLSpanElement>;
}
const DocumentDefinitionPopover = ({ popoverYPosition, definitionPopoverRef }: Props) => {
  return (
    <span
      className="absolute h-40 border border-gray-500 rounded-md left-0 transition-opacity duration-300 z-10 inline-block popover absolute-center"
      style={{ top: popoverYPosition + 'px' }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={definitionPopoverRef}
    ></span>
  );
};

export default DocumentDefinitionPopover;
