# vrouter-moudle-plugin

This plugin is based on vue and splits its router to achieve on-demand packaged runs

> Used to indirectly deal with the problem of slow webpack hot updates when there are too many routes

## Getting Started

To begin, you'll need to install `vrouter-moudle-plugin`:

```console
npm install vrouter-moudle-plugin --save-dev
```

or

```console
yarn add -D vrouter-moudle-plugin
```

or

```console
pnpm add -D vrouter-moudle-plugin
```

## Must
We need the following structure for the project directory

```
-- product name (Your project folder)
  -- src
    -- entry
      -- entry name (A page entry folder)
        -- router
          -- index.js (The route file for this entry)
    -- modules
      -- module.json (Module usage configuration)
      -- module name (A module folder)
        -- router.js (The module's route entry file)
```


## Options

### `root`

- Type:

```ts
type root = string;
```

- For Exmaple
```javascript
const path = require('path');
const VrouteModulePlugin = require('vrouter-module-plugin')
// ....
plugins: [
  new VrouteModulePlugin({
    root: path.resolve('./src')
  })
]
// ....
```
Used to determine the root of this plugin.
