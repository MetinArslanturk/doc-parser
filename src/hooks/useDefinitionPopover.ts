import { useRef, useState } from 'react';
import { DefinitionPopoverState } from '../components/custom/Document/DocumentToken';

const useDefinitionPopover = () => {
  const [definitionPopover, setDefinitionPopover] = useState<DefinitionPopoverState>(undefined);
  const [popoverYPosition, setPopoverYPosition] = useState(0);
  const definitionPopoverRef = useRef<HTMLSpanElement>(null);

  return { definitionPopover, setDefinitionPopover, popoverYPosition, setPopoverYPosition, definitionPopoverRef };
};

export default useDefinitionPopover;
