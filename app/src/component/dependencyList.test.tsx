import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { ExploreInput } from "./exploreInputs";
import DependencyList from "./dependencyList";

describe("ExploreInput component", () => {
  const mockFn = jest.fn();
  let pName: HTMLElement, pTag: HTMLElement, submit: HTMLElement;

  afterEach(cleanup);

  test("list not should appear", async () => {
    const list = null;
    const { getByTestId } = render(<DependencyList setList={mockFn} list={list} />);
    expect(getByTestId("list")).toBeDefined();
    expect(getByTestId("list")).toBeEmptyDOMElement();
  });

  test("list should appear - without dependency", async () => {
    const list = { name: "test", version: "1.0.0" };
    const { getByTestId, getByText } = render(<DependencyList setList={mockFn} list={list} />);
    expect(getByText(/test - 1.0.0/i)).toBeInTheDocument();
    expect(getByTestId("list").getElementsByTagName("li")[0]).not.toBeDefined();
  });

  test("list should appear - with dependency", async () => {
    const list = { name: "test", version: "1.0.0", dependencies: { foo: "bar" } };
    const { getByTestId, getByText } = render(<DependencyList setList={mockFn} list={list} />);
    const li = getByTestId("list").getElementsByClassName("list-item")[0];
    expect(getByText(/test - 1.0.0/i)).toBeInTheDocument();
    expect(li).toBeInTheDocument();
    expect(li.innerHTML).toContain("foo - bar");
  });
});
