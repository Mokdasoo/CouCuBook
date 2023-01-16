export const generateRandomString = (num: number) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const dateCheckHandler = (date: string) => {
    const target = date;
    const regexp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if(regexp.test(target)){
        const targetDate = new Date(target);
        const now = new Date(Date.now());
            if(targetDate > now){
                return false;
            }else{
                return true;
            }
    }else{
        return false;
    }
}