/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from "path";
import { workspace, ExtensionContext, window } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  Executable,
} from "vscode-languageclient";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const settings = workspace.getConfiguration("binah");
  let path: string = settings.get("executablePath") || "binah-lsp";
  if (!path.trim()) {
    path = "binah-lsp";
  }
  const exec: Executable = {
    command: path,
  };

  let serverOptions: ServerOptions = {
    run: exec,
    debug: exec,
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "binah" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.binah"),
    },
  };

  client = new LanguageClient(
    "binah-lsp",
    "Binah Language Server",
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
