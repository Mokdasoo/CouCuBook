import HTMLFlipBook from "react-pageflip";
import React, { useState, useRef, useEffect } from 'react';
import CouponList from './CouponList';
import { Link } from "react-router-dom";

const CouponBookComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectBook = useRef();
    const openBook = useRef();
    
    const clickBook = () => {
      if(isOpen === false) setIsOpen(true);
    }
    const handleClickOutside = ({ target }) => {
      console.log(openBook.current);
      if (isOpen && !openBook.current.contains(target)) setIsOpen(false);
    };
    useEffect(()=>{
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div>
        {isOpen && <CouponList ref={openBook} propsRef={openBook}/>}
        <div className='couponBook-wrap' ref={selectBook}>
            
            <div className='bookInfo'>
              <div className="bookInfo_to">
                <span>{props.writer}님이 보낸</span>
              </div>
              <div className="bookInfo_title">
                <span>{props.title}</span>
              </div>
              <div className="bookInfo_time">
                <span>유효기간: ~{props.time}</span>
              </div>
            </div>
            <HTMLFlipBook
            width={150}
            height={210}
            // size="stretch"
            // minWidth={315}
            maxWidth={1000}
            // minHeight={400}
            // maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="demo-book"
            flippingTime={2000}
            
            >
              <div className="bookcover" onClick={clickBook}><img src='/images/bookCover.png' alt='CouponBook'/><p>{props.img}</p></div>
              <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
              <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
              <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
              <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
              <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
              <div className="bookinner"><img src='/images/paperTexture.png' alt='CouponBook'/></div>
            </HTMLFlipBook>
            
        </div>
        
      </div>
        
    );
}

export default CouponBookComponent;