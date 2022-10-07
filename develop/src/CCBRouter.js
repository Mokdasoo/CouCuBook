import {Routes, Route, useLocation} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Transition.scss';
import CouponBooksList from './CouponBooksList';
import CouponList from './CouponList';

const CCBRouter = () => {
    const location = useLocation();
    
    return (
        <TransitionGroup className="transitions-wrapper" >
            <CSSTransition
                key={location.pathname}
                classNames={"closeup"}
                timeout={2000}
            >
                <Routes location={location}>
                    <Route path='/' element={ <CouponBooksList/> }/>
                    <Route path='/book' element={ <CouponList/> }/>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
            
            
            
            
    );
}

export default CCBRouter;