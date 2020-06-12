import {Column, Model, Table, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript'

@Table
export class Favorite extends Model<Favorite> {

    @PrimaryKey
    @Column
    // User email address
    public email : string;

    @PrimaryKey
    @Column
    // Favorite restaurant Yelp ID
    public restaurantId : string;

    @Column
    // Favorite restaurant name
    public name : string;

    @Column
    // Favorite restaurant url
    public url : string;

    @Column
    // Favorite restaurant location (latitude)
    public latitude : string;

    @Column
    // Favorite restaurant location (longitude)
    public longitude : string;

    @Column
    // Favorite restaurant address (Address1)
    public address1 : string;

    @Column
    // Favorite restaurant address (city)
    public city : string;

    @Column
    // Favorite restaurant address (state)
    public state : string;

    @CreatedAt
    @Column
    public createDate : Date;

    @UpdatedAt
    @Column
    public updateDate : Date;


}