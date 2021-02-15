import React from "react";
import rateLimitAxios from "./rate-limit-axios";
import { render } from "react-dom";
import App from "./components/App";

rateLimitAxios();
render(<App />, document.querySelector("#root"));
