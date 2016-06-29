import * as _ from 'lodash';
import {HTTPVerb} from '../http-verb';
import {HTTPVerbToString} from '../helpers';

export class Path {

  public url: string;
  private endpoints: Map<HTTPVerb, Endpoint>;

  constructor(url: string) {
    this.url = url;
    this.endpoints = new Map();
  }

  public addEndpoint(verb: HTTPVerb, endpoint: Endpoint) {
    if (this.endpoints.has(verb)) {
      throw new Error(`HTTP verb already registered for path ${this.url}`);
    }

    this.endpoints.set(verb, endpoint);
  }

  toJSON() {
    const obj: any = {};

    this.endpoints.forEach((endpoint, verb) => {
      obj[HTTPVerbToString(verb)] = endpoint;
    });

    return obj;
  }
}

export class Endpoint {
  public summary: string;
  public description: string;
  public parameters: Parameter[];
  public tags: string[];
  public responses: Response[];

  constructor() {
    this.tags = [];
    this.parameters = [];
    this.responses = [];
  }

  toJSON() {
    const obj: any = {};

    obj.summary = this.summary;
    obj.description = this.description;
    obj.parameters = this.parameters;
    obj.tags = this.tags;

    obj.responses = {};
    this.responses.forEach(response => {
      obj.responses[response.id] = response;
    });

    return obj;
  }
}

export class Parameter {
  public name: string;
  public in: 'query'|'path'|'body';
  public description: string;
  public required: boolean;
  public type: string;
  public format: string;
  public schema: any;

  constructor(obj = {}) {
    const {name, in: paramIn, description, required, type, format, schema}: any = obj;

    this.name = name;
    this.in = paramIn;
    this.description = description;
    this.required = required;
    this.type = type;
    this.format = format;
    this.schema = schema;
  }
}

export class Response {
  public id: string;
  public description: string;
  public schema: any;

  constructor({id, description, schema}: any) {
    this.id = id;
    this.description = description;
    this.schema = schema;
  }

  toJSON() {
    return {
      description: this.description,
      schema: this.schema
    };
  }
}