import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Profile } from './Profile';
import { Wallet } from './Wallet';
import { LanLog } from './LanLog';
import { User } from './User';
import { Dispute } from './Dispute';
import { Job } from './Job';


// export enum UserGender {
// 	MALE = 'MALE',
// 	FEMALE = 'FEMALE',
// 	OTHER = 'OTHER',
// }

// export enum JobStatus {
// 	COMPLETED = 'COMPLETED',
// 	DISPUTED = 'DISPUTED',
// 	PENDING = 'PENDING',
// 	REJECTED = 'REJECTED',
// }





@Table({ timestamps: true, tableName: 'voicerecord' })
export class VoiceRecord extends Model {


    @AllowNull(true)
    @Column(DataType.STRING)
    url!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    duration!: string;

    @ForeignKey(() => User)
    @AllowNull(true)
    @Column(DataType.UUID)
    userId!: string;



    @ForeignKey(() => User)
    @AllowNull(true)
    @Column(DataType.UUID)
    recieverId!: string;




    @ForeignKey(() => Profile)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    profileId!: number;



    // relationships
    @BelongsTo(() => User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE', })
    @ForeignKey(() => User)
    user!: User;

    @BelongsTo(() => User, { foreignKey: 'recieverId', as: 'reciever', onDelete: 'CASCADE', })
    @ForeignKey(() => User)
    reciever!: User;


    @BelongsTo(() => Profile, { onDelete: 'CASCADE' })
    profile!: Profile;


}
