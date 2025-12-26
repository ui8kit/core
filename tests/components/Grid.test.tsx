import { render, screen } from '@tests/utils/test-utils';
import { Grid } from '@/components/Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid data-testid="grid">
        <div>Child</div>
      </Grid>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('applies grid classes', () => {
    render(
      <Grid cols={3} gap="md" data-testid="grid">
        X
      </Grid>
    );
    const el = screen.getByTestId('grid');
    expect(el.className).toContain('grid');
    expect(el.className).toContain('grid-cols-3');
    expect(el.className).toContain('gap-4');
  });

  it('renders Grid.Col with span/start/end/order', () => {
    render(
      <Grid data-testid="grid">
        <Grid.Col span={2} start={3} end={5} order={1} data-testid="col">
          Item
        </Grid.Col>
      </Grid>
    );
    const col = screen.getByTestId('col');
    expect(col.className).toContain('col-span-2');
    expect(col.className).toContain('col-start-3');
    expect(col.className).toContain('col-end-5');
    expect(col.className).toContain('order-1');
  });
});


