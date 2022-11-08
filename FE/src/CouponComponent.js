import './Coupon.scss';
import CouponInfo from './CouponInfo';
import { useState, useRef } from 'react';

const CouponComponent = (props) => {
    const [isOpen2, setIsOpen2] = useState(false);
    const couponObj = useRef();
    const clickCoupon = () => {
        setIsOpen2(true);
    }
    const closeCoupon = () => {
        setIsOpen2(false);
    }
    const useCoupon = () => {
        setIsOpen2(false);
        couponObj.current.style.opacity = 0.2;
    }

    return(
        <>
        {isOpen2 && <CouponInfo title={props.title} content={props.content} img={props.img} closeCoupon={closeCoupon} useCoupon={useCoupon}/>}
        <div className='coupon-wrap' onClick={clickCoupon} ref={couponObj}>

            <div className='coupon-flex'>
                <div className='title'><span>{props.title}</span></div>
                <div className='image'><img src={'/images/couponCover/'+ props.img}></img></div>
                <div className='content'>{props.content}</div>
            </div>
            
        </div>
        </>
    );
}

export default CouponComponent;