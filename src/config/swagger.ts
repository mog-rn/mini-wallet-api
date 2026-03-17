import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini Wallet API',
            version: '1.0.0',
            description: 'API documentation for the Mini Wallet application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            }
        ],
    },
    apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options);