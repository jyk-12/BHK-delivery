let failCount = 0;

const correctTracking = "BHK20000925";

const correctPhones = [
    "01090134684",
    "01090362840"
];
const PAGE_SIZE = 5;
let deliveryPage = 0;


// ==============================
// 운송장 조회
// ==============================

function checkTracking(){

    let tracking =
        document.getElementById("trackingNumber").value.trim().toUpperCase();

    let result =
        document.getElementById("result");


    // ==========================
    // 운송장 번호가 틀렸을 경우
    // ==========================

    if(tracking !== correctTracking){

        failCount++;


        // 5회 이상 실패
        if(failCount >= 5){

            result.innerHTML =
                "🔒 조회가 제한되었습니다.<br><br>" +
                "본인 인증 후 다시 조회할 수 있습니다.<br><br>" +
                "<button onclick='openVerification()'>" +
                "본인 인증하기" +
                "</button>";

        }


        // 3~4회 실패
        else if(failCount >= 3){

            result.innerHTML =
                "💡 힌트<br>" +
                "운송장 번호는 'BHK'로 시작하며 가장 특별한 날짜가 포함되어 있습니다.<br><br>" +
                "현재 실패 횟수 : " + failCount + "회";

        }


        // 1~2회 실패
        else{

            result.innerHTML =
                "❌ 운송장 번호가 올바르지 않습니다.<br>" +
                "현재 실패 횟수 : " + failCount + "회";

        }

        return;
    }


    // ==========================
    // 올바른 운송장 번호
    // ==========================

    document.getElementById("trackingNumber").style.display = "none";

    document.getElementById("searchButton").style.display = "none";

    const notice = document.getElementById("notice");
if (notice) {
    notice.style.display = "none";
}


    result.innerHTML =
        "📦 배송 정보를 조회하는 중입니다...";


    setTimeout(function(){

        result.innerHTML =
            "🖥 BHK 서버에 접속 중입니다...";

    },1500);


    setTimeout(function(){

        result.innerHTML =
            "🔐 보안 시스템을 확인하는 중입니다...";

    },3000);


   setTimeout(function(){

    result.innerHTML = `
        <div class="photoPopup">

            <h2>📦 조회 완료</h2>

            <div class="photoFrame">
                <img src="images/birthday.jpg">
            </div>

            <button onclick="showDeliveryInfo()">
                배송정보 확인하기 →
            </button>

        </div>`;
    },4500);

}


// ==============================
// 본인 인증창 열기
// ==============================

function openVerification(){

    let modal =
        document.getElementById("verificationModal");

    modal.style.display = "flex";

}


// ==============================
// 본인 인증창 닫기
// ==============================

function closeVerification(){

    let modal =
        document.getElementById("verificationModal");

    modal.style.display = "none";

}


// ==============================
// 휴대폰 번호 본인 인증
// ==============================

function verifyPhone(){

    let phone =
        document.getElementById("phoneNumber").value.trim();

    let verificationMessage =
        document.getElementById("verificationMessage");


    // 번호가 틀렸을 경우

  if(!correctPhones.includes(phone)){

    verificationMessage.innerHTML =
        "❌ 등록된 정보와 일치하지 않습니다.";

    return;

}


    // 번호가 맞았을 경우

    verificationMessage.innerHTML =
        "✅ 본인 인증이 완료되었습니다!";


    setTimeout(function(){

        closeVerification();

        failCount = 0;


        document.getElementById("result").innerHTML =
            "🔓 조회 제한이 해제되었습니다.<br><br>" +
            "운송장 번호를 다시 입력해주세요.";


        document.getElementById("trackingNumber").style.display =
            "block";


        const notice = document.getElementById("notice");
if (notice) {
    notice.style.display = "block";
}


        document.getElementById("notice").style.display =
            "block";


        document.getElementById("trackingNumber").value = "";


    },1500);

}

