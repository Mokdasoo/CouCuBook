import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CouponBooksList from './CouponBooksList';
import Header from './Header';
import DemoBook from './Pageflip';

const CCBRouter = () => {

    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={ <CouponBooksList/> }></Route>
                </Routes>
            
            </BrowserRouter>
        </div>
    );
}

export default CCBRouter;