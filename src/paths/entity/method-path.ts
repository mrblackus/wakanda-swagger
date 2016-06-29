import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass, IWakandaMethod} from '../../';

export function methodPath(method: IWakandaMethod, dataClass: IWakandaDataClass): Path {
  const path = new Path(`/${dataClass.name}/{id}/${method.name}`);
  const endpoint = new Endpoint();

  endpoint.description = `Call the \`${method.name}\` method on the given ${dataClass.name} entity.`;
  endpoint.parameters.push(new Parameter({
      name: 'id',
      in: 'path',
      required: true,
      type: 'string'
    }),
    new Parameter({
      name: 'body',
      in: 'body',
      schema: {
        type: 'object'
      }
  }));
  endpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      type: 'object'
    }
  }));
  endpoint.tags.push('Entity Method', dataClass.name);

  path.addEndpoint(HTTPVerb.POST, endpoint);

  return path;
}