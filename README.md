# Language support for `.storm` files

## Install

To get the extension running you need to build the `vsix` file and install it manually

```bash
$ npm install -g vsce
$ vsce package
$ code --install-extension storm-vscode-<version>.vsix
```

## Configuration

If [storm-lsp](https://github.com/storm-framework/storm-codegen) is in your path the extension should work without problems. Alternativelly, you can set `storm.executablePath` in your `settings.json` to set the path explicitly.
