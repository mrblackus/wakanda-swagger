import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass, IWakandaMethod} from '../../';
import {TagName} from '../../helpers';

export function methodPath(method: IWakandaMethod, dataClass: IWakandaDataClass): Path {
  const methodPath = new Path(`/${dataClass.name}/_method/${method.name}`);
  const methodEndpoint = new Endpoint();

  methodEndpoint.description = `Call the \`${method.name}\` method on ${dataClass.name} dataClass.`;
  methodEndpoint.parameters.push(new Parameter({
    name: 'body',
    in: 'body',
    schema: {
      type: 'object'
    }
  }));
  methodEndpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      type: 'object'
    }
  }));
  methodEndpoint.tags.push(dataClass.name, TagName.DataClassMethod);

  methodPath.addEndpoint(HTTPVerb.POST, methodEndpoint);

  return methodPath;
}