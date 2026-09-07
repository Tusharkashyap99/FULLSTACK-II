import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostButton from "./PostButton";

describe("PostButton Component", () => {

  it("renders the post title", () => {
    render(<PostButton title="Instagram Post" />);

    expect(
      screen.getByText("Instagram Post")
    ).toBeInTheDocument();
  });

  it("calls the function when clicked", () => {
    const handleClick = vi.fn();

    render(
      <PostButton
        title="Instagram Post"
        onClick={handleClick}
      />
    );

    fireEvent.click(
      screen.getByText("Instagram Post")
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});