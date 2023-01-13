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
                title: coupon.title,
                content: coupon.content,
                image: coupon.image,
                paper_color: coupon.paper_color,
                is_used: coupon.is_used,
                book_id: book_id,
            }
            await models.Coupon.create(obj);
        }, Promise.resolve());
        

    } catch (error) {
        console.log(error);
        res.send({msg: 'fail'});
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

const updateCouponUsed = async (req, res) => {
    const {coupon} = req.body;
    try {
        const result = await models.Coupon.update({ is_used: true }, //본인  러버코드 업데이트  response1에는 성공하면 1 들어감
            { where: {id: coupon.id} }
        );
        const couponArray = await models.Coupon.findAll({
            where: {book_id: coupon.book_id}
        })
        res.send({msg: 'success', couponArray: couponArray});
    } catch (error) {
        console.log('쿠폰 업데이트 에러!', error);
        res.send({msg: 'error'});
    }
}

const couponController = {
    saveCouponBookAndCouponAll: saveCouponBookAndCouponAll,
    getGitedMyCouponBooks: getGitedMyCouponBooks,
    updateCouponUsed: updateCouponUsed,
}
export default couponController;