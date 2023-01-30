import VirtualizedDocument from '../components/custom/Document/VirtualizedDocument';
import useWindowSize from '../hooks/useWindowSize';
import { allDocuments } from '../utils/allDocuments';
import { getEstimatedParagprahSize } from '../utils/estimateSize';
import { useParams, useSearchParams } from 'react-router-dom';
import ErrorMessage from '../components/elements/ErrorMessage';
import ErrorBoundary from '../components/custom/ErrorBoundary';
import { useMemo } from 'react';
import { preMapAllDescriptorsToClassNames } from '../utils/mapDescriptorToClass';

const DocumentPage = () => {
  const windowSize = useWindowSize();
  const { documentName } = useParams();
  const [searchParams] = useSearchParams();
  const preMapClasses = searchParams.get('premapclasses');
  const docData = useMemo(() => {
    const data = allDocuments[documentName as string];
    if (preMapClasses === 'true') {
      preMapAllDescriptorsToClassNames(data);
    }
    return data;
  }, [documentName, preMapClasses]);
  const estimatedSize = getEstimatedParagprahSize(windowSize.width, docData);

  if (!docData) {
    return (
      <div className="max-w-6xl mx-2 sm:mx-auto my-2">
        <ErrorMessage
          title="Error"
          message="There isn't any file with provided name! Please check name and try again."
        />
      </div>
    );
  }
  return (
    <div className="min-w-[25rem] w-full sm:w-1/2 max-w-7xl h-screen border-2 border-gray-200 my-1 py-2 m-auto">
      <ErrorBoundary>
        <VirtualizedDocument docData={docData} estimatedSize={estimatedSize} />
      </ErrorBoundary>
    </div>
  );
};

export default DocumentPage;
