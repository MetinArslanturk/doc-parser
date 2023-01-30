import { DiffPayloadType, ParagraphAlignment } from '../types/document';

export const DEFAULT_MAX_TEXT_LENGTH = 300;
export const DEFAULT_INITIAL_SCREEN_WIDTH = 800;

export const PARAGRAPH_ALIGNMENT_CLASS_MAPPING = {
  [ParagraphAlignment.Left]: 'text-left',
  [ParagraphAlignment.Center]: 'text-center',
  [ParagraphAlignment.Both]: 'text-justify',
};

export const DEFAULT_PARAGRAPH_ALIGNMENT_CLASS = 'text-justify';

export const DIFF_PAYLOAD_CLASS_MAPPING = {
  [DiffPayloadType.Del]: 'text-red-600 line-through',
  [DiffPayloadType.DelBlock]: 'text-green-600 line-through',
  [DiffPayloadType.Ins]: 'text-blue-600 underline',
  [DiffPayloadType.Move]: 'text-green-600',
  [DiffPayloadType.Noop]: '',
};
