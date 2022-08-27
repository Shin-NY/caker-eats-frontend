import { render } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
  it("should render", () => {
    const { getByText } = render(<Loading />);
    getByText("Loading...");
  });
});
