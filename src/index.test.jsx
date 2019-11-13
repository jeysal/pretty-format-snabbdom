// @flow
// @jsx html

import { h } from 'snabbdom';
import { html } from 'snabbdom-jsx'; // eslint-disable-line no-unused-vars
import serializer, { serialize } from '.';

// $FlowFixMe addSnapshotSerializer typings outdated, this does take an object literal
expect.addSnapshotSerializer(serializer);

test('serializes a simple node', () => {
  expect(h('div')).toMatchSnapshot();
});

test('ignores an empty node', () => {
  expect(h('')).toMatchSnapshot();
});

/*
  using selectors instead of tag names for h(selectorOrTagName)
  is not treated in a special way;
  the selector is rendered as a tag name.
  This is sufficient for snapshot testing and sometimes
  <div.cl#id />
  can even be more readable than
  <div className="cl" id="id" />
*/
test('renders a selector like a tag name', () => {
  expect(h('div.cl#id')).toMatchSnapshot();
});

test('serializes a simple JSX node', () => {
  expect(<div />).toMatchSnapshot();
});

test('serializes a JSX node and its props', () => {
  expect(
    <div
      id="id"
      className="cl"
      title="title"
      data-stuff="stuff"
      style="color: black;"
      onclick={() => true}
    />,
  ).toMatchSnapshot();
});

test('serializes a JSX node with children', () => {
  expect(
    <div>
      <div>
        <div>asdf</div>
      </div>
    </div>,
  ).toMatchSnapshot();
});

test('serializes weird text nodes', () => {
  expect(
    <div>
      {false}
      {42.1337}
      {() => true}
    </div>,
  ).toMatchSnapshot();
});

test('avoids overwriting data with data.props', () => {
  expect(h('div', { asdf: 42, props: { asdf: 1337 } })).toMatchSnapshot();
});

test('respects maxDepth', () => {
  // $FlowFixMe addSnapshotSerializer typings outdated, this does take an object literal
  expect.addSnapshotSerializer({
    ...serializer,
    serialize: (
      elem: any,
      config: Object,
      indentation: any,
      depth: any,
      refs: any,
      printer: any,
    ) =>
      serialize(
        elem,
        { ...config, maxDepth: 3 },
        indentation,
        depth,
        refs,
        printer,
      ),
  });

  expect(
    <div>
      <div>
        <div>
          <div>
            <div>asdf</div>
          </div>
        </div>
      </div>
    </div>,
  ).toMatchSnapshot();
});

test('does not interfere with serialization of other values', () => {
  expect(1).toMatchSnapshot();
  expect(true).toMatchSnapshot();
  expect('asdf').toMatchSnapshot();
  expect({}).toMatchSnapshot();
  expect({ a: 'a', b: 42 }).toMatchSnapshot();
  expect([1, 2, '3', '4']).toMatchSnapshot();
});

test('allows null and undefined children', () => {
  expect(h('div', [undefined])).toMatchSnapshot();
  expect(h('div', [null])).toMatchSnapshot();
});