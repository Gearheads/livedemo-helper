// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import {PYTHON, PYTHON_IF, GOLANG} from './constants';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const python = vscode.commands.registerCommand('extension.python', async () => {
		// The code you place here will be executed every time your command is executed
		try {
			createDemo("demo.py", PYTHON, "Python");
		} catch (e) {
			console.error(`Error: ${e}`);
		}
	});

	const golang = vscode.commands.registerCommand('extension.golang', async () => {
		try {
			createDemo("demo.go", GOLANG, "GoLang");
		} catch (e) {
			console.error(`Error: ${e}`);
		}
	});

	const pythonHelper = vscode.languages.registerCompletionItemProvider('python', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			const snippetCompletion = new vscode.CompletionItem('if/else');
			snippetCompletion.insertText = new vscode.SnippetString(PYTHON_IF);
			snippetCompletion.documentation = new vscode.MarkdownString("Inserts an if/else Python snippet.");

			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			const commandCompletion = new vscode.CompletionItem('new');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'new ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

			// return all completion items as array
			return [
				snippetCompletion,
				commandCompletion
			];
		}
	});

	// Register functions
	context.subscriptions.push(python, golang, pythonHelper);
}

const createDemo = (fileName: string, fileContents: string, program: string) => {
	if(vscode.workspace.workspaceFolders) {
		const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
		fs.writeFile(path.join(folderPath, fileName), fileContents, err => {
			if(err) {
				console.error(err);
				return vscode.window.showErrorMessage(`Failed to create ${program} demo file`);
			}
			// Display a message box to the user
			vscode.window.showInformationMessage(`Created ${program} Demo file! Happy coding :).`);
		});
	} else {
		vscode.window.showErrorMessage('Please open an existing folder');
	}
};

// this method is called when your extension is deactivated
export function deactivate() {}
