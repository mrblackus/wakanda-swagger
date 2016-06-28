import {IWakandaDataClass} from '../';

export function entityDefinition(dataClass: IWakandaDataClass): Object {
  const obj = {
    type: 'object',
    properties: {}
  };

  dataClass.attributes.forEach(attribute => {

    let attributeSignature;

    if (attribute.kind === 'storage' || attribute.kind === 'calculated' || attribute.kind === 'alias') {
      attributeSignature = {
        type: wakandaToSwaggerType(attribute.type)
      };
    }
    else if (attribute.kind === 'relatedEntity') {
      attributeSignature = {
        '$ref': `#/definitions/${attribute.type}Entity`
      };
    }
    else if (attribute.kind === 'relatedEntities') {
      attributeSignature = {
        type: 'array',
        items: {
          '$ref': `#/definitions/${attribute.type}`
        }
      };
    }
    else {
      console.warn(`Unhandle attribute kind "${attribute.kind}" for attribute "${attribute.name}" on dataClass ${dataClass.name}. Casted to object.`);
      attributeSignature = {
        type: 'object'
      };
    }

    obj.properties[attribute.name] = attributeSignature;
  });

  return obj;
}

function wakandaToSwaggerType(type: string) {

  switch(type) {
    case 'long':
    case 'number':
    case 'short':
      return 'number';
    case 'string':
    case 'date':
      return 'string';
    case 'bool':
      return 'boolean';
    default:
      console.warn(`Unhandled Wakanda "${type}" type. Casted to object.`);
      return 'object';
  }
}