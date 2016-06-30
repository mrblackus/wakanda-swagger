import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass} from '../../';
import {getEndpoint} from './get';
import {deleteEndpoint} from './delete';
import {methodPath} from './method-path';

export function collectionPaths(dataClass: IWakandaDataClass): Path[] {
  const paths: Path[] = [];

  const basicPath = new Path(`/_collection/${dataClass.name}/{id}`);

  basicPath.addEndpoint(HTTPVerb.GET, getEndpoint(dataClass));
  basicPath.addEndpoint(HTTPVerb.DELETE, deleteEndpoint(dataClass));

  paths.push(basicPath);

  dataClass.methods
    .filter(x => x.applyTo === 'entityCollection')
    .forEach(method => {
      paths.push(methodPath(method, dataClass));
    });

  return paths;
}