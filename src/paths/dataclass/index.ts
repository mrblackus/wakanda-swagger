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

  //TODO - Add a path for each dataClass method

  return paths;
}
