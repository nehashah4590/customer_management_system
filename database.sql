CREATE DATABASE customer;

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    loyalty_points INTEGER,
    tenant_id INTEGER
);



CREATE TABLE CustomerOrders(
        order_id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES Customers(customer_id),
        date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        total_amount INTEGER NOT NULL, 
        items VARCHAR(200) NOT NULL,
        tenant_id INTEGER NOT NULL

);

CREATE TABLE CustomerLoyaltyTransactions(
    transaction_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES Customers(customer_id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    points INTEGER NOT NULL,
    type varchar(255) NOT NULL,
    tenant_id INTEGER NOT NULL

);

CREATE TABLE LoyaltyPrograms(
    program_id  SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    points_per_dollar INTEGER NOT NULL
    
);

CREATE TABLE Expenses (
    expense_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expense_type VARCHAR(50) NOT NULL,
    tenant_id INTEGER NOT NULL
);



Customers (customer_id, first_name, last_name, email, phone, address, loyalty_points, tenant_id)
CustomerOrders (order_id, customer_id, date, total_amount, items, tenant_id)
CustomerLoyTransactionsalty (transaction_id, customer_id, date, points, type, tenant_id)
LoyaltyPrograms (program_id, name, description, points_per_dollar)