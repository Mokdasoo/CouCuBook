import './CouponBooks.scss';
import CouponBook from './CouponBookComponent';


const CouponBooksList = (props) => {
    // console.log(props);
    
    
    

    return(
      <div>
        
        <div className='bookList-wrap'>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127881;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127881;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127881;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
          <CouponBook title='생일기념쿠폰북' writer='이동근' time='2022-12-31' img='&#127856;'/>
        </div>
      </div>
        
    );
}
export default CouponBooksList;