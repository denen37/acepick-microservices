import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';


export enum WalletType {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}


@Table({ timestamps: true, tableName: 'wallet' })
export class Wallet extends Model {


    @Default(0)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    amount!: string;


    @Default(0)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    transitAmount!: string


    @AllowNull(true)
    @Column(DataType.STRING)
    pin!: string


    @Default(WalletType.CLIENT)
    @Column(DataType.ENUM(WalletType.CLIENT, WalletType.PROFESSIONAL))
    type!: WalletType;



    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId!: string;


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User;


}
