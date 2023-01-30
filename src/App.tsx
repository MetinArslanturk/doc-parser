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
    <div className="min-w-[25rem] w-full sm:w-1/2 max-w-7xl h-screen border-2 border-gray-200 my-2 py-2 m-auto">
      <VirtualizedDocument docData={docData} estimatedSize={estimatedSize} />
    </div>
  );
};

export default App;
