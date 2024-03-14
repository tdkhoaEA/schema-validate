const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
        name: { type: 'string' },
        age: { type: 'integer', minimum: 0 },
        email: { type: 'string', format: 'email' },
    },
    required: ['name', 'age'],
};

export const sampleSchemaString = JSON.stringify(schema, null, 2);

const data = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
};

export const sampleDataString = JSON.stringify(data, null, 2);
