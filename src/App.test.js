import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the login prompt", () => {
  render(<App />);
  expect(
    screen.getByText(/please login or signup to continue/i)
  ).toBeInTheDocument();
});
