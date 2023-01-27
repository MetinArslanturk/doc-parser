export interface IDocument {
  text: string;
  tokens: Token[];
  listItemLabel: null | string;
  indentationLevel: number;
  firstLineIndentationLevel: number;
  paragraphAlignment: ParagraphAlignment;
  isFootnote: boolean;
}

export enum ParagraphAlignment {
  Both = 'BOTH',
  Center = 'CENTER',
  Left = 'LEFT',
}

export interface Token {
  text: string;
  descriptors: Descriptor[];
}

export interface Descriptor {
  type: DescriptorType;
  formatting?: Formatting;
  definition?: Definition;
  definitionSource?: Definition;
  clauseSnippetTag?: ClauseSnippetTag;
  diff?: Diff;
  contractSlice?: ContractSlice;
}

export interface ClauseSnippetTag {
  startIndex: number;
  endIndex: number;
  payload: ClauseSnippetTagPayload;
}

export interface ClauseSnippetTagPayload {
  tagId: string;
  libraryId: string;
  contractId: ContractID;
  userId: string;
  startPosition: Position;
  endPosition: Position;
  tagValues: any[];
  createdAt: Date;
  contractSliceId: string;
}

export interface ContractID {
  id: string;
  version: string;
}

export interface Position {
  paragraphIndex: number;
  characterOffset: number;
}

export interface ContractSlice {
  startIndex: number;
  endIndex: number;
  payload: ContractSlicePayload;
}

export interface ContractSlicePayload {
  id: string;
  contractId: ContractID;
  type: PayloadType;
  title: string;
  startIndex: number;
  endIndex: number;
  listItemLabel: string;
}

export enum PayloadType {
  Subclause = 'SUBCLAUSE',
  Subsection = 'SUBSECTION',
}

export interface Definition {
  startIndex: number;
  endIndex: number;
  payload: DefinitionPayload;
}

export interface DefinitionPayload {
  name: string;
  value: Value;
  aliasTo: string;
}

export interface Value {
  startIndex: number;
  endIndex: number;
}

export interface Diff {
  startIndex: number;
  endIndex: number;
  payload: PayloadType;
}

export enum PayloadType {
  Del = 'DEL',
  DelBlock = 'DEL_BLOCK',
  Ins = 'INS',
  Move = 'MOVE',
  Noop = 'NOOP',
}

export interface Formatting {
  startIndex: number;
  endIndex: number;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
}

export enum DescriptorType {
  ClauseSnippetTag = 'clauseSnippetTag',
  ContractSlice = 'contractSlice',
  Definition = 'definition',
  DefinitionSource = 'definitionSource',
  Diff = 'diff',
  Formatting = 'formatting',
}
