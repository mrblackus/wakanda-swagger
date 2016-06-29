import {IWakandaDataClass} from '../..';
import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {TagName} from '../../helpers';

export function deleteEndpoint(dataClass: IWakandaDataClass): Endpoint {
  const endpoint = new Endpoint();

  endpoint.summary = `Delete all ${dataClass.name} entities contained in the collection`;

  endpoint.parameters.push(new Parameter({
    name: 'id',
    in: 'path',
    required: true,
    description: 'Collection identifier',
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

  endpoint.tags.push(TagName.Collection, dataClass.name);

  return endpoint;
}
