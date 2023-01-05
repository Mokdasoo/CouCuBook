export interface Coupon{
    title: string;
    content: string;
    image: string;

}
export interface CouponBook{
    id:string;
    cover_color:string;
    title:string;
    publicationDate: string;
    expiredDate: string;
    coupons: Coupon[];
}