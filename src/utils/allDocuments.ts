import document1Data from '../assets/document1.json';
import { IDocument } from '../types/document';

export const allDocuments: { [key: string]: IDocument[] } = {
  document1: document1Data as IDocument[],
};
