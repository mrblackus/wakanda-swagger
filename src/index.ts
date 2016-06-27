import {getFileContent, writeInFile} from './helpers';
import {SwaggerDocument} from './swagger/swagger-document';
import {renderToString} from './swagger/renderer';
import {catalogPath} from './paths/catalog';

const filePath = process.argv[2] || undefined;

getFileContent(filePath)
  .then(content => {
    return JSON.parse(content) as IWakandaModel;
  })
  .then(modelObject => {
    // console.log(modelObject);

    const document = new SwaggerDocument();
    document.info = {
      title: 'Wakanda REST API',
      description: '',
      version: '1.0.0'
    };
    document.host = '127.0.0.1:8081';
    document.basePath = '/v1';
    document.schemes = ['http'];

    return document;
  })
  .then(document => {
    document.paths.push(catalogPath);

    return document;
  })
  .then(document => {
    const output = renderToString(document);
    console.log(output);
    return writeInFile('output.json', output);
  })
  .catch(e => {
    console.error(`Error: ${e}`);
  });

export interface IWakandaModel {
  toJSON: boolean;
  extraProperties: any;
  dataClasses: {
    name: string;
    className: string;
    collectionName: string;
    scope: string;
    attributes: {
      name: string;
      kind: 'storage'|'calculated'|'relatedEntity'|'relatedEntities';
      scope: string;
      type: string;
    }[];
    methods: {
      name: string;
      applyTo: string;
      scope: string;
      from: string;
      userDefined: boolean;
    }[];

  }[];
  type: any[];
};