import './Coupon.scss';
import { useRef } from "react";

const CouponInfo = (props) => {
    

    

    return(
        <div className='coupon-wrap2'>
            <div className='coupon-flex2'>
                <div className='title2'><span>{props.title}</span></div>
                <div className='image2'><img src={'/images/couponCover/'+ props.img}></img></div>
                <div className='content2'>{props.content}</div>
                <div className='button-wrap'>
                    <a href="#" className="buttonClass-blue" onClick={props.useCoupon}>쿠폰 사용하기</a>
                    <a href="#" className="buttonClass-red" onClick={props.closeCoupon}>닫기</a>
                </div>
                
            </div>
            
        </div>
    );
}

export default CouponInfo;