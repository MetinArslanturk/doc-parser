import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import DocumentParagraph from '../components/custom/Document/DocumentParagraph';
import { allDocuments } from '../utils/allDocuments';

const docData = allDocuments['document1'];

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const setPopoverMock = vi.fn();

const definitionPopoverSpecs = {
  definitionPopover: undefined,
  setDefinitionPopover: setPopoverMock,
  popoverYPosition: 10,
  setPopoverYPosition: vi.fn(),
  definitionPopoverRef: { current: null },
};

describe('DocumentParagraph', () => {
  it('renders DocumentParagraph', async () => {
    const route = '/doc/document1';
    const mockFn = vi.fn();
    render(
      <MemoryRouter initialEntries={[route]}>
        <DocumentParagraph
          docData={docData}
          paragraphIndex={0}
          definitionPopoverSpecs={definitionPopoverSpecs}
          virtualizer={{ scrollToIndex: mockFn, measureElement: () => undefined } as any}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const document1Text = screen.getByText(/MODEL/);
      expect(document1Text).toBeInTheDocument();
    });
  });

  it('renders DocumentParagraph and click definition', async () => {
    const route = '/doc/document1';
    const mockFn = vi.fn();
    render(
      <MemoryRouter initialEntries={[route]}>
        <DocumentParagraph
          docData={docData}
          paragraphIndex={3}
          definitionPopoverSpecs={definitionPopoverSpecs}
          virtualizer={{ scrollToIndex: mockFn, measureElement: () => undefined } as any}
        />
      </MemoryRouter>,
    );

    let tooltipText;
    await waitFor(() => {
      tooltipText = screen.getByText(/Sections 145/);
      expect(tooltipText).toBeInTheDocument();
    });

    fireEvent.click(tooltipText as any);

    await waitFor(() => {
      expect(setPopoverMock).toBeCalled();
    });
  });

  it('renders DocumentParagraph and click definition', async () => {
    const route = '/doc/document1';
    const mockFn = vi.fn();
    render(
      <MemoryRouter initialEntries={[route]}>
        <DocumentParagraph
          docData={docData}
          paragraphIndex={3}
          definitionPopoverSpecs={{
            ...definitionPopoverSpecs,
            definitionPopover: {
              pIndex: 3,
              tokenIndex: 0,
              definitionPayload: { name: 'aa', aliasTo: '', value: { startIndex: 1, endIndex: 4 } },
            },
          }}
          virtualizer={{ scrollToIndex: mockFn, measureElement: () => undefined } as any}
        />
      </MemoryRouter>,
    );

    let popover;
    await waitFor(() => {
      popover = screen.getByTestId('popover');
      expect(popover).toBeInTheDocument();
    });

    fireEvent.click(popover as any);

    await waitFor(() => {
      popover = screen.getByTestId('popover');
      expect(setPopoverMock).toBeCalledWith(undefined);
    });
  });
});
