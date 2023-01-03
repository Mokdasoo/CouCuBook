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

const coupleController = {
    saveCoupleImg: saveCoupleImg,
}
export default coupleController;