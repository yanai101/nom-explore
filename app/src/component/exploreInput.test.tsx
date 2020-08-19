import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { ExploreInput } from "./exploreInputs";

describe("ExploreInput component", () => {
  const mockFn = jest.fn();
  let pName: HTMLElement, pTag: HTMLElement, submit: HTMLElement;

  beforeAll(() => {
    const { getByTestId, get } = render(<ExploreInput setList={mockFn} />);
    pName = getByTestId("pName");
    pTag = getByTestId("pTag");
    submit = getByTestId("submit");
    // pTag.getElementsByTagName("input")[0].value = "test";
    // pName.getElementsByTagName("input")[0].value = "name";
  });

  afterEach(cleanup);

  test("check btn disable behavior ", async () => {
    expect(pName).toBeDefined();
    expect(pTag).toBeDefined();
    expect(submit).toBeDisabled();
    fireEvent.change(pName.getElementsByTagName("input")[0], { target: { value: "test" } });
    expect(submit).not.toBeDisabled();
  });

  test("check default tag ", async () => {
    expect(pTag.getElementsByTagName("input")[0].value).toBe("latest");
  });
});
