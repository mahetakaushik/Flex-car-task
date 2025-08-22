import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { SortDropdown, type SortOption } from "../SortDropDown";

describe("SortDropdown", () => {
  const options: SortOption[] = [
    "price-low",
    "price-high",
    "year-new",
    "year-old",
  ];

  it("renders with the initial selected value", () => {
    render(<SortDropdown value="price-low" onChange={vi.fn()} />);

    // The trigger should display the initial value
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
  });

  it("calls onChange when selecting a different option", () => {
    const onChange = vi.fn();
    render(<SortDropdown value="price-low" onChange={onChange} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole("combobox"));

    // Select "Year: Newest First"
    fireEvent.click(screen.getByText("Year: Newest First"));

    expect(onChange).toHaveBeenCalledWith("year-new");
  });

  it("renders all options in the dropdown", () => {
    render(<SortDropdown value="price-low" onChange={vi.fn()} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole("combobox"));

    options.forEach((opt) => {
      const label = {
        "price-low": "Price: Low to High",
        "price-high": "Price: High to Low",
        "year-new": "Year: Newest First",
        "year-old": "Year: Oldest First",
      }[opt];
      expect(screen.queryAllByText(label)[0]).toBeInTheDocument();
    });
  });
});