// ==============================
// 다음 배송 단계
// ==============================
function nextDeliveryStep(){

    let result = document.getElementById("result");

    const now = new Date();


    // ==============================
    // 배송 단계 공개 계산
    // (각 배송 단계의 open 시간 기준)
    // ==============================

    let stage = 0;


    // 배송 단계
    const deliveries = [

        {
            open:"2026-08-23T14:20:00",
            date:"2026.08.29 23:40",
            location:"BHK ONLINE",
            status:"BHK 온라인 접수 완료"
        },

        {
            open:"2026-08-30T00:45:00",
            date:"2026.08.30 00:40",
            location:"서울 집화센터",
            status:"운송장 등록 완료"
        },

        {
            open:"2026-08-31T15:50:00",
            date:"2026.08.31 15:40",
            location:"서울 HUB",
            status:"상품 입고"
        },

        {
            open:"2026-08-31T23:25:00",
            date:"2026.08.31 23:20",
            location:"서울 HUB",
            status:"간선상차"
        },

        {
            open:"2026-09-01T11:20:20",
            date:"2026.09.01 11:20",
            location:"곤지암 HUB",
            status:"상품 하차"
        },

        {
            open:"2026-09-01T20:00:00",
            date:"2026.09.01 19:30",
            location:"곤지암 HUB",
            status:"상품 분류"
        },

        {
            open:"2026-09-02T00:30:00",
            date:"2026.09.01 23:10",
            location:"곤지암 HUB",
            status:"📦 물류센터 분류 작업 진행 중"
        },

        {
            open:"2026-09-02T22:00:00",
            date:"2026.09.02 21:30",
            location:"곤지암 HUB",
            status:"상품 상차"
        },

        {
            open:"2026-09-03T03:20:00",
            date:"2026.09.03 02:50",
            location:"서울 동부 물류센터",
            status:"상품 하차"
        },

        {
            open:"2026-09-03T19:20:00",
            date:"2026.09.03 18:50",
            location:"서울 동부 물류센터",
            status:"상품 상차"
        },

        {
            open:"2026-09-04T00:10:00",
            date:"2026.09.03 23:45",
            location:"송파영업소",
            status:"상품 하차"
        },

        {
            open:"2026-09-04T10:10:00",
            date:"2026.09.04 09:30",
            location:"송파영업소",
            status:"배송 권역 분류"
        },

        {
            open:"2026-09-04T15:30:00",
            date:"2026.09.04 13:30",
            location:"송파영업소",
            status:"🚚 배송 권역 배정 작업 진행 중"
        },

        {
            open:"2026-09-04T22:00:00",
            date:"2026.09.04 21:30",
            location:"석촌동 배송권역",
            status:"배송 영업소 출발"
        },

         {
            open:"2026-09-05T00:40:00",
            date:"2026.09.05 00:30",
            location:"석촌동 배송권역",
            status:"배송 영업소 도착"
        },


        {
            open:"2026-09-05T09:40:00",
            date:"2026.09.05 09:30",
            location:"석촌1 배송권역",
            status:"담당 배송원 배정"
        },

        {
            open:"2026-09-05T11:35:00",
            date:"2026.09.05 11:30",
            location:"석촌1 배송권역",
            status:"배송 출발"
        },

        {
            open:"2026-09-05T12:15:00",
            date:"2026.09.05 12:10",
            location:"석촌역 인근",
            status:"목적지 인근 이동 중"
        }

    ];

    // 현재 공개된 배송 단계 계산
    for(let i = 0; i < deliveries.length; i++){

        if(now >= new Date(deliveries[i].open)){
            stage++;
        }

    }

    const totalPages = Math.max(1, Math.ceil(stage / PAGE_SIZE));

    if(deliveryPage >= totalPages){
        deliveryPage = totalPages - 1;
    }

    const start = deliveryPage * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, stage);

    let html = `
        <div class="deliveryResult">

            <h2>🚚 배송 현황</h2>

            <p>
                현재 배송이 정상적으로 진행되고 있습니다.
            </p>

            <hr>
    `;

    for(let i = start; i < end; i++){

        html += `
            <div class="deliveryStep">

                <p><b>🟢 ${deliveries[i].date}</b></p>

                <p>📍 ${deliveries[i].location}</p>

                <p>${deliveries[i].status}</p>

            </div>
        `;

        if(i < end - 1){
            html += `<p class="deliveryArrow">↓</p>`;
        }

    }

    html += `
<div class="deliveryPaging">

    ${
        deliveryPage > 0
        ? `<button onclick="prevDeliveryPage()">◀</button>`
        : ``
    }

    ${
        deliveryPage < totalPages - 1
        ? `<button onclick="nextDeliveryPage()">▶</button>`
        : ``
    }

</div>
`;

    if(stage < deliveries.length && deliveryPage === totalPages - 1){

    html += `
        <hr>

        <p>
            🔒 새로운 배송 정보가 준비되고 있습니다.

        </p>

        <p>
            다음 배송 단계는 예정된 시간에 자동으로 공개됩니다.
        </p>
    `;

}
    if(stage >= 16){

        html += `
            <br>

            <button class="detailButton"
                    onclick="showDeliveryDetail()">
                배송 상세보기 →
            </button>
        `;

    }

    html += `
        </div>
    `;

    result.innerHTML = html;

} // ← nextDeliveryStep() 끝
   
