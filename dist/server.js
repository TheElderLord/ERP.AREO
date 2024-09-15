"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Determine the environment and set the path to the corresponding .env file
const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
// Load the environment variables from the specified file
dotenv.config({ path: path_1.default.resolve(__dirname, '..', envFile) });
// ... rest of your imports and server setup code
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log(`Database Host: ${process.env.DB_HOST}`);

config_1.sequelize.sync({ force: false }).then(() => {
    app_1.default.listen(PORT, () => {
        logger_1.default.info(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
});
