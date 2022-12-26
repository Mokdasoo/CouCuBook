


const postRegister = async(req,res) => {
    res.send('hello auth register');
}

const authController = {
    postRegister: postRegister,
}
export default authController;