function showDeliveryDetail(){

    let result = document.getElementById("result");

    result.innerHTML = `
        <div class="deliveryResult">

            <h2>📦 배송 상세정보</h2>

            <p class="deliveryStatus">
                🟢 배송 진행 중
            </p>

            <hr>

            <p>
                <b>📍 현재 위치</b><br>
                석촌동 인근
            </p>

            <p>
                <b>👨‍💼 담당 배송기사</b><br>
                석촌1 배송권역<br>
                강주연 · 배수현 기사
            </p>

            <p>
                <b>📞 배송 문의</b><br>
                010-1004-0925<br>
                010-9036-2840
            </p>

            <hr>

            <p>
                <b>🛰 실시간 배송 위치</b>
            </p>

            <div class="liveLocation">
                📍 배송 차량이 목적지 방향으로 이동 중입니다.
            </div>

            <br>

            <button class="locationButton"
                    onclick="refreshLocation()">
                📍 위치 새로고침
            </button>

            <br><br>

            <button class="backButton"
                    onclick="nextDeliveryStep()">
                ↩️ 배송현황으로 돌아가기
            </button>

        </div>
    `;

}



function refreshLocation(){

    let locationMessage =
        document.querySelector(".liveLocation");

    locationMessage.innerHTML =
        "📡 현재 위치를 확인하는 중입니다...";

    const locations = [

        "📍 석촌역 1번 출구 방향으로 이동 중",
        "📍 잠실역 근처 인근 이동 중",
        "📍 배송원이 주소를 찾고 있습니다.",
        "📍 배송 차량이 목적지 인근에 도착했습니다."

    ];

    setTimeout(function(){

        let random =
            Math.floor(Math.random() * locations.length);

        locationMessage.innerHTML =
            locations[random];

    },1500);

}

// ==============================
// 배송정보 화면
// ==============================

function showDeliveryInfo(){

    let result = document.getElementById("result");

    result.innerHTML = `
        <div class="deliveryResult">

            <h2>📦 배송정보</h2>

            <p class="deliveryStatus">
                🟢 배송 접수 완료
            </p>

            <hr>

            <p>
                <b>운송장 번호</b><br>
                BHK20000925
            </p>

            <p>
                <b>발송인</b><br>
                K_MEDIA_EVENT
            </p>

            <p>
                <b>수령인</b><br>
                특별한 오늘의 주인공
            </p>

            <p>
                <b>배송 품목</b><br>
                소중한 선물 1건
            </p>

            <p>
                <b>배송 예정일</b><br>
                2026년 9월 5일
            </p>

            <p>
                <b>현재 상태</b><br>
                BHK 온라인 접수가 완료되었습니다.
            </p>

            <br>

            <button class="deliveryButton"
                    onclick="nextDeliveryStep()">
                배송 현황 확인하기 →
            </button>

        </div>
    `;

}

function prevDeliveryPage(){

    if(deliveryPage > 0){

        deliveryPage--;

        nextDeliveryStep();

    }

}

function nextDeliveryPage(){

    deliveryPage++;

    nextDeliveryStep();

}