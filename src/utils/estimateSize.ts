import { IDocument } from '../types/document';
import {
  CHAR_LENGTH,
  CONTAINER_MAX_WIDTH,
  CONTAINER_MIN_WIDTH,
  DEFAULT_INITIAL_SCREEN_WIDTH,
  DEFAULT_MAX_TEXT_LENGTH,
  INITIAL_MAX_PARAGRAPH_HEIGHT,
  LINE_LENGTH,
  SM_SCREEN_BREAKPOINT,
} from './constants';

export const getEstimatedParagprahSize = (currentWindowWidth: number | undefined, docData: IDocument[]) => {
  let maxLength = DEFAULT_MAX_TEXT_LENGTH;

  docData?.forEach((doc) => {
    if (doc.text.length > maxLength) {
      maxLength = doc.text.length;
    }
  });

  const windowWidth =
    currentWindowWidth || typeof window !== 'undefined' ? window.innerWidth : DEFAULT_INITIAL_SCREEN_WIDTH;

  const listContainerWidth = windowWidth < SM_SCREEN_BREAKPOINT ? windowWidth : windowWidth / 2;

  const clampedlistContainerWidth =
    listContainerWidth <= CONTAINER_MIN_WIDTH
      ? CONTAINER_MIN_WIDTH
      : listContainerWidth >= CONTAINER_MAX_WIDTH
      ? CONTAINER_MAX_WIDTH
      : listContainerWidth;

  const maxSentenceCount = (maxLength * CHAR_LENGTH) / clampedlistContainerWidth;

  const estimatedSize = maxSentenceCount * LINE_LENGTH || INITIAL_MAX_PARAGRAPH_HEIGHT - clampedlistContainerWidth;
  return estimatedSize;
};
