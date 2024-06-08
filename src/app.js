const path = require('path');

const express = require('express');
const bodeParser = require('body-parser');

const app = express();

app.use(bodeParser.json());