import { render, screen } from "@tests/utils/test-utils";
import { Stack } from "@/components/ui/Stack";

describe("Stack", () => {
  it("renders children", () => {
    render(
      <Stack data-testid="s">
        <div>Child</div>
      </Stack>
    );
    expect(screen.getByTestId("s")).toBeInTheDocument();
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});


