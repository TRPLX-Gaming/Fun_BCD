"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PATH = path_1.default.join(__dirname, '../public');
const TARGET = path_1.default.join(PATH, '/index.html');
app.get('/', (req, res) => {
    res.sendFile(TARGET);
});
app.listen(3000, () => console.log('active on port 3000'));
console.log('ok');
