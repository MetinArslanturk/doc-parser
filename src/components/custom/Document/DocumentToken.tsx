import cn from 'classnames';
import { DescriptorType, Token } from '../../../types/document';
import { INITIAL_TOKEN_CLASS_NAME } from '../../../utils/constants';
import { mapDescriptorsToClassName } from '../../../utils/mapDescriptorToClass';
import DownArrowIcon from '../../elements/DownArrowIcon';

interface Props {
  tokenIndex: number;
  token: Token;
  paragraphIndex: number;
  setPopoverYPosition: React.Dispatch<React.SetStateAction<number>>;
  setDefinitionPopover: React.Dispatch<
    React.SetStateAction<
      | {
          pIndex: number;
          tokenIndex: number;
        }
      | undefined
    >
  >;
  definitionPopover:
    | {
        pIndex: number;
        tokenIndex: number;
      }
    | undefined;
}
const DocumentToken = ({
  tokenIndex,
  token,
  setPopoverYPosition,
  definitionPopover,
  paragraphIndex,
  setDefinitionPopover,
}: Props) => {
  const hasDefinitionDescriptor = token.descriptors.some((desc) => desc.type === DescriptorType.Definition);

  const isPopoverOpenForToken =
    definitionPopover && paragraphIndex === definitionPopover.pIndex && tokenIndex === definitionPopover.tokenIndex;

  const combinedClassName = cn(mapDescriptorsToClassName(INITIAL_TOKEN_CLASS_NAME, token.descriptors), {
    'pt-40 relative': isPopoverOpenForToken,
  });

  return (
    <span
      className={combinedClassName}
      role={hasDefinitionDescriptor ? 'button' : undefined}
      onClick={
        hasDefinitionDescriptor
          ? (e) => {
              const elementClickedYDistance = e.clientY - e.currentTarget.getBoundingClientRect().top;

              const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
              setPopoverYPosition(e.clientY - parentRect.top - elementClickedYDistance + 8);
              console.log('Clicked definition');
              setDefinitionPopover({
                pIndex: paragraphIndex,
                tokenIndex,
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
