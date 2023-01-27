import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RestaurantGrid from "../RestaurantGrid";
import "@testing-library/jest-dom/extend-expect";

describe("<RestaurantGrid />", () => {
  it("should show restaurants", () => {
    render(
      <BrowserRouter>
        <RestaurantGrid
          restaurants={[
            {
              id: 1,
              name: "restaurant name",
              imageUrl: "image",
            },
          ]}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole("gridcell")).toHaveAttribute(
      "href",
      "/restaurants/1"
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "image");
    screen.getByText("restaurant name");
  });
});
