import {Path} from './path';

export class SwaggerDocument {

  private swagger: string;
  public info: {
    title: string;
    description: string;
    version: string;
  };
  public host: string;
  public schemes: string[];
  public basePath: string;
  public paths: Path[];
  public definitions: any;

  constructor() {
    this.swagger = "2.0";
    this.schemes = [];
    this.paths = [];
    this.definitions = {};
  }

  toJSON() {
    const obj: any = {};

    obj.host = this.host;
    obj.schemes = this.schemes;
    obj.basePath = this.basePath;
    obj.info = this.info;
    obj.swagger = this.swagger;

    obj.paths = {};

    this.paths.forEach(path => {
      obj.paths[path.url] = path;
    });

    obj.definitions = this.definitions;

    return obj;
  }
}