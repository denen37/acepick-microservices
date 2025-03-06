import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { Sector } from './Sector';
import { Job } from './Job';



@Table({ timestamps: true, tableName: 'material' })
export class Material extends Model {
    @AllowNull(false)
    @Column(DataType.STRING)
    description!: string;


    @AllowNull(false)
    @Column(DataType.INTEGER)
    quantity!: string



    @AllowNull(true)
    @Column(DataType.INTEGER)
    subTotal!: string


    @AllowNull(false)
    @Column(DataType.INTEGER)
    price!: string

    @ForeignKey(() => Job)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    jobId!: number;



    @BelongsTo(() => Job, { onDelete: 'CASCADE' })
    job!: Job;
}
