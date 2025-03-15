import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Message } from './Message';



@Table({ timestamps: true, tableName: 'chats' })
export class Chat extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.BIGINT)
    profId!: number;



    @AllowNull(false)
    @Column(DataType.BIGINT)
    clientId!: number;


    @HasMany(() => Message, { onDelete: 'CASCADE' })
    messages!: Message[]
}
