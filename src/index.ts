import {getFileContent} from './helpers';

const filePath = process.argv[2] || undefined;

getFileContent(filePath)
  .then(content => {
    return JSON.parse(content) as IWakandaModel;
  })
  .then(modelObject => {
    console.log(modelObject);
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
      kind: 'storeage'|'calculated'|'relatedEntity'|'relatedEntities';
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
