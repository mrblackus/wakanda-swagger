import {Endpoint, Parameter, Path, Response} from '../swagger/path';
import {HTTPVerb} from '../http-verb';

const endpoint = new Endpoint();
endpoint.summary = 'Get the details for the given dataClasses';
endpoint.parameters.push(new Parameter({
  name: 'dataClasses',
  in: 'path',
  description: 'List of dataClasses to retrieve. `$all` to get all dataClasses',
  required: true,
  type: 'string'
}));
endpoint.tags.push('Catalog');
endpoint.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    type: 'object'
  }
}));

const catalogPath = new Path('/_catalog/{dataClasses}');

catalogPath.addEndpoint(HTTPVerb.GET, endpoint);

export {catalogPath};