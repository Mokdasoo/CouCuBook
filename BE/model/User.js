

const User = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'user',
        {
            social_id:{
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            social_platform:{
                type: DataTypes.STRING(6),
                allowNull: false,
            },
            nickname:{
                type: DataTypes.STRING(10),
                allowNull: false
            },
            birth:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            anniversary:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            user_code:{
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true
            },
            lover_code:{
                type: DataTypes.STRING(10),
                allowNull: true,
            }
        },
        {
            timestamps: false,
            tableName: 'user',
            freezeTableName: true,
        }
    );
    return model;  
}
export default User;