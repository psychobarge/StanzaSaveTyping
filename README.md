# StanzaSaveTyping

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Psychobarge.stanza-save-typing)](https://marketplace.visualstudio.com/items?itemName=Psychobarge.stanza-save-typing)
[![Build Status](https://github.com/psychobarge/StanzaSaveTyping/actions/workflows/tests.yml/badge.svg)](https://github.com/psychobarge/StanzaSaveTyping/actions/workflows/tests.yml)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Changelog](https://img.shields.io/badge/Changelog-blue)](CHANGELOG.md)

VS Code / Cursor extension that automatically saves your files after a specified delay when you stop typing. This improves your workflow by keeping your files up to date seamlessly without manual saves, and helps prevent data loss.

## Disclaimer

This extension was developed with the assistance of an AI coding tool. That said, it was **not** vibe-coded — every feature, design decision, and line of code was deliberately thought through and reviewed by a human developer.

## Features

- **Automatic Saving** — Saves the active document automatically after you finish typing.
- **Customizable Delay** — Choose exactly how long the extension should wait after your last keystroke before saving the file.

## Requirements
Any IDE based on VS Code:
- [VS Code](https://code.visualstudio.com/) 
- [Cursor](https://cursor.sh/)
- [Antigravity](https://antigravity.google/) 
- [Windsurf](https://windsurf.com/editor)
- [Trae](https://www.trae.ai/)
- Others not tested but it should work on all VS Code based IDEs

## Installation

### From the marketplace

1. Open VS Code or Cursor.
2. Go to **Extensions** (Ctrl+Shift+X / Cmd+Shift+X).
3. Search for **StanzaSaveTyping**.
4. Click **Install**.

### Via VSIX if you cannot see the extension

If the extension does not appear in the marketplace, install it from a VSIX file:

1. **Generate the VSIX** (from the project root):
   ```bash
   npm install
   npm run compile
   npx vsce package
   ```
   This creates a file like `stanza-save-typing-0.0.1.vsix`.

2. **Install the VSIX** :
   - Open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P).
   - Run **Extensions: Install from VSIX...**.
   - Select the generated `.vsix` file.

## Configuration

| Setting                          | Type     | Default | Description                                                                 |
|----------------------------------|----------|---------|-----------------------------------------------------------------------------|
| `stanzaSaveTyping.delay`          | number   | `750`   | The delay in milliseconds after the last keystroke before saving the file.  |

## Development

```bash
# Clone the repository
git clone https://github.com/psychobarge/StanzaSaveTyping.git
cd StanzaSaveTyping

# Install dependencies
npm install

# Compile
npm run compile   # or npm run watch for watch mode

# Run tests
npm test          # or npm run test:watch for watch mode
```

To test the extension visually, press **F5** in VS Code / Cursor to launch the Extension Development Host.

## License

MIT © [psychobarge](https://github.com/psychobarge)
