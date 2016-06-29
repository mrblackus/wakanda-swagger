import {IWakandaDataClass} from '../..';
import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';

export function getEndpoint(dataClass: IWakandaDataClass): Endpoint {
  const endpoint = new Endpoint();

  endpoint.summary = `Retrieve the ${dataClass.name} entity whose key is given in path.`;

  endpoint.parameters.push(new Parameter({
    name: 'id',
    in: 'path',
    description: 'Entity identifier',
    required: true,
    type: 'string'
  }),
  new Parameter({
    name: 'select',
    in: 'query',
    description: 'Comma-separated list of attribute to expand',
    type: 'string'
  }));

  endpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      '$ref': `#/definitions/${dataClass.name}Entity`
    }
  }));

  endpoint.tags.push('Entity', dataClass.name);

  return endpoint;
}