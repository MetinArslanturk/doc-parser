import { Link } from 'react-router-dom';

interface Props {
  linkTo: string;
  documentName: string;
}
const RootNavigationButton = ({ linkTo, documentName }: Props) => {
  return (
    <div className="flex max-w-screen-sm items-center justify-center mt-2">
      <Link to={linkTo} className="w-full rounded-md bg-gradient-to-r from-gray-500 to-blue-500 p-1">
        <div className="flex h-full w-full items-center justify-center bg-gray-100 back px-5 py-4">
          <h1 className="text-xl font-black text-gray-600">{documentName}</h1>
        </div>
      </Link>
    </div>
  );
};

export default RootNavigationButton;
