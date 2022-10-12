import CouponComponent from "./CouponComponent";
import './Coupon.scss';
import HTMLFlipBook from "react-pageflip";
import { useRef } from "react";
import listModal from 'react-modal';

const CouponList = (props) => {

    const list = useRef();
    const closeList = () => {
        list.current.remove();
    }
    
    return(
        <listModal isOpen={props.isOpen}>
        <div className="couponList-wrap" ref={list}>
            <button type="button" onClick={closeList}>X</button>
            <HTMLFlipBook
            //100:140 rate
                width={500}
                height={700}
                maxWidth={1000}
                maxHeight={1400}
                size="stretch"
                maxShadowOpacity={0.5}
                mobileScrollSupport={true}
                className="select-book"
                flippingTime={1000}
                usePortrait = {false}
                >
                <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
                <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
                <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
                <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
            </HTMLFlipBook>
        </div>

        </listModal>
    );
}

export default CouponList;