# pretty-format-snabbdom

[![Greenkeeper badge](https://badges.greenkeeper.io/jeysal/pretty-format-snabbdom.svg)](https://greenkeeper.io/)

> [pretty-format](https://github.com/facebook/jest/tree/master/packages/pretty-format)
([Jest](https://facebook.github.io/jest/) snapshot) plugin for
[snabbdom](https://github.com/snabbdom/snabbdom) VNodes

[![build status](https://img.shields.io/travis/jeysal/pretty-format-snabbdom/master.svg?style=flat-square)](https://travis-ci.org/jeysal/pretty-format-snabbdom)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/jeysal/pretty-format-snabbdom/master.svg?style=flat-square&label=windows+build)](https://ci.appveyor.com/project/jeysal/pretty-format-snabbdom)
[![code coverage](https://img.shields.io/codecov/c/github/jeysal/pretty-format-snabbdom/master.svg?style=flat-square)](https://codecov.io/gh/jeysal/pretty-format-snabbdom)

[![npm package](https://img.shields.io/npm/v/pretty-format-snabbdom.svg?style=flat-square)](https://www.npmjs.com/package/pretty-format-snabbdom)
[![license](https://img.shields.io/github/license/jeysal/pretty-format-snabbdom.svg?style=flat-square)](https://github.com/jeysal/pretty-format-snabbdom/blob/master/LICENSE)

[Jest](https://facebook.github.io/jest/) snapshots have greatly simplified
testing the VDOM output of React components.
If your application is based on the [snabbdom](https://github.com/snabbdom/snabbdom)
virtual DOM implementation (like e.g. [Cycle.js](https://github.com/cyclejs/cyclejs) apps),
you were previously out of luck, because snapshotting snabbdom VNodes
would result in huge object descriptions that were hard to read.

**pretty-format-snabbdom** makes Jest snapshots of snabbdom VNodes look
just as pretty as those of React elements,
using [pretty-format](https://github.com/facebook/jest/tree/master/packages/pretty-format)s plugin system.

## Usage

```bash
npm install --save-dev pretty-format-snabbdom
```

[Register](https://facebook.github.io/jest/docs/en/configuration.html#snapshotserializers-array-string) in your `.jestrc`:
```json
{
  "snapshotSerializers": ["pretty-format-snabbdom"]
}
```

or [right in your test files](https://facebook.github.io/jest/docs/en/expect.html#expectaddsnapshotserializerserializer):
```javascript
import prettyFormatSnabbdom from 'pretty-format-snabbdom';
expect.addSnapshotSerializer(prettyFormatSnabbdom);
```

### Before

```
Object {
  "children": Array [],
  "data": Object {
    "data": Object {
      "stuff": "stuff",
    },
    "ns": undefined,
    "props": Object {
      "className": "cl",
      "id": "id",
      "onclick": [Function],
      "title": "title",
    },
    "style": "color: black;",
  },
  "key": undefined,
  "sel": "div",
}
```

### After

```
<div
  style="color: black;"
  data={
    Object {
      "stuff": "stuff",
    }
  }
  id="id"
  className="cl"
  title="title"
  onclick={[Function]}
/>
```
