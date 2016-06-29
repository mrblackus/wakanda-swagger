import {IWakandaDataClass} from '../..';
import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';

export function removeEndpoint(dataClass: IWakandaDataClass): Endpoint {
  const endpoint = new Endpoint();

  endpoint.summary = 'Remove the given entity';

  endpoint.parameters.push(new Parameter({
    name: 'id',
    in: 'path',
    description: 'Entity identifier',
    required: true,
    type: 'string'
  }));

  endpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      type: 'object',
      properties: {
        ok: {
          type: 'boolean'
        }
      }
    }
  }));

  endpoint.tags.push('Entity', dataClass.name);

  return endpoint;
}