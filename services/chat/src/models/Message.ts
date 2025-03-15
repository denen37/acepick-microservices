import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Chat } from './Chat';

export enum MessageFrom {
    PROFESSIONAL = 'professional',
    CLIENT = 'client'
}

@Table({ timestamps: true, tableName: 'messages' })
export class Message extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(MessageFrom)))
    from!: string



    @AllowNull(false)
    @Column(DataType.TEXT)
    message!: string



    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeleted!: boolean


    @AllowNull(false)
    @ForeignKey(() => Chat)
    @Column(DataType.BIGINT)
    chatId!: number;



    @BelongsTo(() => Chat, { onDelete: 'CASCADE' })
    chat!: Chat
}
