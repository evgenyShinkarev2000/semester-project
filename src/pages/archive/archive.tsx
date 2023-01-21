import { useState } from "react";
import ServerApi from "../../server-api";


function Archive()
{
  const serverApi = new ServerApi();
  function click()
  {
    serverApi.getFileNames("84ECB21F43C8354C95B94BF2502D3DAE").then(f => {
      debugger;
      setFileNames(f);
    })
  }
  const [fileNames, setFileNames] = useState([] as string[]);
  return (
    <>
      <h2>acrvhive page</h2>
      <button onClick={click}>getList</button>
      <ul>
        {fileNames.map(fileName => <li>{fileName}</li>)}
      </ul>
    </>
  );
}

export default Archive;