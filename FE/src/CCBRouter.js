import {Routes, Route, useLocation} from 'react-router-dom';
import CouponBooksList from './CouponBooksList';
import CouponList from './CouponList';

const CCBRouter = () => {
    const location = useLocation();
    
    return (
        
                <Routes location={location}>
                    <Route path='/' element={ <CouponBooksList/> }/>
                </Routes>
            
            
            
            
    );
}

export default CCBRouter;