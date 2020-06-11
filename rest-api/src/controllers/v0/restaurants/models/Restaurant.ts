import {Column, Model, Table, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript'

@Table
export class Restaurant extends Model<Restaurant> {

    @PrimaryKey
    @Column
    public name : string;

    @CreatedAt
    @Column
    public createDate : Date;

    @UpdatedAt
    @Column
    public updateDate : Date;


}