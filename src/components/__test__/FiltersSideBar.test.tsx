// __tests__/FiltersSidebar.test.tsx
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FiltersSidebar } from "../FilterSideBar"; // adjust path if needed
import { vi } from "vitest"; // if using Jest replace with jest.fn()

describe("FiltersSidebar", () => {
  const availableMakes = { Toyota: 5, Honda: 3 };
  const availableColors = { Red: 2, Blue: 4 };

  const setup = (
    props?: Partial<React.ComponentProps<typeof FiltersSidebar>>
  ) => {
    const onMakesChange = vi.fn();
    const onColorsChange = vi.fn();
    const onClearFilters = vi.fn();
    render(
      <FiltersSidebar
        selectedMakes={props?.selectedMakes ?? []}
        selectedColors={props?.selectedColors ?? []}
        availableMakes={availableMakes}
        availableColors={availableColors}
        onMakesChange={onMakesChange}
        onColorsChange={onColorsChange}
        onClearFilters={onClearFilters}
        {...props}
      />
    );

    return { onMakesChange, onColorsChange, onClearFilters, render };
  };

  it("renders correctly with no filters selected", () => {
    setup();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Select Makes by default All")).toBeInTheDocument();
    expect(
      screen.getByText("Select Colors by default All")
    ).toBeInTheDocument();
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();
  });

  it("opens and closes make dropdown", () => {
    setup();
    const makeButton = screen.getByText(/Select Makes/);
    fireEvent.click(makeButton);
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    fireEvent.click(makeButton);
    expect(screen.queryByText("Toyota")).not.toBeInTheDocument();
  });

  it("selects and deselects a make", () => {
    const { onMakesChange } = setup();
    fireEvent.click(screen.getByText(/Select Makes/));

    const toyota = screen.getByText("Toyota");
    fireEvent.click(toyota);
    expect(onMakesChange).toHaveBeenCalledWith(["Toyota"]);
    // simulate Toyota already selected
    cleanup();
    const { onMakesChange: onMakesChangeSelected } = setup({
      selectedMakes: ["Toyota"],
    });
    fireEvent.click(screen.getByText(/Make Selected/i));
    fireEvent.click(screen.getAllByText("Toyota")[0]);

    expect(onMakesChangeSelected).toHaveBeenCalledWith([]);
  });

  it("selects and deselects a color", () => {
    const { onColorsChange } = setup();
    fireEvent.click(screen.getByText(/Select Colors/));

    const red = screen.getByText("Red");
    fireEvent.click(red);
    expect(onColorsChange).toHaveBeenCalledWith(["Red"]);
    cleanup();
    // simulate Red already selected
    const { onColorsChange: onColorsChangeSelected } = setup({
      selectedColors: ["Red"],
    });
    fireEvent.click(screen.getByText(/color selected/i));
    fireEvent.click(screen.getAllByText("Red")[0]);
    expect(onColorsChangeSelected).toHaveBeenCalledWith([]);
  });

  it("shows selected make and color chips", () => {
    setup({ selectedMakes: ["Honda"], selectedColors: ["Blue"] });
    expect(screen.getByText("Honda")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("calls onClearFilters when clear button is clicked", () => {
    const { onClearFilters } = setup({ selectedMakes: ["Honda"] });
    fireEvent.click(screen.getByText("Clear"));
    expect(onClearFilters).toHaveBeenCalled();
  });
});
