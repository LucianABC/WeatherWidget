import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "..";

const initProps = {
  handleSubmit: jest.fn(),
};

const component = (props?: () => void) => {
  render(<Select {...initProps} {...props} />);
};

describe("Select test suite", () => {
  it("should render the component", () => {
    component();
    const select = screen.getByTestId("select");
    expect(select).toBeInTheDocument();
  });
  it("should render all the options correctly", () => {
    component();
    const options = screen.getAllByTestId("option");
    expect(options.length).toBe(5);
  });
  /*   it("should call handleSubmit", () => {
    const mockHandleSubmit = jest.fn();
    component(mockHandleSubmit);
    const select = screen.getByTestId("select");
    const options = screen.getAllByTestId("option");
    fireEvent.change(select, { target: { value: "london" } });

    expect(mockHandleSubmit).toBeCalled();
  }); */
});
