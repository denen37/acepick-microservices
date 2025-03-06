import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey } from 'sequelize-typescript';
// import { Profile } from './Profile';
// import { Wallet } from './Wallet';
// import { LanLog } from './LanLog';
// import { User } from './User';
// import { Dispute } from './Dispute';
// import { Material } from './Material';
// import { VoiceRecording } from './VoiceRecording';


// export enum UserGender {
// 	MALE = 'MALE',
// 	FEMALE = 'FEMALE',
// 	OTHER = 'OTHER',
// }

export enum JobStatus {
    COMPLETED = 'COMPLETED',
    DISPUTED = 'DISPUTED',
    PENDING = 'PENDING',
    ONGOING = "ONGOING",
    CANCEL = "CANCEL",
    REJECTED = "REJECTED",
    INVOICE = "INVOICE"
}



export enum modeType {
    VIRTUAL = "VIRTUAL",
    PHYSICAL = "PHYSICAL"
}




@Table({ timestamps: true, tableName: 'jobs' })
export class Job extends Model {


    @AllowNull(true)
    @Column(DataType.STRING)
    description!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    title!: string

    @Default(false)
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    seen!: boolean


    @Default(false)
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    approved!: boolean


    @Default(modeType.VIRTUAL)
    @AllowNull(true)
    @Column(DataType.ENUM(modeType.VIRTUAL, modeType.PHYSICAL))
    mode!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    state!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    lga!: string


    @AllowNull(true)
    @Column(DataType.STRING)
    fullAddress!: string



    @AllowNull(true)
    @Column(DataType.DOUBLE)
    long!: number



    @AllowNull(true)
    @Column(DataType.INTEGER)
    total!: number



    @Default(0)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    departureDaysCount!: number



    @Default(0)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    arrivalDaysCount!: number



    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    ownerLocationDeparture!: any;


    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    currentOwnerLocationDeparture!: any;



    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    currentOwnerLocationArrival!: any;




    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    currentClientLocationArrival!: any;



    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    currentClientLocationDeparture!: any;



    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    ownerLocationArrival!: any;


    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    clientLocation!: any;




    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    clientLocationArrival!: any;



    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    clientLocationDeparture!: any;


    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    isLocationMatch!: string


    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    ownerMatchArrival!: string



    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    clientMatchArrival!: string



    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    clientMatchDeparture!: string



    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    ownerMatchDeparture!: string



    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    processed!: string





    @Default(false)
    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    paid!: string




    @AllowNull(true)
    @Column(DataType.INTEGER)
    workmannShip!: number



    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    isMaterial!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    gettingMaterial!: string



    @AllowNull(true)
    @Column(DataType.DOUBLE)
    lan!: number



    @AllowNull(true)
    @Column(DataType.STRING)
    durationUnit!: string


    @AllowNull(true)
    @Column(DataType.STRING)
    reason!: string


    @AllowNull(true)
    @Column(DataType.INTEGER)
    durationValue!: string

    @Default(JobStatus.INVOICE)
    @Column(DataType.ENUM(JobStatus.COMPLETED, JobStatus.REJECTED, JobStatus.DISPUTED, JobStatus.PENDING, JobStatus.ONGOING, JobStatus.CANCEL, JobStatus.INVOICE))
    status!: JobStatus;


    // @ForeignKey(() => User)
    @AllowNull(true)
    @Column(DataType.UUID)
    ownerId!: string;


    // @ForeignKey(() => User)
    @AllowNull(true)
    @Column(DataType.UUID)
    userId!: string;

    

    @AllowNull(true)
    @Column(DataType.INTEGER)
    sectorId!: string;





    // @ForeignKey(() => Dispute)
    // @AllowNull(true)
    // @Column(DataType.INTEGER)
    // disputeId!: number;



    // relationships
    // @BelongsTo(() => User, { foreignKey: 'userId', as: 'client', onDelete: 'CASCADE', })
    // @ForeignKey(() => User)
    // client!: User;

    // @BelongsTo(() => User, { foreignKey: 'ownerId', as: 'owner', onDelete: 'CASCADE', })
    // @ForeignKey(() => User)
    // owner!: User;

    // @HasMany(() => Dispute, { onDelete: 'CASCADE' })
    // dispute!: Dispute[];


    // @HasMany(() => VoiceRecording, { onDelete: 'CASCADE' })
    // record!: VoiceRecording[];


    // @HasMany(() => Material, { onDelete: 'CASCADE' })
    // material!: Material[];
}
