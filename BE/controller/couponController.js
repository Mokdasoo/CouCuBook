import models from '../model/index.js';

const saveCouponBookAndCouponAll = async (req, res) => {
    const {couponBook, user_code, lover_code} = req.body;
    const {coupons} = couponBook;
    
    const object = {
        cover_color: couponBook.cover_color,
        title: couponBook.title,
        publicationDate: couponBook.publicationDate,
        expiredDate: couponBook.expiredDate,
        giver_code: user_code,
        taker_code: lover_code
    }
    let book_id;
    try {
        const resultSaveCouponBook = await models.CouponBook.create(object);
        book_id = resultSaveCouponBook.dataValues.id;
        await coupons.reduce( async (prevPromise, coupon) => {
            await prevPromise;
            const obj = {
                ...coupon,
                book_id: book_id
            }
            await models.Coupon.create(obj);
        }, Promise.resolve());
        

    } catch (error) {
        console.log(error);
    }


    res.send({msg: 'success'});
}
const getGitedMyCouponBooks = async (req, res) => {
    const {user_code} = req.query;
    try {
        const result = await models.CouponBook.findAll({
            where: { giver_code: user_code}, //taker_code 로 바꾸기 test로 해놓음
            include: [models.Coupon]
        });
        const fetchingData = result.map((data) => {
            return data.dataValues;
        })
        res.send(fetchingData);
    } catch (error) {
        console.log(error);
        res.send({msg: '쿠폰북과 쿠폰 불러오기 fail'});
    }
}

const couponController = {
    saveCouponBookAndCouponAll: saveCouponBookAndCouponAll,
    getGitedMyCouponBooks: getGitedMyCouponBooks,
}
export default couponController;