import { describe, it, expect } from "vitest";
import { logRoles,  screen } from "@testing-library/react";
import Register from "../components/Register";
import { withRenderComponenet } from "./Render";

describe("Register", () => {
  it("Register name , email and password test", () => {
    const { container } = withRenderComponenet(<Register/>)
    logRoles(container);
    // expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByPlaceholderText( /name/i )).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  });
});
