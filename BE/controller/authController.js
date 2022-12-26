
const postRegister = async(req,res) => {
    const {social_platform, id, nickname, birth, anniversary} = req.body;
    
    res.send('register success!!!');
}




const authController = {
    postRegister: postRegister,
}
export default authController;