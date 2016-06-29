import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass} from '../../';
import {collectionEndpoint} from './collection';
import {createEndpoint} from './create';
import {methodPath} from './method-path';

export function dataClassPaths(dataClass: IWakandaDataClass): Path[] {
  const paths: Path[] = [];

  const basicPath = new Path(`/${dataClass.name}`);

  basicPath.addEndpoint(HTTPVerb.GET, collectionEndpoint(dataClass));
  basicPath.addEndpoint(HTTPVerb.POST, createEndpoint(dataClass));

  paths.push(basicPath);

  dataClass.methods
    .filter(x => x.applyTo === 'dataClass')
    .forEach(method => {
      paths.push(methodPath(method, dataClass));
    });

  return paths;
}
