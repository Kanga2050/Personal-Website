import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { nodes, pathTo } from './data/site';

describe('App', () => {
  test('opens on the entry page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Universe' })).toBeTruthy();
    expect(screen.getByRole('button', { name: /enter/i })).toBeTruthy();
  });

  test('entering reveals the hub destinations', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /enter/i }));

    // The entry page has to finish exiting before the hub mounts.
    for (const title of ['Engineering', 'Projects', 'Memories']) {
      expect(await screen.findByText(title)).toBeTruthy();
    }
  });
});

describe('site graph', () => {
  test('every node is reachable from some graph level', () => {
    for (const id of Object.keys(nodes)) {
      expect(pathTo(id), `'${id}' is orphaned`).not.toBeNull();
    }
  });

  test('collections only list nodes that exist', () => {
    for (const [id, node] of Object.entries(nodes)) {
      if (node.kind !== 'collection') continue;
      for (const item of node.items) {
        expect(nodes[item], `'${id}' links to missing '${item}'`).toBeTruthy();
      }
    }
  });

  test('detail pages point back at a real parent', () => {
    for (const [id, node] of Object.entries(nodes)) {
      if (node.kind !== 'detail') continue;
      expect(nodes[node.parent], `'${id}' has no parent`).toBeTruthy();
    }
  });
});
