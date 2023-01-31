import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import VirtualizedDocument from '../components/custom/Document/VirtualizedDocument';
import { allDocuments } from '../utils/allDocuments';

const docData = allDocuments['document1'];

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('VirtualizedDocument', () => {
  it('renders VirtualizedDocument', async () => {
    const route = '/doc/document1';
    render(
      <MemoryRouter initialEntries={[route]}>
        <VirtualizedDocument docData={docData} estimatedSize={100} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const document1Text = screen.getAllByText(/agreement/);
      expect(document1Text.length).toBeGreaterThan(0);
    });
  });

  it('renders VirtualizedDocument with premappedcss', async () => {
    const route = '/doc/document1?premapclasses=true';
    render(
      <MemoryRouter initialEntries={[route]}>
        <VirtualizedDocument docData={docData} estimatedSize={100} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const document1Text = screen.getAllByText(/agreement/);
      expect(document1Text.length).toBeGreaterThan(0);
    });
  });
});
