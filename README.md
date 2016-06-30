# Wakanda-Swagger

Wakanda-Swagger allows you to generate a complete Swagger document (JSON
format) to describe your API with Swagger specification.

It will dynamically generate paths and endpoints according to your actual
data model (dataClasses, their attributes and methods).

## Build and run

Clone the package then install dependencies and build

```bash
npm install && npm start build
```

Then, run the application providing a `.waModel` file as parameter.

```bash
npm start -- path/to/model.waModel
```

Swagger file will be written in `output.json` file.

## Run example

An example `.waModel` file is provided on the `example` directory. You
test it with the following command.

```bash
npm run example
```

## Develop

To develop the project, launch on watch mode, so that TypeScript transpilation
is automatically launched on file change.

```bash
npm run watch
```

Feel free to open issue or pull request for any question and suggestion.

## License

MIT
