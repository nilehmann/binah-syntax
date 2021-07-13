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
  const settings = workspace.getConfiguration("storm");
  let path: string = settings.get("executablePath") || "storm-lsp";
  if (!path.trim()) {
    path = "storm-lsp";
  }
  const exec: Executable = {
    command: path,
  };

  let serverOptions: ServerOptions = {
    run: exec,
    debug: exec,
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "storm" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.storm"),
    },
  };

  client = new LanguageClient(
    "storm-lsp",
    "Storm Language Server",
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
