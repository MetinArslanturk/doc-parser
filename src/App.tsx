import documentData from './assets/document.json';
import VirtualizedDocument from './components/custom/Document/VirtualizedDocument';
import useWindowSize from './hooks/useWindowSize';
import { IDocument } from './types/document';
import { getEstimatedParagprahSize } from './utils/estimateSize';

const App = () => {
  const docData = documentData as IDocument[];
  const windowSize = useWindowSize();
  const estimatedSize = getEstimatedParagprahSize(windowSize.width, docData);
  return (
    <div className="flex justify-center py-2">
      <div className="min-w-[25rem] w-full sm:w-1/2 max-w-7xl h-screen border-2 border-gray-200 py-2">
        <VirtualizedDocument docData={docData} estimatedSize={estimatedSize} />
      </div>
    </div>
  );
};

export default App;
