

const Coupon = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'coupons',
        {
            title:{
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            content:{
                type: DataTypes.STRING(35),
                allowNull: false,
            },
            image:{
                type: DataTypes.TINYINT,
                allowNull: false,
            },
            paper_color:{
                type: DataTypes.STRING(7),
                allowNull: false,
            },
            is_used:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false,
            tableName: 'coupons',
            freezeTableName: true,
            paranoid: false, //soft delete false
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        }
    );
    return model;  
}
export default Coupon;