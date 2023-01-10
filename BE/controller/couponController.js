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

const couponController = {
    saveCouponBookAndCouponAll: saveCouponBookAndCouponAll,
}
export default couponController;