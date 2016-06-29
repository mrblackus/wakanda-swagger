import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass} from '../../';
import {getEndpoint} from './get';

export function collectionPaths(dataClass: IWakandaDataClass): Path[] {
  const paths = [];

  const basicPath = new Path(`/_collection/${dataClass.name}/{id}`);

  basicPath.addEndpoint(HTTPVerb.GET, getEndpoint(dataClass));

  paths.push(basicPath);

  return paths;
}