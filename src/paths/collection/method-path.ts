import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass, IWakandaMethod} from '../../';
import {TagName} from '../../helpers';

export function methodPath(method: IWakandaMethod, dataClass: IWakandaDataClass): Path {
  const methodPath = new Path(`/_collection/${dataClass.name}/{id}/${method.name}`);
  const methodEndpoint = new Endpoint();

  methodEndpoint.description = `Call the \`${method.name}\` method on the given ${dataClass.name} collection.`;
  methodEndpoint.parameters.push(new Parameter({
    name: 'body',
    in: 'body',
    schema: {
      type: 'object'
    }
  }), new Parameter({
    name: 'id',
    in: 'path',
    required: true,
    type: 'string',
    description: 'Collection identifier'
  }));
  methodEndpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      type: 'object'
    }
  }));
  methodEndpoint.tags.push(dataClass.name, TagName.CollectionMethod);

  methodPath.addEndpoint(HTTPVerb.POST, methodEndpoint);

  return methodPath;
}
