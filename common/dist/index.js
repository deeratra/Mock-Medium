"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string().optional()
});
exports.createPostSchema = zod_1.default.object({
    tilte: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.string().optional()
});
exports.updatePostSchema = zod_1.default.object({
    id: zod_1.default.string(),
    tilte: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.string().optional()
});
