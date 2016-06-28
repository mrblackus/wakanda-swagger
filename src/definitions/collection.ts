import {IWakandaDataClass} from '../';

export function collectionDefinition(dataClass: IWakandaDataClass): Object {
  return {
    type: 'object',
    properties: {
      __COUNT: {
        type: 'number',
        description: 'Number of entities in the collection'
      },
      __FIRST: {
        type: 'number',
        description: 'Number of entities skipped'
      },
      __SENT: {
        type: 'number',
        description: 'Number of entities in the current collection page'
      },
      __ENTITIES: {
        type: 'array',
        items: {
          '$ref': `#/definitions/${dataClass.name}Entity`
        }
      }
    }
  };
}