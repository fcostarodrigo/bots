import { describe, expect, it } from "vitest";
import App from "./App";

describe(App, () => {
  it("should render", () => {
    expect(<App />).toMatchSnapshot();
  });
});
