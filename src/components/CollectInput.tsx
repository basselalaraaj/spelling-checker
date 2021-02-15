import React, { useState } from "react";
import "./CollectInput.scss";

type Props = { submitHandler: (str: string) => void };

const CollectInput = ({ submitHandler }: Props) => {
  const [text, setText] = React.useState("");

  const handleTextAreaKeyPress = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      submitHandler(text);
    }
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    submitHandler(text);
  };

  return (
    <form className="collect-input-form" onSubmit={handleFormSubmit}>
      <textarea
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleTextAreaKeyPress}
      ></textarea>
      <input type="submit" value="Correct Spelling" />
    </form>
  );
};

export default CollectInput;
