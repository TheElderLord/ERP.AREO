"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const File_1 = __importDefault(require("./File"));
const Token_1 = __importDefault(require("./Token"));
let User = class User extends sequelize_typescript_1.Model {
    /**
     * Hashes the user's password before creating or updating the user.
     * This method is automatically called by Sequelize hooks.
     * @param instance - The instance of the User being saved.
     */
    static hashPassword(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (instance.changed('password')) {
                const salt = yield bcryptjs_1.default.genSalt(12);
                instance.password = yield bcryptjs_1.default.hash(instance.password, salt);
            }
        });
    }
    /**
     * Compares a plain text password with the hashed password.
     * @param password - The plain text password to compare.
     * @returns A promise that resolves to true if passwords match, false otherwise.
     */
    comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(password, this.password);
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmailOrPhone(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
                if (!emailRegex.test(value) && !phoneRegex.test(value)) {
                    throw new Error('Identifier must be a valid email or phone number');
                }
            },
        },
    }),
    __metadata("design:type", String)
], User.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => File_1.default),
    __metadata("design:type", Array)
], User.prototype, "files", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Token_1.default),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users',
        timestamps: true,
    })
], User);
exports.default = User;
