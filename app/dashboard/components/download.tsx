'use client'

import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import { Button } from "react-day-picker";

const DownloadPage = ({ url }: { url: string }) => {
  const saveFile = () => {
    saveAs(url);
  };
  return (
    <div>
      <Button className="px-3 shadow-none flex justify-between" onClick={saveFile}>
        Download <Download className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};
export default DownloadPage;
