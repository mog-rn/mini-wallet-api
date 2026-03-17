import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.ts';
import walletRoutes from './routes/wallet.routes.ts';
import transactionRoutes from './routes/transaction.routes.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(errorHandler);

export default app;


