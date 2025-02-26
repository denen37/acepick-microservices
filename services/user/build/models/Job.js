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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.modeType = exports.JobStatus = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Dispute_1 = require("./Dispute");
// export enum UserGender {
// 	MALE = 'MALE',
// 	FEMALE = 'FEMALE',
// 	OTHER = 'OTHER',
// }
var JobStatus;
(function (JobStatus) {
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["DISPUTED"] = "DISPUTED";
    JobStatus["PENDING"] = "PENDING";
    JobStatus["ONGOING"] = "ONGOING";
    JobStatus["CANCEL"] = "CANCEL";
    JobStatus["REJECTED"] = "REJECTED";
    JobStatus["INVOICE"] = "INVOICE";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var modeType;
(function (modeType) {
    modeType["VIRTUAL"] = "VIRTUAL";
    modeType["PHYSICAL"] = "PHYSICAL";
})(modeType || (exports.modeType = modeType = {}));
let Job = class Job extends sequelize_typescript_1.Model {
};
exports.Job = Job;
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Job.prototype, "seen", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Job.prototype, "approved", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(modeType.VIRTUAL),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(modeType.VIRTUAL, modeType.PHYSICAL)),
    __metadata("design:type", String)
], Job.prototype, "mode", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "lga", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "fullAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE),
    __metadata("design:type", Number)
], Job.prototype, "long", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Job.prototype, "total", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Job.prototype, "departureDaysCount", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Job.prototype, "arrivalDaysCount", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "ownerLocationDeparture", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "currentOwnerLocationDeparture", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "currentOwnerLocationArrival", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "currentClientLocationArrival", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "currentClientLocationDeparture", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "ownerLocationArrival", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "clientLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "clientLocationArrival", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(null),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Job.prototype, "clientLocationDeparture", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "isLocationMatch", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "ownerMatchArrival", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "clientMatchArrival", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "clientMatchDeparture", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "ownerMatchDeparture", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "processed", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "paid", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Job.prototype, "workmannShip", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", String)
], Job.prototype, "isMaterial", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "gettingMaterial", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE),
    __metadata("design:type", Number)
], Job.prototype, "lan", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "durationUnit", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Job.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", String)
], Job.prototype, "durationValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(JobStatus.INVOICE),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(JobStatus.COMPLETED, JobStatus.REJECTED, JobStatus.DISPUTED, JobStatus.PENDING, JobStatus.ONGOING, JobStatus.CANCEL, JobStatus.INVOICE)),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Job.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Job.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, { foreignKey: 'userId', as: 'client', onDelete: 'CASCADE', }),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Job.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, { foreignKey: 'ownerId', as: 'owner', onDelete: 'CASCADE', }),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Job.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Dispute_1.Dispute, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Job.prototype, "dispute", void 0);
exports.Job = Job = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'jobs' })
], Job);
//# sourceMappingURL=Job.js.map