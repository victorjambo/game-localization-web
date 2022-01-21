import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a welcome home", () => {
    render(<Home />);

    const welcome = screen.getByTestId("welcome-home");

    expect(welcome).toBeInTheDocument();
  });
});
