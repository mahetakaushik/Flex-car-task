import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VehicleList } from "../VehicleList";

describe("VehicleList", () => {
  it("renders loading skeletons when isLoading is true", () => {
    render(<VehicleList vehicles={[]} isLoading />);

    const skeletons = screen.getAllByText("", { selector: ".animate-pulse" });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders error message when error is provided", () => {
    const errorMessage = "Failed to fetch vehicles";
    render(<VehicleList vehicles={[]} error={errorMessage} />);

    expect(screen.getByText("Search Error")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders no vehicles message when vehicles array is empty", () => {
    render(<VehicleList vehicles={[]} />);

    expect(screen.getByText("No Vehicles Found")).toBeInTheDocument();
    expect(
      screen.getByText(/No vehicles match your current search criteria/i)
    ).toBeInTheDocument();
  });
});
