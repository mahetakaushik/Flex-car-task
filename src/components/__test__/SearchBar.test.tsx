import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  test("renders input and search button", () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(
      screen.getByPlaceholderText(/Enter ZIP code to search vehicles/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value when user types", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(
      /Enter ZIP code/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe("12345");
  });

  test("calls onSearch with trimmed ZIP code when submitted", () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/Enter ZIP code/i);
    fireEvent.change(input, { target: { value: " 54321 " } });

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith("54321");
  });

  test("displays error message if error prop is passed", () => {
    render(<SearchBar onSearch={() => {}} error="Invalid ZIP code" />);
    expect(screen.getByText(/Invalid ZIP code/i)).toBeInTheDocument();
  });
});
