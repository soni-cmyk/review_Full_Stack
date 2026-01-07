import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

test("renders Login button", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

test("renders Signup button", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
});
