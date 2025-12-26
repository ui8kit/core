import { render, screen } from "@tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Sheet } from "@/components/Sheet";

describe("Sheet", () => {
  it("toggles input checkbox via trigger label", async () => {
    const user = userEvent.setup();

    render(
      <Sheet id="s1" openLabel="Open sheet">
        <div>Body</div>
      </Sheet>
    );

    const input = document.getElementById("s1") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.checked).toBe(false);

    await user.click(screen.getByLabelText("Open sheet"));
    expect(input.checked).toBe(true);
  });
});


