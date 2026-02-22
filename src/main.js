"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const inRouter_1 = __importDefault(require("./inRouter"));
const outRouter_1 = __importDefault(require("./outRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
const PATH = path_1.default.join(__dirname, '../public');
const TARGET = path_1.default.join(PATH, '/index.html');
app.get('/', async (req, res) => {
    res.sendFile(TARGET);
});
app.use('/convert', inRouter_1.default);
app.use('/convert-back', outRouter_1.default);
app.listen(3000, () => console.log('active on port 3000'));
