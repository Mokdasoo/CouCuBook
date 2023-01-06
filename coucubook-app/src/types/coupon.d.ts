export interface Coupon{
    id:string;
    title: string;
    content: string;
    image: number;
    paper_color: string;

}
export interface CouponBook{
    id:string;
    cover_color:string;
    title:string;
    publicationDate: string;
    expiredDate: string;
    coupons: Coupon[];
}