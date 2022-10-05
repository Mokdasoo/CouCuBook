import './CouponBooks.scss';
import HTMLFlipBook from "react-pageflip";
import React, { useState } from 'react';

const CouponBooks = (props) => {
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    console.log(props);
    
    
    

    return(
        <div className='bookList-wrap'>
            <HTMLFlipBook
            width={300}
            height={200}
            // size="stretch"
            // minWidth={315}
            // maxWidth={1000}
            // minHeight={400}
            // maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="demo-book"
          >

            <div className="bookcover">
                <p>쿠폰북</p>
            </div>
            <div className="bookinner"></div>
            <div className="bookinner"></div>

          </HTMLFlipBook>
        </div>
        

    );
}
export default CouponBooks;