import {Endpoint, Parameter, Path, Response} from '../swagger/path';
import {HTTPVerb} from '../http-verb';
import {TagName} from '../helpers';

const catalogDetailPath = new Path('/_catalog/{dataClasses}');
const endpointCatalogDetail = new Endpoint();

endpointCatalogDetail.summary = 'Get the details for the given dataClasses';
endpointCatalogDetail.parameters.push(new Parameter({
  name: 'dataClasses',
  in: 'path',
  description: 'List of dataClasses to retrieve. `$all` to get all dataClasses',
  required: true,
  type: 'string'
}));
endpointCatalogDetail.tags.push(TagName.Catalog);
endpointCatalogDetail.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    '$ref': '#/definitions/CatalogDetail'
  }
}));

catalogDetailPath.addEndpoint(HTTPVerb.GET, endpointCatalogDetail);

const catalogPath = new Path('/_catalog');
const endpointCatalog = new Endpoint();

endpointCatalog.summary = 'Get the list of dataClasses on the data model.';
endpointCatalog.tags.push(TagName.Catalog);
endpointCatalog.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    '$ref': '#/definitions/Catalog'
  }
}));

catalogPath.addEndpoint(HTTPVerb.GET, endpointCatalog);

export {catalogDetailPath, catalogPath};