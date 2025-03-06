"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const configSetup_1 = __importDefault(require("./config/configSetup"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importDefault(require("./routes/auth"));
const profiles_1 = __importDefault(require("./routes/profiles"));
require("reflect-metadata");
// import { consumeJobEvents } from './utils'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true }));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world! This is the user service' });
});
// app.all('*', isAuthorized);
app.use("/api", index_1.default);
app.use("/api/auth/", auth_1.default);
app.use('/api/profiles', profiles_1.default);
// consumeJobEvents();
db_1.default.sync({ alter: true }).then(() => {
    app.listen(configSetup_1.default.PORT, () => console.log(`Server is running on http://localhost:${configSetup_1.default.PORT}`));
})
    .catch(err => console.error('Error connecting to the database', err));
exports.default = app;
//# sourceMappingURL=app.js.map