import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';


export enum WalletType {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}


@Table({ timestamps: true, tableName: 'wallet' })
export class Wallet extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.UUID)
    userId!: number;



    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    balance!: number;



    @AllowNull(false)
    @Column(DataType.STRING(50))
    currency!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    pin!: string;



    // @Default(WalletType.CLIENT)
    // @Column(DataType.ENUM(WalletType.CLIENT, WalletType.PROFESSIONAL))
    // type!: WalletType;
}
