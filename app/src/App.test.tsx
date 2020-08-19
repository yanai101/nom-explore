import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("main page is appear", () => {
  test("renders app header", async () => {
    const { getByText } = render(<App />);
    console.log(getByText);
    const headerElement = getByText(/Npm explore/i);
    expect(headerElement).toBeInTheDocument();
  });
});
