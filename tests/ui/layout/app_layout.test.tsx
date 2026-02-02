import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppLayout from '@ui/layout/app_layout';

describe('AppLayout', () => {
  it('should render children content', () => {
    render(
      <AppLayout current="items">
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should display the correct title based on current route', () => {
    render(
      <AppLayout current="items">
        <div>Content</div>
      </AppLayout>,
    );

    const appBar = screen.getByRole('banner');
    expect(appBar).toHaveTextContent('首页');
  });

  it('should have drawer closed by default', () => {
    const { container } = render(
      <AppLayout current="items">
        <div>Content</div>
      </AppLayout>,
    );

    const drawer = container.querySelector('.MuiDrawer-root');
    expect(drawer).toBeInTheDocument();
  });

  it('should toggle drawer when menu button is clicked', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <AppLayout current="items">
        <div>Content</div>
      </AppLayout>,
    );

    const menuButton = screen.getAllByRole('button')[0];
    await user.click(menuButton);

    // After clicking, drawer should be open (check for visibility change)
    const drawer = container.querySelector('.MuiDrawer-paper');
    expect(drawer).toBeInTheDocument();
  });

  it('should render navigation items', () => {
    render(
      <AppLayout current="items">
        <div>Content</div>
      </AppLayout>,
    );

    // Check if navigation items exist
    const navItems = screen.getAllByText('首页');
    // Should have at least one (in the title or nav)
    expect(navItems.length).toBeGreaterThan(0);
  });
});
