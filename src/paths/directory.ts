import {Endpoint, Parameter, Path, Response} from '../swagger/path';
import {HTTPVerb} from '../http-verb';
import {TagName} from '../helpers';

export const loginPath                 = new Path('/_directory/login');
export const logoutPath                = new Path('/_directory/logout');
export const currentUserPath           = new Path('/_directory/currentUser');
export const currentUserBeglonsToPath  = new Path('/_directory/currentUserBelongsTo/{group}');

//Login
const loginEndpoint = new Endpoint();
loginEndpoint.summary = 'Log in with the given credentials';
loginEndpoint.parameters.push(
  new Parameter({
    name: 'body',
    in: 'body',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
  })
);
loginEndpoint.tags.push(TagName.Directory);
loginEndpoint.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    type: 'object',
    properties: {
      result: {
        type: 'boolean',
        description: 'Indicate if the loggin end up successfully or not'
      }
    }
  }
}));

loginPath.addEndpoint(HTTPVerb.POST, loginEndpoint);

//Logout
const logoutEndpoint = new Endpoint();
logoutEndpoint.summary = 'Log out the currently logged in user';
logoutEndpoint.tags.push(TagName.Directory);
logoutEndpoint.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    type: 'object',
    properties: {
      result: {
        type: 'boolean',
        description: 'Indicate if the logout end up successfully or not'
      }
    }
  }
}));

logoutPath.addEndpoint(HTTPVerb.GET, logoutEndpoint);

//Current User
const cuEndpint = new Endpoint();
cuEndpint.summary = 'Get information about the currently logged in user';
cuEndpint.tags.push(TagName.Directory);
cuEndpint.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        description: 'Username'
      },
      fullName: {
        type: 'string',
        description: 'User full name'
      },
      ID: {
        type: 'number',
        description: 'User identifier'
      }
    }
  }
}));
currentUserPath.addEndpoint(HTTPVerb.GET, cuEndpint);

//Current User Belongs To
const cubtEndpoint = new Endpoint();
cubtEndpoint.summary = 'Check if the currently logged in user belongs to the given group';
cubtEndpoint.parameters.push(new Parameter({
  name: 'group',
  in: 'path',
  type: 'string',
  description: 'Group name or identifier',
  required: true
}));
cubtEndpoint.tags.push(TagName.Directory);
cubtEndpoint.responses.push(new Response({
  id: '200',
  description: 'Successful response',
  schema: {
    type: 'object',
    properties: {
      result: {
        type: 'boolean',
        description: 'Indicate if the currently logged in user belongs to the given group'
      }
    }
  }
}));
currentUserBeglonsToPath.addEndpoint(HTTPVerb.GET, cubtEndpoint);