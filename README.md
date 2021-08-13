# Open in GitHub

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-open-in-github/master/resources/logo.png" width="128" alt="Logo">
</p>

Open the current project or file in github.com.

There are many other extensions for doing this, but they either don't work well for me or they provide too few/many functionalities.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-open-in-github), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-open-in-github
```

## Usage

It adds 12 commands to the command palette:

```js
'Open in GitHub: Project' // Open the current project in GitHub
'Open in GitHub: File' // Open the current file in GitHub
'Open in GitHub: File History' // Open the current file's history in GitHub
'Open in GitHub: File Blame' // Open the current file's blame in GitHub
'Open in GitHub: Copy File Link' // Copy a link to the current file on GitHub
'Open in GitHub: File On Master' // Open the current file on master in GitHub
'Open in GitHub: File History On Master' // Open the current file's history on master in GitHub
'Open in GitHub: File Blame On Master' // Open the current file's blame on master in GitHub
'Open in GitHub: Copy File Link On Master' // Copy a link to the current file on master on GitHub
```

## Settings

```js
{
  "openInGitHub.github.domain": "github.com", // Custom GitHub domain
  "openInGitHub.remote.name": "origin", // Name of the remote repository
  "openInGitHub.remote.branch": "master" // Name of the remote branch
}
```

## Demo

### Opening the project

![Project](resources/demo/project.gif)

### Opening the file

![File](resources/demo/file.gif)

## Contributing

If you found a problem, or have a feature request, please open an [issue](https://github.com/fabiospampinato/vscode-open-in-github/issues) about it.

If you want to make a pull request you can debug the extension using [Debug Launcher](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-debug-launcher).

## License

MIT © Fabio Spampinato
