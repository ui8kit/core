import { render, screen } from '@tests/utils/test-utils';
import { Container } from '@/components/ui/Container';

describe('Container', () => {
  it('renders children and sets data marker', () => {
    render(<Container>Content</Container>);
    const el = screen.getByText('Content');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('data-class', 'container');
  });

  it('renders with a custom element type via component prop', () => {
    render(<Container component="section">Section</Container>);
    const el = screen.getByText('Section');
    expect(el.tagName).toBe('SECTION');
  });

  it('applies size when not fluid', () => {
    render(
      <Container size="sm" centered data-testid="c">
        X
      </Container>
    );
    const el = screen.getByTestId('c');
    expect(el).toHaveClass('max-w-screen-md');
    expect(el).toHaveClass('mx-auto');
  });

  it('applies max-w-none when fluid (and overrides size)', () => {
    render(
      <Container size="sm" centered fluid data-testid="c">
        X
      </Container>
    );
    const el = screen.getByTestId('c');
    expect(el).toHaveClass('mx-auto');
    expect(el).toHaveClass('max-w-none');
    expect(el).not.toHaveClass('max-w-screen-md');
  });

  it('merges custom className', () => {
    render(
      <Container className="custom" data-testid="c">
        Y
      </Container>
    );
    expect(screen.getByTestId('c')).toHaveClass('custom');
  });
});


