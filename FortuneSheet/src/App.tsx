import "@fortune-sheet/react/dist/index.css";
import { useRef, useState } from "react";
import { Workbook, type WorkbookInstance } from "@fortune-sheet/react";
import {
  FortuneExcelHelper,
  importToolBarItem,
  exportToolBarItem,
} from "@corbe30/fortune-excel";

function App() {
  const [data, setData] = useState([{ name: "Hoja 1" }]);
  const [key, setKey] = useState(0);
  const sheetRef = useRef<WorkbookInstance>(null);

  const handleOnChangeData = (data: any) => {
    console.log("data", data);
    setData(data);
  };

  return (
    <>
      <FortuneExcelHelper
        setKey={setKey}
        setSheets={setData}
        sheetRef={sheetRef}
        config={{
          import: { xlsx: true, csv: true },
          export: { xlsx: true, csv: true },
        }}
      />
      <Workbook
        data={data}
        onChange={handleOnChangeData}
        ref={sheetRef}
        key={key}
        lang={"es"}
        customToolbarItems={[importToolBarItem(), exportToolBarItem()]}
      />
    </>
  );
}

export default App;
