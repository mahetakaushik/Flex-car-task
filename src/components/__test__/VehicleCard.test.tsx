import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VehicleCard } from "../VehicleCard";

const mockVehicle = {
  id: 1,
  year: 2022,
  make: "Toyota",
  model: "Camry",
  trim: "SE",
  mileage: 12345,
  zipCode: "90210",
  color: "Red",
  price: 25000,
  image: "/toyota-camry.jpg",
};

describe("VehicleCard", () => {
  it("renders vehicle information correctly", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    // Image
    const img = screen.getByRole("img", { name: /2022 Toyota Camry/i });
    expect(img).toHaveAttribute("src", "/toyota-camry.jpg");

    // Year Badge
    expect(screen.getAllByText("2022")[0]).toBeInTheDocument();

    // Title and trim
    expect(screen.getByText(/2022 Toyota Camry/i)).toBeInTheDocument();
    expect(screen.getByText("SE")).toBeInTheDocument();

    // Mileage
    expect(screen.getByText("12,345 mi")).toBeInTheDocument();

    // Zip Code
    expect(screen.getByText("90210")).toBeInTheDocument();

    // Color badge
    expect(screen.getByText("Red")).toBeInTheDocument();

    // Price
    expect(screen.getByText("$25,000")).toBeInTheDocument();
  });

  it("renders placeholder image when no image provided", () => {
    const vehicleWithoutImage = { ...mockVehicle, image: "" };
    render(<VehicleCard vehicle={vehicleWithoutImage} />);

    const img = screen.getByRole("img", { name: /2022 Toyota Camry/i });
    expect(img).toHaveAttribute("src", "/placeholder.svg");
  });
});
