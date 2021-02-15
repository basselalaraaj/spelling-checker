import React, { useState } from "react";
import "./App.scss";
import CollectInput from "./CollectInput";
import SpellingFixer from "./SpellingFixer";

const App = () => {
  const [text, setText] = React.useState("");
  return (
    <div className="App">
      <CollectInput submitHandler={setText} />
      {text && <SpellingFixer corpus={text} />}
    </div>
  );
};

export default App;
