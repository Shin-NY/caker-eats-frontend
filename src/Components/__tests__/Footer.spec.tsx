import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("<Footer />", () => {
  it("should show footer", () => {
    render(<Footer />);
    screen.getByText(/caker/i);
    screen.getByText(/eats/i);
  });
});
