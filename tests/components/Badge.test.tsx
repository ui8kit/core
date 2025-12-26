import { render, screen } from "@tests/utils/test-utils";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Hi</Badge>);
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("applies variant props", () => {
    render(
      <Badge
        data-testid="badge"
        variant="secondary"
        size="lg"
        rounded="md"
        border="default"
        borderTop="default"
        borderBottom="default"
      >
        X
      </Badge>
    );
    const el = screen.getByTestId("badge");
    expect(el.className).toContain("inline-flex");
  });
});


