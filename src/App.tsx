import documentData from './assets/document.json';
import VirtualizedDocument from './components/custom/Document/VirtualizedDocument';
import { IDocument } from './types/document';

const App = () => {
  return (
    <div className="flex justify-center py-2">
      <VirtualizedDocument docData={documentData as IDocument[]} />
    </div>
  );
};

export default App;
