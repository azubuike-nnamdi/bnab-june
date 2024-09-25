import { RefreshCcwDot } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RefreshCcwDot className="h-16 w-16 animate-spin text-blue-500" />
    </div>
  );
};

export default Loading; 