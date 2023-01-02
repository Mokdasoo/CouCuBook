import { HOST_ADDRESS } from "../env/db.js";

const Couple = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'couples',
        {
            user_code:{
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true
            },
            lover_code:{
                type: DataTypes.STRING(10),
                allowNull: true,
                unique: true
            },
            anniversary:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            couple_image:{
                type: DataTypes.STRING(256),
                allowNull: true
            },
        },
        {
            timestamps: false,
            tableName: 'couples',
            freezeTableName: true,
        }
    );
    return model;  
}
export default Couple;