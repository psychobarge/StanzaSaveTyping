import * as vscode from 'vscode';
import { AutoSaveService } from './services/AutoSaveService';

export function activate(context: vscode.ExtensionContext) {
    const autoSaveService = new AutoSaveService(async (document) => {
        const vscodeDoc = document as vscode.TextDocument;
        if (vscodeDoc.isDirty) {
            if (vscode.window.activeTextEditor?.document === vscodeDoc) {
                await vscode.commands.executeCommand('workbench.action.files.saveWithoutFormatting');
                return true;
            } else {
                return await vscodeDoc.save();
            }
        }
        return true;
    });

    const onDidChange = vscode.workspace.onDidChangeTextDocument((event) => {
        const config = vscode.workspace.getConfiguration('stanzaSaveTyping');
        const delay = config.get<number>('delay', 750);

        if (event.document.uri.scheme === 'file') {
            autoSaveService.handleDocumentChange(event.document, delay);
        }
    });

    const onDidClose = vscode.workspace.onDidCloseTextDocument((document) => {
        autoSaveService.handleDocumentClose(document);
    });

    context.subscriptions.push(onDidChange, onDidClose, { dispose: () => autoSaveService.dispose() });
}

export function deactivate() { }
