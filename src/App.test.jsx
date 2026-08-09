import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { nodes, pathTo } from './data/site';

describe('App', () => {
  test('opens on the landscape with every destination reachable', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Shaurya/ })).toBeTruthy();
    for (const label of ['Workshop', 'Code', 'Field Notes', 'About']) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeTruthy();
    }
  });

  test('a landmark leads into its section', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Workshop/ }));

    // The landing view has to finish fading out before the section mounts.
    expect(await screen.findByText('5-Axis 3D Printer')).toBeTruthy();
    expect(await screen.findByText('Contacting the ISS')).toBeTruthy();
  });
});

describe('site graph', () => {
  test('every node is reachable from some graph level', () => {
    for (const id of Object.keys(nodes)) {
      expect(pathTo(id), `'${id}' is orphaned`).not.toBeNull();
    }
  });

  test('sections only list nodes that exist', () => {
    for (const [id, node] of Object.entries(nodes)) {
      if (node.kind !== 'section') continue;
      for (const item of node.items) {
        expect(nodes[item], `'${id}' links to missing '${item}'`).toBeTruthy();
      }
    }
  });

  test('projects point back at a real parent', () => {
    for (const [id, node] of Object.entries(nodes)) {
      if (node.kind !== 'project') continue;
      expect(nodes[node.parent], `'${id}' has no parent`).toBeTruthy();
    }
  });

  test('every media placeholder declares a kind and a note', () => {
    const slots = [];
    for (const node of Object.values(nodes)) {
      if (node.media) slots.push(node.media);
      if (node.hero) slots.push(node.hero);
      if (node.portrait) slots.push(node.portrait);
      for (const section of node.sections ?? []) {
        if (section.media) slots.push(section.media);
      }
    }

    expect(slots.length).toBeGreaterThan(10);
    for (const slot of slots) {
      expect(['photo', 'video', 'animation']).toContain(slot.kind);
      expect(slot.note?.length ?? 0).toBeGreaterThan(8);
    }
  });
});
