import models from '../model/index.js';
import { HOST_ADDRESS } from '../env/db.js';

const saveCoupleImg = async (req, res) => {
    console.log("파일정보---------", req.file);
    const {user_code, lover_code} = req.body;
    const pathName = req.file.path
    const pathNameWithoutPublic = pathName.split('public')[1];
    const couple_image = HOST_ADDRESS + pathNameWithoutPublic;
    try {
        await models.Couple.update(
            { couple_image: couple_image }, 
            { where: {user_code: user_code} }
        );
        await models.Couple.update(
            { couple_image: couple_image }, 
            { where: {user_code: lover_code} }
        );
    } catch (error) {
        console.log("saveCoupleImg Function : ", error);
    }
    res.send('이미지 업로드 완료');
}

const updateAnniversary = async(req, res) => {
    const {user_code, anniversary} = req.body;
    try {
        await models.Couple.update({ anniversary: anniversary},{where: {user_code: user_code}});
        res.send({msg: 'success'});
    } catch (error) {
        console.log("기념일 수정 오류", error);
        res.send({msg: 'fail'});
    }
}

const breakCouple = async (req, res) => {
    const{ user_code, lover_code} = req.body;
    try {
        await models.Couple.update({lover_code: null, couple_image: null}, {where: {user_code: user_code}});
        await models.Couple.update({lover_code: null, couple_image: null}, {where: {user_code: lover_code}});
        res.send({msg: 'success'});
    } catch (error) {
        console.log('커플끊기 백서버 오류', error);
        res.sed({msg: 'fail'});
    }

}


const coupleController = {
    saveCoupleImg: saveCoupleImg,
    updateAnniversary: updateAnniversary,
    breakCouple: breakCouple,
}
export default coupleController;