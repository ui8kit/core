import { render, screen } from '@tests/utils/test-utils';
import { Group } from '@/components/ui/Group';

describe('Group', () => {
  it('renders children and sets data marker', () => {
    render(
      <Group>
        <span>Child</span>
      </Group>
    );
    const child = screen.getByText('Child');
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveAttribute('data-class', 'group');
  });

  it('renders with a custom element type via component prop', () => {
    render(
      <Group component="ul">
        <li>Item</li>
      </Group>
    );
    const item = screen.getByText('Item');
    expect(item.parentElement?.tagName).toBe('UL');
  });

  it('applies grow and overflow flags', () => {
    render(
      <Group grow preventGrowOverflow data-testid="g">
        A
      </Group>
    );
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('flex-1');
    expect(el).toHaveClass('min-w-0');
  });

  it('does not apply overflow flag when disabled', () => {
    render(
      <Group preventGrowOverflow={false} data-testid="g">
        B
      </Group>
    );
    const el = screen.getByTestId('g');
    expect(el).not.toHaveClass('min-w-0');
  });
});


