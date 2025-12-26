import { render, screen } from "@tests/utils/test-utils";
import { Block } from "@/components/ui/Block";

describe("Block", () => {
  it("renders children", () => {
    render(
      <Block data-testid="b">
        Hi
      </Block>
    );
    expect(screen.getByTestId("b")).toHaveTextContent("Hi");
  });

  it("supports semantic variant tag", () => {
    render(
      <Block variant="section" data-testid="b">
        X
      </Block>
    );
    expect(screen.getByTestId("b").tagName.toLowerCase()).toBe("section");
  });
});


