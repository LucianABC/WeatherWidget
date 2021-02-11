import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "..";

const initProps = {
  handleChange: jest.fn(),
  handleEnter: jest.fn(),
  handleSubmit: jest.fn(),
};

const component = (props?: Record<string, unknown>) => {
  render(<Search {...initProps} {...props} />);
};

describe("Search test suite", () => {
  it("should call handleChange", () => {
    const mockSetQuery = jest.fn();
    const mockProps = {
      ...initProps,
      handleChange: mockSetQuery,
    };
    component(mockProps);
    const input = screen.getByPlaceholderText("Enter city...");

    fireEvent.change(input, { target: { value: "Buenos Aires" } });
    expect(mockSetQuery).toBeCalled();
  });
  it("should call handleEnter", () => {
    const mockSetQuery = jest.fn();
    const mockProps = {
      ...initProps,
      handleEnter: mockSetQuery,
    };
    component(mockProps);
    const input = screen.getByPlaceholderText("Enter city...");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockSetQuery).toBeCalled();
  });
});
