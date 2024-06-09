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

### Currencies Table
| Column  | Type    | Comment                                      |
|---------|---------|----------------------------------------------|
| ID      | int     | Currency ID, auto-increment, primary key     |
| Code    | Varchar | Currency code                                |
| FullName| Varchar | Full name of the currency                    |
| Sign    | Varchar | Currency symbol                              |

Example entry for Australian dollar:

| ID  | Code | FullName          | Sign |
|-----|------|-------------------|------|
| 1   | AUD  | Australian dollar | A$   |

Indexes:

- Primary key on the ID field
- Unique index on the Code field to ensure currency uniqueness in the table and to speed up currency search by its abbreviation

### ExchangeRates Table

| Column            | Type       | Comment                                                              |
|-------------------|------------|----------------------------------------------------------------------|
| ID                | int        | Exchange rate ID, auto-increment, primary                            |
| BaseCurrencyId    | int        | ID of the base currency, foreign key to Currencies.                  |
| TargetCurrencyId  | int        | ID of the target currency, foreign key to Currencies.                |
| Rate              | Decimal(6) | Exchange rate of one unit of the base currency to one unit of the get|

## REST API
### Currencies
- GET `/currencies`: Retrieves a list of currencies.
- GET `/currency/{CODE}`: Retrieves a specific currency.
- POST `/currencies`: Adds a new currency to the database.
### Exchange Rates
- GET `/exchangeRates`: Retrieves a list of all exchange rates.
- GET `/exchangeRate/{BASE_CURRENCY_CODE}{TARGET_CURRENCY_CODE}`: Retrieves a specific exchange rate.
- POST `/exchangeRates`: Adds a new exchange rate to the database.
- PATCH `/exchangeRate/{BASE_CURRENCY_CODE}{TARGET_CURRENCY_CODE}`: Updates an existing exchange rate in the database.
### Currency Exchange
- GET `/exchange?from={BASE_CURRENCY_CODE}&to={TARGET_CURRENCY_CODE}&amount={AMOUNT}`: Calculates the conversion of a certain amount of funds from one currency to another.

For all requests, in case of an error, the response may look like this:
```
{
    "message": "Currency not found"
}
```

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