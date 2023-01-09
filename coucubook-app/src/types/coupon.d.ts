export interface Coupon{
    id:number | string;
    title: string;
    content: string;
    image: number;
    paper_color: string;
    book_id?: number;

}
export interface CouponBook{
    id?:number;
    cover_color:string;
    title:string;
    publicationDate: string;
    expiredDate: string;
    coupons: Coupon[];
}