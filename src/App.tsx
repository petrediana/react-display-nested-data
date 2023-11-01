import React, { useState } from "react";
import { transformDataToTree, TreeData } from "./utils";
import { response } from "./data";

function App() {
  const [data, setData] = useState<TreeData[]>(transformDataToTree(response));

  console.log(data);
  return <div>Hello</div>;
}

export default App;
