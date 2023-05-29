// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import AudioPlayer from './audioPlayer';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const audioPlayer = new AudioPlayer();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'visual-studio-code-soundboard.enable',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        'You activated visual-studio-code-soundboard!'
      );

      vscode.workspace.onDidChangeTextDocument((e) => {
        const diagnostics = vscode.languages.getDiagnostics(e.document.uri);

        // Check if the document has a supported language
        if (
          !vscode.languages.match(
            { language: e.document.languageId },
            e.document
          )
        ) {
          vscode.window.showErrorMessage('Unsupported file language.');

          return;
        }

        if (diagnostics.length > 0) {
          audioPlayer.playRandomSound();
        }
      });

      audioPlayer.playSpecificAudio('vibez-lets-go-1.mp3');
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
