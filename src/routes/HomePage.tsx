import RootNavigationButton from '../components/elements/RootNavigationButton';
import SwitchToggle from '../components/elements/SwitchToggle';
import report from '../assets/report.jpg';
import { allDocuments } from '../utils/allDocuments';
import { useState } from 'react';

const HomePage = () => {
  const [preMapClasses, setPreMapClasses] = useState(false);
  return (
    <div className="flex flex-col min-h-screen w-full px-6 m-auto text-lg leading-7 text-white sm:px-14 md:px-24 lg:px-32">
      <main className="flex-grow">
        <article className="flex flex-col items-center justify-center h-full mt-10 text-center">
          <header className="flex flex-col items-center mb-3">
            <img className="mb-2 rounded-full h-36 w-36" width="144" height="144" alt="DocumentViewer" src={report} />
            <h1 className="text-4xl font-extrabold ">Document Viewer</h1>
            <h2 className="text-xl text-neutral-300 ">DraftWise Challenge Project</h2>
            <section className="pt-5 prose">
              <SwitchToggle labelText="Pre-map descriptors" isChecked={preMapClasses} setIsChecked={setPreMapClasses} />
              <p>You can jump documents from below links:</p>
              <div className="flex flex-col">
                {Object.keys(allDocuments).map((doc) => (
                  <RootNavigationButton
                    linkTo={'/doc/' + doc + (preMapClasses ? '?premapclasses=true' : '')}
                    documentName={doc}
                    key={doc}
                  />
                ))}
                <RootNavigationButton
                  linkTo="https://www.linkedin.com/in/metin-arslanturk/"
                  documentName="My LinkedIn :)"
                />
              </div>
            </section>
          </header>
        </article>
      </main>
    </div>
  );
};

export default HomePage;
