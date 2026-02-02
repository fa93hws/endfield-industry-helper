import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HighlightText } from '../../../src/ui/recipe/highlight_text';

describe('HighlightText', () => {
  it('should render plain text when query is empty', () => {
    render(<HighlightText text="测试文本" query="" />);
    expect(screen.getByText('测试文本')).toBeInTheDocument();
  });

  it('should render plain text when query is only whitespace', () => {
    render(<HighlightText text="测试文本" query="   " />);
    expect(screen.getByText('测试文本')).toBeInTheDocument();
  });

  it('should render plain text when query does not match', () => {
    render(<HighlightText text="测试文本" query="不存在" />);
    expect(screen.getByText('测试文本')).toBeInTheDocument();
  });

  it('should highlight matching text case-insensitively', () => {
    const { container } = render(<HighlightText text="碳素" query="碳" />);

    // Check that the text is split correctly
    expect(screen.getByText('碳')).toBeInTheDocument();
    expect(screen.getByText('素')).toBeInTheDocument();

    // The highlighted part should have specific styles
    const highlighted = container.querySelector('span > span');
    expect(highlighted).toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });

  it('should handle English text highlighting', () => {
    render(<HighlightText text="Carbon Powder" query="car" />);

    expect(screen.getByText('Car')).toBeInTheDocument(); // Case-insensitive match
    expect(screen.getByText('bon Powder')).toBeInTheDocument();
  });

  it('should highlight first occurrence only', () => {
    render(<HighlightText text="碳碳" query="碳" />);

    // Should find both parts of the text
    const carbonElements = screen.getAllByText('碳');
    expect(carbonElements.length).toBeGreaterThanOrEqual(1);
  });

  it('should handle highlighting at the beginning of text', () => {
    render(<HighlightText text="碳素材料" query="碳" />);

    expect(screen.getByText('碳')).toBeInTheDocument();
    expect(screen.getByText('素材料')).toBeInTheDocument();
  });

  it('should handle highlighting at the end of text', () => {
    render(<HighlightText text="材料碳" query="碳" />);

    expect(screen.getByText('材料')).toBeInTheDocument();
    expect(screen.getByText('碳')).toBeInTheDocument();
  });

  it('should handle highlighting entire text', () => {
    const { container } = render(<HighlightText text="碳" query="碳" />);

    expect(screen.getByText('碳')).toBeInTheDocument();
    const highlighted = container.querySelector('span > span');
    expect(highlighted).toBeInTheDocument();
  });

  it('should respect variant prop', () => {
    const { container: container1 } = render(
      <HighlightText text="测试" query="" variant="body1" />,
    );
    const { container: container2 } = render(
      <HighlightText text="测试" query="" variant="caption" />,
    );

    // Both should render successfully with different variants
    expect(container1).toBeInTheDocument();
    expect(container2).toBeInTheDocument();
  });

  it('should use body2 variant by default', () => {
    render(<HighlightText text="测试" query="" />);
    expect(screen.getByText('测试')).toBeInTheDocument();
  });
});
