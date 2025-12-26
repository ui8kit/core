import { render, screen } from "@tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/Accordion";

describe("Accordion", () => {
  it("toggles item in uncontrolled single mode when collapsible=true", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="single" collapsible defaultValue="">
        <AccordionItem value="a">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent data-testid="content">Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const content = screen.getByTestId("content");
    expect(content.getAttribute("data-state")).toBe("closed");

    await user.click(screen.getByRole("button", { name: /title/i }));
    expect(content.getAttribute("data-state")).toBe("open");

    await user.click(screen.getByRole("button", { name: /title/i }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });
});


