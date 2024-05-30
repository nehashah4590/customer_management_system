const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const customerRoutes = require('./routes/customerRoutes');
const expenseRouters = require('./routes/expenseRouters');
const orderRouters = require('./routes/orderRoutes');
const loyaltyProgramRouters = require('./routes/loyaltyProgramRouters');
const loyaltyTransRouters = require('./routes/loyaltyTransRouters');

// middleware
app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/orders', orderRouters);
app.use('/expenses', expenseRouters);
app.use('/loyaltyPrograms', loyaltyProgramRouters);
app.use('/loyaltyTransactions', loyaltyTransRouters);

app.listen(port, () => console.log(`app listening on port ${port}`));
