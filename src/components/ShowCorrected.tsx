import React, { useState } from "react";
import "./ShowCorrected.scss";

type Props = { text: string };

const ShowCorrected = ({ text }: Props) => (
  <div className="corrected-text">{text}</div>
);
export default ShowCorrected;
