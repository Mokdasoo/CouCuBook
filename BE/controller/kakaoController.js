import axios from "axios";



const getLogin = async (req, res) => {
    console.log(req.body.token);
    const ACCESS_TOKEN = req.body.token;
    let tmp;
    /**사용자 정보 가져오기 */
    try{
        const url = 'https://kapi.kakao.com/v2/user/me';
        const Header = {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
        };
        tmp = await axios.get(url, Header);
    }catch (e) {
        console.log("Axios Error: 사용자 정보 가져오기");
        console.log(e);
        const response = {
            result: 'fail',
            error: '토큰 에러'
        };
        res.send(response);
        return;
    }
    try{
        const {data} = tmp;
        const {id} = data;

        //데이터베이스에서 id와 맞는 유저 정보 불러와서 result에 저장하기
        const result = null;

        if(result){
            const response = {
                result:'success',
                data: result
            };
            res.send(response);
        }else{
            //카카오 간편가입은 돼서 id는 있지만 우리 데이터베이스에 나머지회원가입이 안되었을 때
            const response = {
                result: 'needInfo',
                data: {
                    id: id,
                    name: 'kakao'
                }
            };
            res.send(response);
        }
    } catch (e) {
        console.log(e);
        let msg = "";
        if (typeof e === 'string') {
            msg = e;
        } else if (e instanceof Error) {
            msg = e.message;
        }
        const response = {
            result: 'fail',
            error: msg,
        };
        res.send(response);
    }
}


const kakaoController = {
    getLogin: getLogin,
}

export default kakaoController;