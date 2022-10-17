import CouponComponent from "./CouponComponent";
import './Coupon.scss';
import './CouponBooks.scss';
import HTMLFlipBook from "react-pageflip";
import { useRef, useEffect } from "react";

const CouponList = (props) => {

    const coupon = useRef();
    
    return(
        <div className="couponList-wrap">
            
            <button type="button" onClick={props.closeList}>X</button>
            <HTMLFlipBook
            //100:140 rate
                width={600}
                height={840}
                minWidth={500}
                minHeight={700}
                maxWidth={900}
                maxHeight={1260}
                size="stretch"
                maxShadowOpacity={0.5}
                mobileScrollSupport={true}
                className="select-book"
                flippingTime={1000}
                usePortrait = {true}
                ref={coupon}
                >
                <div className="bookinner couponList couponList-before">
                    {/* <img src='/images/paperTexture.png' alt='CouponBook'/> */}
                    {/* 쿠폰사용전 */}


                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주시오'} img={'logo.png'} />


                </div>
                <div className="bookinner couponList couponList-after">
                    <img src='/images/paperTexture.png' alt='CouponBook'/>
                    {/* 쿠폰사용후 */}
                



                </div>

            </HTMLFlipBook>
        </div>

    );
}

export default CouponList;