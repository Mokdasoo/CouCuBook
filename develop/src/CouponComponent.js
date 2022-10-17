import './Coupon.scss';


const CouponComponent = (props) => {
    return(
        <div className='coupon-wrap'>
            <div className='coupon-flex'>
                <div className='title'><span>{props.title}</span></div>
                <div className='image'><img src={'/images/'+ props.img}></img></div>
                <div className='content'>{props.content}</div>
            </div>
            
        </div>
    );
}

export default CouponComponent;