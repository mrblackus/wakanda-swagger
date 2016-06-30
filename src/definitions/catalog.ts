export const catalogDefinition = {
  type: 'object',
  properties: {
    dataClasses: {
      type: 'array',
      items : {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'DataClass name',
          },
          uri: {
            type: 'string',
            description: 'URI to get dataClass detail about its structure'
          },
          dataUri: {
            type: 'string',
            description: 'URI to get dataClass data'
          }
        }
      }
    }
  }
};

export const catalogDetailDefinition = {
  type: 'object',
  properties: {
    dataClasses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'DataClass name'
          },
          className: {
            type: 'string',
            description: 'DataClass name'
          },
          collectionName: {
            type: 'string',
            description: 'Name of a collection of entities of this dataClass'
          },
          scope: {
            type: 'string',
            description: 'DataClass visibility (public, public on server, or private)'
          },
          dataUri: {
            type: 'string',
            description: 'URI to get dataClass data'
          },
          attributes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Attribute name'
                },
                kind: {
                  type: 'string',
                  description: 'Kind of attribute: plain value, alias, calculated field, related entity or collection'
                },
                scope: {
                  type: 'string',
                  description: 'Attribute visibility (public, public on server or private)'
                },
                type: {
                  type: 'string',
                  description: 'Attribute type'
                }
              }
            }
          },
          method: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Method name'
                },
                applyTo: {
                  type: 'string',
                  description: 'Kind of element that the method will be called on: dataClass, entity or collection'
                },
                scope: {
                  type: 'string',
                  description: 'Method visibility (public, public on server or private)'
                },
                from: {
                  type: 'string',
                  description: 'Method declaration location'
                },
                userDefined: {
                  type: 'boolean',
                  description: 'Indicate if the method is defined by a user'
                }
              }
            }
          },
          key: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Attribute name which compose the key'
                }
              }
            }
          }
        }
      }
    }
  }
};