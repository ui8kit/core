import { render, screen } from "@tests/utils/test-utils";
import { Box } from "@/components/ui/Box";

describe("Box", () => {
  it("renders children", () => {
    render(
      <Box data-testid="box">
        <span>Hi</span>
      </Box>
    );
    expect(screen.getByTestId("box")).toBeInTheDocument();
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("supports component prop", () => {
    render(
      <Box component="section" data-testid="box">
        X
      </Box>
    );
    expect(screen.getByTestId("box").tagName.toLowerCase()).toBe("section");
  });
});


