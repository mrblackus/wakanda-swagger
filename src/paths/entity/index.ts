import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass} from '../../';
import {getEndpoint} from './get';
import {saveEndpoint} from './save';
import {removeEndpoint} from './remove';
import {methodPath} from './method-path';

export function entityPaths(dataClass: IWakandaDataClass): Path[] {
  const paths: Path[] = [];

  const basicPath = new Path(`/${dataClass.name}/{id}`);

  basicPath.addEndpoint(HTTPVerb.GET, getEndpoint(dataClass));
  basicPath.addEndpoint(HTTPVerb.PUT, saveEndpoint(dataClass));
  basicPath.addEndpoint(HTTPVerb.DELETE, removeEndpoint(dataClass));

  paths.push(basicPath);

  dataClass.methods
    .filter(x => x.applyTo === 'entity')
    .forEach(method => {
      paths.push(methodPath(method, dataClass));
    });

  return paths;
}