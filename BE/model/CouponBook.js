

const CouponBook = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'couponbooks',
        {
            cover_color:{
                type: DataTypes.STRING(7),
                allowNull: false,
            },
            title:{
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            publicationDate:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            expiredDate:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            giver_code:{
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            taker_code:{
                type: DataTypes.STRING(10),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'couponbooks',
            freezeTableName: true,
            paranoid: false, //soft delete false
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        }
    );
    return model;  
}
export default CouponBook;