# Language support for `.binah` files

## Install

To get the extension running you need to build the `vsix` file and install it manually

```bash
$ npm install -g vsce
$ vsce package
$ code --install-extension binah-syntax-<version>.vsix
```

## Configuration

If [binah-lsp](https://github.com/binah-framework/binah-codegen) is in your path the extension should work without problems. Alternativelly, you can set `binah.executablePath` in your `settings.json` to set the path explicitly.
