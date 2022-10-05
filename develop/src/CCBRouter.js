import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CouponBooks from './CouponBooks';
import Header from './Header';
import DemoBook from './Pageflip';

const CCBRouter = () => {

    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={ <CouponBooks/> }></Route>
                </Routes>
            
            </BrowserRouter>
        </div>
    );
}

export default CCBRouter;