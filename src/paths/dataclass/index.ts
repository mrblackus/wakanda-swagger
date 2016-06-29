import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass} from '../../';
import {collectionEndpoint} from './collection';
import {createEndpoint} from './create';

export function dataClassPaths(dataClass: IWakandaDataClass): Path[] {
  const paths: Path[] = [];

  const basicPath = new Path(`/${dataClass.name}`);

  basicPath.addEndpoint(HTTPVerb.GET, collectionEndpoint(dataClass));
  basicPath.addEndpoint(HTTPVerb.POST, createEndpoint(dataClass));

  paths.push(basicPath);

  dataClass.methods
    .filter(x => x.applyTo === 'dataClass')
    .forEach(method => {
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
      methodEndpoint.tags.push(dataClass.name, 'DataClass Method');

      methodPath.addEndpoint(HTTPVerb.POST, methodEndpoint);
      paths.push(methodPath);
    });

  return paths;
}
