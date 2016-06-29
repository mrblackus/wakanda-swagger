import {IWakandaDataClass} from '../..';
import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {wakandaToSwaggerType, TagName} from '../../helpers';

export function createEndpoint(dataClass: IWakandaDataClass): Endpoint {

  const endpoint = new Endpoint();
  endpoint.summary = `Create a new ${dataClass.name} entity`;

  endpoint.parameters.push(new Parameter({
    name: 'body',
    in: 'body',
    schema: {
      '$ref': `#/definitions/${dataClass.name}Entity`
    }
  }));

  endpoint.responses.push(new Response({
    id: '200',
    description: 'Successful response',
    schema: {
      '$ref': `#/definitions/${dataClass.name}Entity`
    }
  }));

  endpoint.tags.push(dataClass.name, TagName.DataClass);

  return endpoint;
}