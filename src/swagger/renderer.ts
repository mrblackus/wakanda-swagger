import {SwaggerDocument} from './swagger-document';

export function renderToString(document: SwaggerDocument): string {
  return JSON.stringify(document, null, 2);
}