import { render, screen } from "@tests/utils/test-utils";
import { Icon } from "@/components/ui/Icon";

describe("Icon", () => {
  it("renders children", () => {
    render(
      <Icon data-testid="i">
        X
      </Icon>
    );
    expect(screen.getByTestId("i")).toHaveTextContent("X");
  });

  it("renders lucideIcon component", () => {
    const LucideIcon = (props: { className?: string }) => (
      <svg data-testid="svg" className={props.className} />
    );

    render(<Icon data-testid="i" lucideIcon={LucideIcon} />);
    expect(screen.getByTestId("i")).toBeInTheDocument();
    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });
});


