const path = require('path');
const { parsed: env } = require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Elle, Vogue, FashionUnited } = require('./classes/Sites');
const Program = require('./classes/Program');

const program = new Program(env);
program.setSites([ Elle, Vogue, FashionUnited ]);
program.start();