import {getFileContent, writeInFile, TagName} from './helpers';
import {SwaggerDocument} from './swagger/swagger-document';
import {renderToString} from './swagger/renderer';
import {catalogPath, catalogDetailPath} from './paths/catalog';
import {dataClassPaths} from './paths/dataclass';
import {entityPaths} from './paths/entity';
import {collectionPaths} from './paths/collection';
import {collectionDefinition} from './definitions/collection';
import {entityDefinition} from './definitions/entity';
import {catalogDefinition, catalogDetailDefinition} from './definitions/catalog';

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
    document.tags.push(
      TagName.DataClass,
      TagName.Entity,
      TagName.Collection,
      TagName.DataClassMethod,
      TagName.EntityMethod,
      TagName.CollectionMethod,
      TagName.Directory,
      TagName.Catalog
    );

    return {document, model: modelObject};
  })
  .then(({document, model}) => {

    document.definitions['Catalog'] = catalogDefinition;
    document.definitions['CatalogDetail'] = catalogDetailDefinition;

    document.paths.push(catalogPath, catalogDetailPath);

    model.dataClasses.forEach(dataClass => {

      //Add definition for both entity and collection of each DataClasses
      document.definitions[dataClass.name + 'Entity'] = entityDefinition(dataClass);
      document.definitions[dataClass.name + 'Collection'] = collectionDefinition(dataClass);

      //Generate paths for dataClass, entity, etc operations
      document.paths.push(...dataClassPaths(dataClass));
      document.paths.push(...entityPaths(dataClass));
      document.paths.push(...collectionPaths(dataClass));
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
