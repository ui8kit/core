import { render, screen } from '@tests/utils/test-utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@ui8kit/core';

describe('Card', () => {
  it('renders a basic card', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-class', 'card');
  });

  it('renders card with subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('custom-card');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Ref test</Card>);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through other props', () => {
    render(<Card data-testid="test-card">Test</Card>);
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
  });

  it('applies expected default styling tokens', () => {
    render(<Card>Defaults</Card>);
    const card = screen.getByText('Defaults');
    // Default props in the component: p defaults to md (p-4), rounded lg, shadow sm, bg card, border 1px.
    expect(card).toHaveClass('p-4', 'rounded-lg', 'shadow-sm', 'bg-card', 'border');
  });
});

describe('CardHeader', () => {
  it('renders with default styling', () => {
    render(<CardHeader>Header content</CardHeader>);
    const header = screen.getByText('Header content');
    expect(header).toHaveAttribute('data-class', 'card-header');
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-4');
  });
});

describe('CardTitle', () => {
  it('renders with title styling', () => {
    render(<CardTitle>Title text</CardTitle>);
    const title = screen.getByText('Title text');
    expect(title).toHaveAttribute('data-class', 'card-title');
    expect(title).toHaveClass('font-semibold', 'tracking-tight');
  });
});

describe('CardDescription', () => {
  it('renders with description styling', () => {
    render(<CardDescription>Description text</CardDescription>);
    const description = screen.getByText('Description text');
    expect(description).toHaveAttribute('data-class', 'card-description');
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });
});

describe('CardContent', () => {
  it('renders with content styling', () => {
    render(<CardContent>Content text</CardContent>);
    const content = screen.getByText('Content text');
    expect(content).toHaveAttribute('data-class', 'card-content');
    expect(content).toHaveClass('pt-0', 'p-4');
  });
});

describe('CardFooter', () => {
  it('renders with footer styling', () => {
    render(<CardFooter>Footer content</CardFooter>);
    const footer = screen.getByText('Footer content');
    expect(footer).toHaveAttribute('data-class', 'card-footer');
    // Note: CardFooter currently applies p-4 which (via twMerge) overrides pt-0.
    expect(footer).toHaveClass('flex', 'items-center', 'p-4');
  });
});
