import {getFileContent, writeInFile} from './helpers';
import {SwaggerDocument} from './swagger/swagger-document';
import {renderToString} from './swagger/renderer';
import {catalogPath} from './paths/catalog';
import {dataClassPaths} from './paths/dataclass';
import {collectionDefinition} from './definitions/collection';
import {entityDefinition} from './definitions/entity';
import {entityPaths} from './paths/entity';

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

    return {document, model: modelObject};
  })
  .then(({document, model}) => {
    document.paths.push(catalogPath);
    return {document, model};
  })
  .then(({document, model}) => {

    model.dataClasses.forEach(dataClass => {

      //Add definition for both entity and collection of each DataClasses
      document.definitions[dataClass.name + 'Entity'] = entityDefinition(dataClass);
      document.definitions[dataClass.name + 'Collection'] = collectionDefinition(dataClass);

      //Generate paths for dataClass, entity, etc operations
      document.paths.push(...dataClassPaths(dataClass));
      document.paths.push(...entityPaths(dataClass));
    });

    return {document, model};
  })
  .then(({document}) => {
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
  dataClasses: IWakandaDataClass[];
  type: any[];
};

export interface IWakandaDataClass {
  name: string;
  className: string;
  collectionName: string;
  scope: string;
  attributes: {
    name: string;
    kind: 'storage'|'calculated'|'relatedEntity'|'relatedEntities'|'alias';
    scope: string;
    type: string;
  }[];
  methods: IWakandaMethod[];
}

export interface IWakandaMethod {
  name: string;
  applyTo: string;
  scope: string;
  from: string;
  userDefined: boolean;
}
