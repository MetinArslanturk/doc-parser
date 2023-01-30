import cn from 'classnames';
import { Descriptor, DescriptorType, IDocument } from '../types/document';
import { DIFF_PAYLOAD_CLASS_MAPPING, INITIAL_TOKEN_CLASS_NAME } from './constants';

const formattingDescriptorToClassName = (combinedClassName: string, descriptor: Descriptor) => {
  const formatting = descriptor.formatting;
  if (!formatting) {
    return combinedClassName;
  }

  return cn(combinedClassName, {
    'font-bold': formatting.isBold,
    italic: formatting.isItalic,
    underline: formatting.isUnderline,
  });
};

const diffDescriptorToClassName = (combinedClassName: string, descriptor: Descriptor) => {
  if (!descriptor.diff) {
    return combinedClassName;
  }
  const className = DIFF_PAYLOAD_CLASS_MAPPING[descriptor.diff.payload] || '';
  return cn(combinedClassName, className);
};

const definitonDescriptorToClassName = (combinedClassName: string, descriptor: Descriptor) => {
  if (!descriptor.definition) {
    return combinedClassName;
  }

  return cn(combinedClassName, 'underline decoration-dotted hover:decoration-solid inline-block');
};

const definitionSourceDescriptorToClassName = (combinedClassName: string, descriptor: Descriptor) => {
  if (!descriptor.definitionSource) {
    return combinedClassName;
  }

  return cn(combinedClassName, 'underline decoration-dotted hover:decoration-solid');
};

const clauseSnippetTagDescriptorToClassName = (combinedClassName: string, descriptor: Descriptor) => {
  if (!descriptor.clauseSnippetTag) {
    return combinedClassName;
  }

  return cn(combinedClassName, 'bg-gray-300');
};

const searchFilterDescriptorToClassName = (combinedClassName: string) => {
  return cn(combinedClassName, 'bg-yellow-200');
};

const filterTextDescriptorToClassName = (combinedClassName: string) => {
  return cn(combinedClassName, 'bg-yellow-200');
};

const contractSliceDescriptorToClassName = (combinedClassName: string) => {
  return combinedClassName;
};

const descriptorToClassNameFnMap = {
  [DescriptorType.Formatting]: formattingDescriptorToClassName,
  [DescriptorType.Diff]: diffDescriptorToClassName,
  [DescriptorType.Definition]: definitonDescriptorToClassName,
  [DescriptorType.DefinitionSource]: definitionSourceDescriptorToClassName,
  [DescriptorType.SearchResult]: searchFilterDescriptorToClassName,
  [DescriptorType.FilterText]: filterTextDescriptorToClassName,
  [DescriptorType.ClauseSnippetTag]: clauseSnippetTagDescriptorToClassName,
  [DescriptorType.ContractSlice]: contractSliceDescriptorToClassName,
};

export const mapDescriptorsToClassName = (combinedClassName: string, descriptors: Descriptor[]) => {
  if (!descriptors || descriptors.length === 0) {
    return combinedClassName;
  }

  const newCombinedClassName = descriptors.reduce((prev, curr) => {
    const mapperFn = descriptorToClassNameFnMap[curr.type];
    if (!mapperFn) {
      return prev;
    }
    return mapperFn(prev, curr);
  }, combinedClassName);

  return newCombinedClassName;
};

export const preMapAllDescriptorsToClassNames = (docData: IDocument[]) => {
  docData.forEach((paragraph) => {
    paragraph.tokens.forEach((token) => {
      token.preMappedClassName = mapDescriptorsToClassName(INITIAL_TOKEN_CLASS_NAME, token.descriptors);
    });
  });
};
