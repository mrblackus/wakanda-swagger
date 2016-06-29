import {IWakandaDataClass} from '../..';
import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';

export function collectionEndpoint(dataClass: IWakandaDataClass): Endpoint {

  const endpoint = new Endpoint();
  endpoint.summary = `Get all ${dataClass.name} entities according to the given parameters`;

  endpoint.parameters.push(new Parameter({
    name: 'select',
    in: 'query',
    description: 'Comma-separated list of attribute to expand',
    type: 'string'
  }), new Parameter({
    name: 'filter',
    in: 'query',
    description: 'Condition to fullfil to retrieve entity',
    type: 'string'
  }), new Parameter({
    name: 'params',
    in: 'query',
    description: 'Array reprensentation of parameters to replaced placeholders on `filter` parameter',
    type: 'string'
  }), new Parameter({
    name: 'pageSize',
    in: 'query',
    description: 'Number of entity to retrieve by collection page',
    type: 'number'
  }), new Parameter({
    name: 'start',
    in: 'query',
    description: 'Number of entity to skip',
    type: 'number'
  }), new Parameter({
    name: 'orderBy',
    in: 'query',
    description: 'Comma-separated list of attribute to order by',
    type: 'string'
  }));

  endpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      '$ref': `#/definitions/${dataClass.name}Collection`
    }
  }));

  endpoint.tags.push(dataClass.name, 'DataClass');

  return endpoint;
}