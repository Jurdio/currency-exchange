# Currency Exchange Project
## Overview
This project is a REST API for managing and querying currency exchange rates. It allows you to view and edit lists of currencies and their exchange rates. The API also provides endpoints for calculating the conversion from one currency to another. The project includes a Swagger documentation and a Postman collection for these endpoints.

**Please note that a web interface for this project is not currently provided.**

## Features
- **Currency Management:** Add, update, and delete different currencies.
- **Exchange Rate Management:** Add, update, and delete exchange rates between different currencies.
- **Currency Conversion:** Calculate the conversion of an arbitrary amount from one currency to another.


## Database
MySQL is used as the database for this project. This allows for the inclusion of a file with pre-filled database tables in the project resources, simplifying deployment.

Currencies Table
| Column | Type | Comment |
| --- | --- |
ID	int	Currency ID, auto-increment, primary key
Code	Varchar	Currency code
FullName	Varchar	Full name of the currency
Sign	Varchar	Currency symbol

## API Endpoints
- `GET /currencies`: Get a list of all currencies.
- `POST /currencies`: Add a new currency.
- `GET /currency/:code`: Get details of a specific currency.
- `GET /exchangeRates`: Get a list of all exchange rates.
- `GET /exchangeRate/:currencyPair`: Get a specific exchange rate.
- `POST /exchangeRates`: Add a new exchange rate.
- `PATCH /exchangeRate/:currencyPair`: Update a specific exchange rate.
- `GET /exchange?from=BASE_CURRENCY_CODE&to=TARGET_CURRENCY_CODE&amount=$AMOUNT`: Calculate the conversion of an arbitrary amount from one currency to another.

## Getting Started
1. Clone the repository: 
```bash 
git clone https://github.com/yourusername/currency-exchange.git
```
2. Navigate to the project directory: 
```bash 
cd currency-exchange
```
3. Install dependencies: 
```bash 
npm install
```
4. Start the server: 
```bash 
npm start
```

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.