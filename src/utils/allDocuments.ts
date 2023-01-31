import document1Data from '../assets/document1.json';
import { IDocument } from '../types/document';

export const allDocuments: { [key: string]: IDocument[] } = {
  Document1: document1Data as IDocument[],
  Document2: document1Data as IDocument[],
};
