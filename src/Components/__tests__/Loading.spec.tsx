import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("<Loading />", () => {
  it("should show loading", () => {
    render(<Loading />);
    screen.getByText(/loading.../i);
  });
});
