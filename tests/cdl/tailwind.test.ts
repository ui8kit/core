import { compileCdlToTailwind } from "@/cdl";

describe("CDL → Tailwind compiler", () => {
  it("applies base + selected variants + defaults", () => {
    const out = compileCdlToTailwind(
      {
        base: ["inline-flex"],
        variants: {
          size: {
            sm: ["h-8"],
            md: ["h-10"],
          },
          variant: {
            primary: ["bg-primary", "text-primary-foreground"],
            secondary: ["bg-secondary", "text-secondary-foreground"],
          },
        },
        defaultVariants: {
          size: "md",
          variant: "primary",
        },
      },
      {
        size: "sm",
      }
    );

    expect(out).toBe("inline-flex h-8 bg-primary text-primary-foreground");
  });

  it("throws on unknown option in strict mode", () => {
    expect(() =>
      compileCdlToTailwind(
        {
          variants: { size: { sm: ["h-8"] } },
          defaultVariants: { size: "sm" },
        },
        { size: "xxl" }
      )
    ).toThrow(/Unknown variant option/);
  });
});


