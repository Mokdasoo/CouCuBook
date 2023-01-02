

const User = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'users',
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
                type: DataTypes.STRING(20),
                allowNull: false
            },
            birth:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            user_code:{
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true
            },
        },
        {
            timestamps: true,
            tableName: 'users',
            freezeTableName: true,
            paranoid: false, //soft delete false
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        }
    );
    return model;  
}
export default User;