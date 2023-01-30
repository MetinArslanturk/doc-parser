import cn from 'classnames';
import useDefinitionPopover from '../../../hooks/useDefinitionPopover';
import { DefinitionPayload, DescriptorType, Token } from '../../../types/document';
import { INITIAL_TOKEN_CLASS_NAME } from '../../../utils/constants';
import { mapDescriptorsToClassName } from '../../../utils/mapDescriptorToClass';
import DownArrowIcon from '../../elements/DownArrowIcon';

export type DefinitionPopoverState =
  | {
      pIndex: number;
      tokenIndex: number;
      definitionPayload: DefinitionPayload;
    }
  | undefined;

interface Props {
  tokenIndex: number;
  token: Token;
  paragraphIndex: number;
  asPopover?: boolean;
  definitionPopoverSpecs: ReturnType<typeof useDefinitionPopover>;
}
const DocumentToken = ({ tokenIndex, token, asPopover, paragraphIndex, definitionPopoverSpecs }: Props) => {
  const { setPopoverYPosition, definitionPopover, setDefinitionPopover } = definitionPopoverSpecs;
  const definition = token.descriptors.find((desc) => desc.type === DescriptorType.Definition)?.definition;

  const isPopoverOpenForToken =
    definitionPopover && paragraphIndex === definitionPopover.pIndex && tokenIndex === definitionPopover.tokenIndex;

  const combinedClassName = cn(mapDescriptorsToClassName(INITIAL_TOKEN_CLASS_NAME, token.descriptors), {
    'pt-40 relative': isPopoverOpenForToken,
    'hover:cursor-pointer': !!definition && !asPopover,
  });

  return (
    <span
      className={combinedClassName}
      role={definition && !asPopover ? 'button' : undefined}
      onClick={
        definition
          ? (e) => {
              if (asPopover) {
                return;
              }
              const elementClickedYDistance = e.clientY - e.currentTarget.getBoundingClientRect().top;

              const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
              setPopoverYPosition(e.clientY - parentRect.top - elementClickedYDistance + 8);
              setDefinitionPopover({
                pIndex: paragraphIndex,
                tokenIndex,
                definitionPayload: definition.payload,
              });
            }
          : undefined
      }
    >
      {isPopoverOpenForToken && (
        <DownArrowIcon className="absolute h-4 left-1/2 bottom-2 absolute-center text-gray-500" />
      )}
      {token.text}
    </span>
  );
};

export default DocumentToken;
