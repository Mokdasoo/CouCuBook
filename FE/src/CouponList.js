import CouponComponent from "./CouponComponent";
import './Coupon.scss';
import './CouponBooks.scss';
import HTMLFlipBook from "react-pageflip";
import { useRef, useEffect } from "react";

const CouponList = (props) => {

    const coupon = useRef();
    
    return(
        <div className="couponList-wrap">
            
            <button type="button" onClick={props.closeList}>X</button>
            <HTMLFlipBook
            //100:140 rate
                width={600}
                height={840}
                minWidth={500}
                minHeight={700}
                maxWidth={900}
                maxHeight={1260}
                size="stretch"
                maxShadowOpacity={0.5}
                mobileScrollSupport={true}
                className="select-book"
                flippingTime={1000}
                usePortrait = {true}
                ref={coupon}
                >
                <div className="bookinner couponList couponList-before">
                    {/* <img src='/images/paperTexture.png' alt='CouponBook'/> */}
                    {/* 쿠폰사용전 */}


                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주기'} img={'005.JPG'} />
                    <CouponComponent title={'무조건 용서 쿠폰'} content={'바람피우고 도박한게 아니라면 한번쯤은 무조건 용서 해주기'} img={'005.JPG'} />
                    <CouponComponent title={'전신마사지 쿠폰'} content={'머리부터 발끝까지 조물조물 피로를 풀어줘! 최소 30분~'} img={'023.JPG'} />
                    <CouponComponent title={'오늘 하루 무조건 내말 듣기 쿠폰'} content={'갑을 관계 형성!!!'} img={'026.JPG'} />
                    <CouponComponent title={'내가 한턱 쏜다 쿠폰'} content={'은영이가 원하는 메뉴로 사주기'} img={'035.JPG'} />
                    <CouponComponent title={'맛집 쿠폰'} content={'은영이가 가고 싶은 맛집 탐방하기'} img={'034.JPG'} />
                    <CouponComponent title={'뽀뽀나 할까 쿠폰'} content={'뽀뽀나 찐하게 한번 할까'} img={'008.JPG'} />
                    <CouponComponent title={'무한 칭찬 쿠폰'} content={'하루 무엇을 하든 칭찬만 해주기, 단 나쁜짓 제외'} img={'012.JPG'} />
                    <CouponComponent title={'오늘은 내가 요리사 쿠폰'} content={'원하는 음식 동근이가 해드려요'} img={'013.JPG'} />
                    <CouponComponent title={'영화 관람 쿠폰'} content={'보고싶은 영화가 있다고요? 어서 CGV로 달려가죠!'} img={'015.JPG'} />
                    <CouponComponent title={'소원을 말해봐 쿠폰'} content={'소원을 한가지 들어 드립니다~'} img={'031.JPG'} />
                    <CouponComponent title={'모닝콜 쿠폰'} content={'일어나기 힘든 아침 동근이가 깨워드려요'} img={'022.JPG'} />
                    <CouponComponent title={'나의 대리 기사 쿠폰'} content={'데리러 와달라고요? 당장 달려갑니다~'} img={'039.JPG'} />
                    <CouponComponent title={'만나러 와주기 쿠폰'} content={'동근이가 만나러 가겠습니다!'} img={'038.JPG'} />
                    <CouponComponent title={'노래 불러주기 쿠폰'} content={'듣고 싶은 노래가 있나요? 동근이가 불러 드려요'} img={'017.JPG'} />
                    <CouponComponent title={'안아주기 쿠폰'} content={'그만할 때까지 꼭 안아주기'} img={'024.JPG'} />
                    <CouponComponent title={'존댓말 해주기 쿠폰'} content={'하루동안 존댓말을 써드립니다'} img={'013.JPG'} />
                    <CouponComponent title={'아이스크림 사줘 쿠폰'} content={'아이스크림 사주께~'} img={'033.JPG'} />
                    <CouponComponent title={'밥 먹여주기 쿠폰'} content={'넌 가만히 있어! 받아 먹기만 해~'} img={'019.JPG'} />
                    <CouponComponent title={'드라이브 가기 쿠폰'} content={'드라이브로 가고 싶은 곳이 있나요? 단 미리 예약 필수!'} img={'002.JPG'} />
                    <CouponComponent title={'불타는 밤 보내기 쿠폰'} content={'힛'} img={'009.JPG'} />
                    <CouponComponent title={'설거지 쿠폰'} content={'설거지 한번 해주기~'} img={'011.JPG'} />
                    <CouponComponent title={'삐짐 해제 쿠폰'} content={'꽁해 있는 거 이제 그만 할게'} img={'029.JPG'} />
                    <CouponComponent title={'동근이 집돌이 쿠폰'} content={'동근이가 밖으로 놀러나가 안들어간다? 집으로 바로 들어가게 하기'} img={'001.JPG'} />
                    <CouponComponent title={'원하는 데이트 코스 쿠폰'} content={'은영이가 원하는 데이트 코스로 하루 놀기'} img={'003.JPG'} />
                    <CouponComponent title={'오다가 주웠다 쿠폰'} content={'동근이에게 깜짝 선물을 요구할 수 있다'} img={'027.JPG'} />
                    <CouponComponent title={'사랑의 도시락 쿠폰'} content={'은영이를 위한 동근이의 사랑의 도시락~'} img={'014.JPG'} />
                    <CouponComponent title={'여유롭게 음료 한잔 쿠폰'} content={'카페에 가서 후식 쏜다~'} img={'007.JPG'} />
                    <CouponComponent title={'흑기사 쿠폰'} content={'동근이가 무엇이든 하나 대신해드립니다~'} img={'020.JPG'} />
                    <CouponComponent title={'12시 허용 쿠폰'} content={'친구들이랑 놀다가 밤12시를 넘겼다고요? 용서해 드릴게~'} img={'029.JPG'} />
                    <CouponComponent title={'화풀어줘 쿠폰'} content={'다른일에 화가 났어? 오빠가 풀어줄게'} img={'018.JPG'} />
                    <CouponComponent title={'안마 쿠폰'} content={'뭉친곳이 있나요? 동근이가 풀어드립니다'} img={'022.JPG'} />
                    <CouponComponent title={'잔소리 멈춰! 쿠폰'} content={'오늘 하루 잔소리를 안들을 수 있습니다~'} img={'028.JPG'} />
                    <CouponComponent title={'꿈나라 쿠폰'} content={'하루종일 잠자게 내버려 두기'} img={'030.JPG'} />
                    <CouponComponent title={'옵치 같이 하쟝 쿠폰'} content={'오버워치 은영이가 원하는 걸로 같이 하기! '} img={'037.JPG'} />
                    <CouponComponent title={'볼에 뽀뽀 스탬프 쿠폰'} content={'하루종일 뽀뽀 해드립니다'} img={'008.JPG'} />
                    <CouponComponent title={'무엇을 도와드릴까요 쿠폰'} content={'도움이 필요한 곳에 쓰세요!'} img={'006.JPG'} />
                    <CouponComponent title={'뱃살 이용권 쿠폰'} content={'쪼물딱 쪼물딱 마음껏~'} img={'004.JPG'} />
                    <CouponComponent title={'껌딱지 쿠폰'} content={'하루종일 껌딱지처럼 붙어 있겠습니다~'} img={'025.JPG'} />
                    <CouponComponent title={'하고 싶은거 있어 쿠폰'} content={'뭐하고 싶은데? 당장 해줄게!'} img={'036.JPG'} />





                </div>
                {/* <div className="bookinner couponList couponList-after">
                    <img src='/images/paperTexture.png' alt='CouponBook'/>
                    쿠폰사용후
                </div> */}

            </HTMLFlipBook>
        </div>

    );
}

export default CouponList;