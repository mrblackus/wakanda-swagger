import {Endpoint, Parameter, Path, Response} from '../../swagger/path';
import {HTTPVerb} from '../../http-verb';
import {IWakandaDataClass} from '../../';
import {getEndpoint} from './get';

export function entityPaths(dataClass: IWakandaDataClass): Path[] {
  const paths: Path[] = [];

  const basicPath = new Path(`/${dataClass.name}/{id}`);

  basicPath.addEndpoint(HTTPVerb.GET, getEndpoint(dataClass));

  paths.push(basicPath);

  return paths;
}