import {Column, Model, Table, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript'

@Table({tableName: "HungryAppUsers"})
export class User extends Model<User> {

    @PrimaryKey
    @Column
    public email : string;

    @Column
    public passwordHashed : string;

    @Column
    public fullName : string

    @CreatedAt
    @Column
    public createDate : Date;

    @UpdatedAt
    @Column
    public updateDate : Date;


}