import CouponComponent from "./CouponComponent";
import './Coupon.scss';

const CouponList = (props) => {
    return(
        <div className="couponList-wrap">
            <CouponComponent/>
            <CouponComponent/>
            <CouponComponent/>
        </div>
    );
}

export default CouponList;