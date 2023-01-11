export interface Coupon{
    id:number | string;
    title: string;
    content: string;
    image: number;
    paper_color: string;
    book_id?: number;
    is_used?: boolean;
}
export interface CouponBook{
    id?:number;
    cover_color:string;
    title:string;
    publicationDate: string;
    expiredDate: string;
    coupons: Coupon[];
}

export interface Gift{
    id: number;
    book_id: number;
    isgifted: number;
}