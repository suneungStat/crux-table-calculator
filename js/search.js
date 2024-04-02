// 초깃값 설정
const typeEls = document.querySelectorAll("input[name='test_type']");
let yearEl = document.querySelector("#year");   
let monthEl = document.querySelector("#month"); 
let typeEl = document.querySelector("input#sat");
let year, month, type; // 버튼을 눌렀을 때만 확정되는 값
let tbodyEl;
let ks, kw, kw1, kw2, kp, kb, kd, ms, mw, mw1, mw2, mp, mb, md, ew, ed, hw, hd;
let ex1s, ex1w, ex1p, ex1b, ex1d, ex2s, ex2w, ex2p, ex2b, ex2d, ss, sw, sd;

// select 요소의 option을 수정하는 함수
// SaM : Sat and Month일 때, 그러니까 시험 유형이 'sat'이고 'monthEl'을 바꿀 때만 true
function changeOpts(parent, newChild, SaM = false) {
    // 기존 옵션 삭제
    while(parent.firstElementChild) 
        parent.removeChild(parent.firstElementChild);

    // 새로운 옵션 추가
    newChild.forEach((newVal) => {
        const optEl = document.createElement("option");
        optEl.value = newVal;
        if(!SaM) {
            optEl.innerText = newVal;
        } else {
            if(newVal != "11") {
                optEl.innerText = "대학수학능력시험 " + newVal + "월 모의평가";
            } else {
                optEl.innerText = "대학수학능력시험";
            }
        }
        parent.appendChild(optEl);
    })
}

// 라디오버튼 바뀔 때 시험명 형식이 다르게 출력되도록
typeEls.forEach((type) => { 
    type.addEventListener("change", (e) => {
        typeEl = e.currentTarget;
        const type = typeEl.value;  // 전역 type은 버튼을 눌렀을 때만 변경되어야 하므로 지역 변수를 따로 선언
        const TNSE = document.querySelector("p#test_name > span");  // Test Name Span Element
        let years, months;

        // years와 months의 옵션 지정 ({수능, {3학년, {1,2학년}}}의 논리로 구성되어 있음)
        if(type == "sat") {
            years = ["2024"]; // 2025, 2023, 2022 추후에 추가
            months = ["6", "9", "11"];
            TNSE.innerText = ""
        } else {
            years = ["2023", "2022"]; // years는 1st~3rd가 공통됨 (2024, 2022, 2021 추후에 추가)
            if(type == "3rd") {
                months = ["3", "4", "7", "10"]; // 2024 추가 이후에는 5로 바꾸기
                TNSE.innerText = "월 고3 전국연합학력평가";
            } else {
                months = ["3", "6", "9", "11"]; // months는 1st, 2nd가 공통됨 (2024 추가 이후에는 10으로 바꾸기)
                if(type == "2nd")
                    TNSE.innerText = "월 고2 전국연합학력평가";
                else
                    TNSE.innerText = "월 고1 전국연합학력평가";
            }
        }
        changeOpts(yearEl, years);
        changeOpts(monthEl, months, type == "sat");
    })
})

// 2024학년도부터 고3은 4월 학평이 5월 학평으로 바뀌고
// 고1,2는 11월 학평이 10월 학평으로 바뀐다.
function yearChange() {
    yearEl = document.querySelector("#year");
    monthEl = document.querySelector("#month");

    if(type == "3rd") {
        const change = monthEl.children[1];
        if(parseInt(yearEl.value) >= 2024) {
            change.value = "5";
            change.innerText = "5";
        } else {
            change.value = "4";
            change.innerText = "4";
        }
    } else {
        const change = monthEl.children[3];
        if(parseInt(yearEl.value) >= 2024) {
            change.value = "10";
            change.innerText = "10";
        } else {
            change.value = "11";
            change.innerText = "11";
        }
    }
}

// 성적표 생성 함수
function makeTable() {
    // 기존에 띄운 통계자료 이미지 제거
    document.querySelector("div.image").firstElementChild.innerText = "";
    document.querySelector("img.formula").removeAttribute("src"); 
    document.querySelector("img.formula").removeAttribute("alt");
    document.querySelector("img.stat").removeAttribute("src");
    document.querySelector("img.stat").removeAttribute("alt");

    const divEl = document.querySelector("div.table");
    // year, month, type 확정
    year = yearEl.value;
    month = monthEl.value;
    type = typeEl.value;

    if(divEl.firstChild)
        divEl.removeChild(divEl.firstChild);
    
    // 국어와 수학이 공통/선택으로 나뉘어 있는가? 화면 너비가 760px 이상인가?
    if(type == "sat" || type == "3rd") 
            divEl.innerHTML = tableType2;
    else
        divEl.innerHTML = tableType1;

    tbodyEl = document.querySelector("tbody"); // 표 생성 후 tbody 요소 지정

    // 변수 초기화
    ks = document.querySelector("td.ks"); // 국어 선택과목 (1~2학년이면 NULL)
    kw = document.querySelector("td.kw"); // 국어 원점수 (3학년이면 NULL)
    kw1 = document.querySelector("td.kw1"); // 국어 공통과목 원점수 (1~2학년이면 NULL)
    kw2 = document.querySelector("td.kw2"); // 국어 선택과목 원점수 (1~2학년이면 NULL)
    kp = document.querySelector("td.kp"); // 국어 표준점수
    kb = document.querySelector("td.kb"); // 국어 백분위
    kd = document.querySelector("td.kd"); // 국어 등급
    ms = document.querySelector("td.ms"); // 수학 선택과목 (1~2학년이면 NULL)
    mw = document.querySelector("td.mw"); // 수학 원점수 (3학년이면 NULL)
    mw1 = document.querySelector("td.mw1"); // 수학 공통과목 원점수 (1~2학년이면 NULL)
    mw2 = document.querySelector("td.mw2"); // 수학 선택과목 원점수 (1~2학년이면 NULL)
    mp = document.querySelector("td.mp"); // 수학 표준점수
    mb = document.querySelector("td.mb"); // 수학 백분위
    md = document.querySelector("td.md"); // 수학 등급
    ew = document.querySelector("td.ew"); // 영어 원점수
    ed = document.querySelector("td.ed"); // 영어 등급
    hw = document.querySelector("td.hw"); // 한국사 원점수
    hd = document.querySelector("td.hd"); // 한국사 등급
    ex1s = document.querySelector("td.ex1s"); // 탐구1 선택과목
    ex1w = document.querySelector("td.ex1w"); // 탐구1 원점수 
    ex1p = document.querySelector("td.ex1p"); // 탐구1 표준점수
    ex1b = document.querySelector("td.ex1b"); // 탐구1 백분위
    ex1d = document.querySelector("td.ex1d"); // 탐구1 등급
    ex2s = document.querySelector("td.ex2s"); // 탐구2 선택과목
    ex2w = document.querySelector("td.ex2w"); // 탐구2 원점수 
    ex2p = document.querySelector("td.ex2p"); // 탐구2 표준점수
    ex2b = document.querySelector("td.ex2b"); // 탐구2 백분위
    ex2d = document.querySelector("td.ex2d"); // 탐구2 등급
    ss = document.querySelector("td.ss"); // 제2외국어/한문 선택과목
    sw = document.querySelector("td.sw"); // 제2외국어/한문 원점수 
    sd = document.querySelector("td.sd"); // 제2외국어/한문 등급 

    // 제2외국어 처리 부분
    if(type == "1st" || type == "2nd" && month != "10" && month != "11"
        || type == "3rd" && month != "10") {
        const sfl = document.querySelector(".sfl");
        sfl.parentNode.removeChild(sfl);
    } else {
        let sflList;
        if(type == "2nd" || type == "3rd" && month == "10") {
            sflList = ["독일어Ⅰ", "프랑스어Ⅰ", "스페인어Ⅰ", "중국어Ⅰ",
                "일본어Ⅰ", "러시아어Ⅰ", "한문Ⅰ"];
        } else {
            sflList = ["독일어Ⅰ", "프랑스어Ⅰ", "스페인어Ⅰ", "중국어Ⅰ",
                "일본어Ⅰ", "러시아어Ⅰ", "아랍어Ⅰ", "베트남어Ⅰ", "한문Ⅰ"];
        }
                
        const sflSelectEl = ss.firstChild;
        changeOpts(sflSelectEl, sflList);
    }

    // 탐구 처리 부분
    if(type == "1st") {
        // 1학년인가? (1학년이면 탐구 선택과목 자동 지정, 표준점수와 등급은 지원 안 됨)
        if(month == "3") {
            ex1s.innerText = "사회";
            ex2s.innerText = "과학";
        } else {
            ex1s.innerText = "통합 사회";
            ex2s.innerText = "통합 과학";
        }
        ex1p.innerText = ex1b.innerText = ex2p.innerText = ex2b.innerText = "-";
    } else {
        let expList;
        // 2학년 3~9월, 3학년 3월 (기본)
        if(type == "2nd" && month.length == 1 || type == "3rd" && month == "3")
            expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                "세계사", "경제", "정치와 법", "사회∙문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                "지구과학Ⅰ"];

        // 2학년 11(10)월 (기본에서 직업탐구 추가됨)
        if(type == "2nd" && month.length == 2)
            expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                "세계사", "경제", "정치와 법", "사회∙문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                "지구과학Ⅰ", "성공적인 직업생활", "농업 기초 기술", "공업 일반", "상업 경제", 
                "수산∙해운 산업 기초", "인간 발달"];

        // 3학년 4(5), 7월 (기본에서 투과목 추가됨)
        if(type == "3rd" && (month == "4" || month == "5" || month == "7"))
            expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
            "세계사", "경제", "정치와 법", "사회∙문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
            "지구과학Ⅰ", "물리학Ⅱ", "화학Ⅱ", "생명과학Ⅱ", "지구과학Ⅱ"];

        // 3학년 6월, 9월, 10월, 수능 (기본에서 투과목, 직업탐구 추가됨)
        if(type == "3rd" && month == "10" || type == "sat")
            expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                "세계사", "경제", "정치와 법", "사회∙문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                "지구과학Ⅰ", "물리학Ⅱ", "화학Ⅱ", "생명과학Ⅱ", "지구과학Ⅱ", "성공적인 직업생활",
                "농업 기초 기술", "공업 일반", "상업 경제", "수산∙해운 산업 기초", "인간 발달"];

        const exp1SelectEl = document.createElement("select");
        const exp2SelectEl = document.createElement("select");
        const onclickAttr1 = document.createAttribute("onclick");
        const onclickAttr2 = document.createAttribute("onclick");
        onclickAttr1.value = "showInfo()";
        onclickAttr2.value = "showInfo()";
        exp1SelectEl.setAttributeNode(onclickAttr1);
        exp2SelectEl.setAttributeNode(onclickAttr2);
        changeOpts(exp1SelectEl, expList);
        changeOpts(exp2SelectEl, expList);
        ex1s.appendChild(exp1SelectEl);
        ex2s.appendChild(exp2SelectEl);
    }

    // 국어&수학 선택과목 선택기
    if(type == "3rd" || type == "sat") {
        const korList = ["화법과 작문", "언어와 매체"];
        const mathList = ["확률과 통계", "미적분", "기하"];
        const korSelectEl = document.createElement("select");
        const mathSelectEl = document.createElement("select");
        changeOpts(korSelectEl, korList);
        changeOpts(mathSelectEl, mathList);
        ks.appendChild(korSelectEl);
        ms.appendChild(mathSelectEl);
        const onclickAttr1 = document.createAttribute("onclick");
        const onclickAttr2 = document.createAttribute("onclick");
        onclickAttr1.value = "showInfo()";        
        onclickAttr2.value = "showInfo()";
        korSelectEl.setAttributeNode(onclickAttr1);
        mathSelectEl.setAttributeNode(onclickAttr2);
    }

    // 테이블 제목
    const titleEl = document.querySelector("caption");
    if(type == "sat")  {
        if(monthEl.value == "11")
            titleEl.innerText = `${year}학년도 대학수학능력시험 성적 계산기`;
        else
            titleEl.innerText = `${year}학년도 대학수학능력시험 ${month}월 모의평가 성적 계산기`
    } else {
        titleEl.innerText = `${year}학년도 ${month}월 고${type.substring(0,1)} 전국연합학력평가 성적 계산기`
    }

    // 너비 조정 (2학년 10, 11월 학평)
    if(type == "2nd" && month.length == 2) {
        const thEl = document.querySelectorAll("th");
        thEl[0].getAttributeNode("width").value = "18%"
        thEl[1].getAttributeNode("width").value = "22%"
        thEl[2].getAttributeNode("width").value = "15%"
        thEl[3].getAttributeNode("width").value = "12%"
        thEl[4].getAttributeNode("width").value = "11%"
        thEl[5].getAttributeNode("width").value = "11%"
        thEl[6].getAttributeNode("width").value = "11%"
    }
}

function showInfo() {
    let key = year + month + type; // 딕셔너리형 데이터의 key

    // 국어&수학 처리 부분. 1~2학년은 if문에서, 3학년은 else문에서 처리
    if(type == "1st" || type == "2nd") {
        // 국어 처리 부분 (고1, 고2)
        const korScore = kw.firstChild.value; // 국어 원점수  
        const KSCN = kw.firstChild.getAttributeNode("style"); // 국어 원점수 스타일 노드
        // 국어 표준점수, 백분위, 등급 출력 부분 (고1, 고2)
        if(!korScore) {
            kp.innerText = kb.innerText = kd.innerText = ''; 
        } else if (0 <= korScore && korScore <= 100 
            && korScore != 1 && korScore != 99) {
            kp.innerText = data[key]["국어"][100-korScore][0];
            kb.innerText = data[key]["국어"][100-korScore][1];
            kd.innerText = data[key]["국어"][100-korScore][2];
            KSCN.value = "color: #3030EE";
        } else {
            kp.innerText = kb.innerText = kd.innerText = 'X'; 
            KSCN.value = "color: #EE3030";
        }

        // 수학 처리 부분 (고1, 고2)
        const mathScore = mw.firstChild.value; // 수학 원점수
        const mathScoreColor = mw.firstChild.getAttributeNode("style"); // 스타일 노드
        // 수학 표준점수, 백분위, 등급 출력 부분 (고1, 고2)
        if(!mathScore) {
            mp.innerText = mb.innerText = md.innerText = ''; 
        } else if (0 <= mathScore && mathScore <= 100 && mathScore != 1 && mathScore != 99) {
            mp.innerText = data[key]["수학"][100-mathScore][0];
            mb.innerText = data[key]["수학"][100-mathScore][1];
            md.innerText = data[key]["수학"][100-mathScore][2];
            mathScoreColor.value = "color: #3030EE";
        } else {
            mp.innerText = mb.innerText = md.innerText = 'X'; 
            mathScoreColor.value = "color: #EE3030";
        }
        mw.firstChild.setAttributeNode(mathScoreColor);
    } else {
        // 국어 처리 부분 (고3, 수능)
        const korChoice = ks.firstChild.value; // 국어 선택과목
        const korScore1 = kw1.firstChild.value; // 국어 공통과목 원점수
        const korScore2 = kw2.firstChild.value; // 국어 선택과목 원점수
        const KSSN1 = kw1.firstChild.getAttributeNode("style"); // 국어 공통과목 원점수 스타일 노드 (Korean Score Style Node 1)
        const KSSN2 = kw2.firstChild.getAttributeNode("style"); // 국어 선택과목 원점수 스타일 노드 (Korean Score Style Node 2)
        const korValidity1 = (0 <= korScore1 && korScore1 <= 76 && korScore1 != 1 && korScore1 != 75); // 국어 공통과목 원점수 유효성
        const korValidity2 = (0 <= korScore2 && korScore2 <= 24 && korScore2 != 1 && korScore2 != 23); // 국어 선택과목 원점수 유효성
        const korMemory = data[key]["국어"][0][korChoice] // 국어 표준점수 산출식 저장된 곳

        KSSN1.value = korValidity1 ? "color: #3030EE" : "color: #EE3030"; // 공통과목 원점수 유효하면 파란색, 아니면 빨간색
        KSSN2.value = korValidity2 ? "color: #3030EE" : "color: #EE3030"; // 선택과목 원점수 유효하면 파란색, 아니면 빨간색

        // 국어 표준점수, 백분위, 등급 출력 부분 (고3, 수능)
        if(!korScore1 || !korScore2) {
            kp.innerText = kb.innerText = kd.innerText = ''; 
        } else if (korValidity1 && korValidity2) {
            const korStandard = parseInt(korMemory[0] * parseInt(korScore1) 
                + korMemory[1] * parseInt(korScore2) + korMemory[2] + 0.5);
            kp.innerText = korStandard;

            let idx = 1;
            while(data[key]["국어"][idx][0] != korStandard) idx++;
            kb.innerText = data[key]["국어"][idx][1];
            kd.innerText = data[key]["국어"][idx][2];
        } else {
            kp.innerText = kb.innerText = kd.innerText = 'X'; 
        }

        // 수학 처리 부분 (고3, 수능)
        const mathChoice = ms.firstChild.value; // 수학 선택과목
        const mathScore1 = mw1.firstChild.value; // 수학 공통과목 원점수
        const mathScore2 = mw2.firstChild.value; // 수학 선택과목 원점수
        const MSSN1 = mw1.firstChild.getAttributeNode("style"); // 수학 공통과목 원점수 스타일 노드 (Math Score Style Node 1)
        const MSSN2 = mw2.firstChild.getAttributeNode("style"); // 수학 선택과목 원점수 스타일 노드 (Math Score Style Node 2)
        const MathValidity1 = (0 <= mathScore1 && mathScore1 <= 74 && mathScore1 != 1 && mathScore1 != 73);
        const MathValidity2 = (0 <= mathScore2 && mathScore2 <= 26 && mathScore2 != 1 && mathScore2 != 25);
        const mathMemory = data[key]["수학"][0][mathChoice] // 수학 표준점수 산출식 저장된 곳

        MSSN1.value = MathValidity1 ? "color: #3030EE" : "color: #EE3030"; // 공통과목 원점수 유효하면 파란색, 아니면 빨간색
        MSSN2.value = MathValidity2 ? "color: #3030EE" : "color: #EE3030"; // 선택과목 원점수 유효하면 파란색, 아니면 빨간색

        // 수학 표준점수, 백분위, 등급 출력 부분 (고3, 수능)
        if(!mathScore1 || !mathScore2) {
            mp.innerText = mb.innerText = md.innerText = ''; 
        } else if (MathValidity1 && MathValidity2) {
            const mathStandard = parseInt(mathMemory[0] * parseInt(mathScore1) 
                + mathMemory[1] * parseInt(mathScore2) + mathMemory[2] + 0.5);
                mp.innerText = mathStandard;

            let idx = 1;
            while(data[key]["수학"][idx][0] != mathStandard) idx++;
            mb.innerText = data[key]["수학"][idx][1];
            md.innerText = data[key]["수학"][idx][2];
        } else {
            mp.innerText = mb.innerText = md.innerText = 'X'; 
        }
    }

    // 영어 처리 부분
    const engScore = ew.firstChild.value; // 영어 원점수
    const ESSN = ew.firstChild.getAttributeNode("style");
    ed.innerText = 
        engScore == "" ? "" :
        engScore == 100 ? 1 : 
        0 <= engScore && engScore <= 9 && engScore != 1 ? 9 :
        2 <= engScore && engScore <= 98 ? 10-parseInt(engScore/10) : 
        "X";
    ESSN.value = ed.innerText != "X" ? "color: #3030EE" : "color: #EE3030";

    // 한국사 처리 부분
    const histScore = hw.firstChild.value; // 한국사 원점수
    const HSSN = hw.firstChild.getAttributeNode("style");
    hd.innerText = 
        histScore == "" ? "" :
        histScore == 50 ? 1 : 
        45 <= histScore && histScore <= 48 ? 1 :
        2 <= histScore && histScore <= 44 || histScore == 0 ? 10-parseInt(histScore/5+1) : 
        "X";
    HSSN.value = hd.innerText != "X" ? "color: #3030EE" : "color: #EE3030";

    // 탐구 처리 부분
    const exp1Score = ex1w.firstChild.value; // 탐구1 원점수
    const exp2Score = ex2w.firstChild.value; // 탐구2 원점수
    const Ex1SSN = ex1w.firstChild.getAttributeNode("style");
    const Ex2SSN = ex2w.firstChild.getAttributeNode("style");
    if(type == "1st") {
        // 1학년 탐구는 절대평가
        ex1d.innerText = 
            exp1Score == "" ? "" :
            exp1Score == 50 ? 1 : 
            45 <= exp1Score && exp1Score <= 48 ? 1 :
            2 <= exp1Score && exp1Score <= 44 || exp1Score == 0 ? 10-parseInt(exp1Score/5+1) : 
            "X"
        Ex1SSN.value = ex1d.innerText != "X" ? "color: #3030EE" : "color: #EE3030";
        
        ex2d.innerText = 
            exp2Score == "" ? "" :
            exp2Score == 50 ? 1 : 
            45 <= exp2Score && exp2Score <= 48 ? 1 :
            2 <= exp2Score && exp2Score <= 44 || exp2Score == 0 ? 10-parseInt(exp2Score/5+1) : 
            "X"
        Ex2SSN.value = ex2d.innerText != "X" ? "color: #3030EE" : "color: #EE3030";
    } else {
        let subject = ex1s.firstChild.value;
        // 원점수 처리 (탐구 1선택)
        if(!exp1Score) {
            ex1p.innerText = ex1b.innerText = ex1d.innerText = ''; 
        } else if (0 <= exp1Score && exp1Score <= 50 && exp1Score != 1 && exp1Score != 49) {
            ex1p.innerText = data[key][subject][50-exp1Score][0];
            ex1b.innerText = data[key][subject][50-exp1Score][1];
            ex1d.innerText = data[key][subject][50-exp1Score][2];
        } else {
            ex1p.innerText = ex1b.innerText = ex1d.innerText = 'X'; 
        }
        Ex1SSN.value = ex1d.innerText != "X" ? "color: #3030EE" : "color: #EE3030";

        subject = ex2s.firstChild.value;
        // 원점수 처리 (탐구 2선택)
        if(!exp2Score) {
            ex2p.innerText = ex2b.innerText = ex2d.innerText = ''; 
        } else if (0 <= exp2Score && exp2Score <= 50 && exp2Score != 1 && exp2Score != 49) {
            ex2p.innerText = data[key][subject][50-exp2Score][0];
            ex2b.innerText = data[key][subject][50-exp2Score][1];
            ex2d.innerText = data[key][subject][50-exp2Score][2];
        } else {
            ex2p.innerText = ex2b.innerText = ex2d.innerText = 'X'; 
        }
        Ex2SSN.value = ex2d.innerText != "X" ? "color: #3030EE" : "color: #EE3030";
    }

    // 제2외국어&한문 처리 부분
    if(tbodyEl.children.length == 7) {
        const sflScore = sw.firstChild.value; // 제2외국어 원점수
        const SSSN = sw.firstChild.getAttributeNode("style");
        sd.innerText = 
            sflScore == "" ? "" :
            sflScore == 50 ? 1 : 
            0 <= sflScore && sflScore <= 4 ? 9 :
            5 <= sflScore && sflScore <= 49 ? 10-parseInt(sflScore/5) : 
            "X"
        SSSN.value = sd.innerText != "X" ? "color: #3030EE" : "color: #EE3030";
    }            
}

// 크럭스 테이블 이미지 출력
function printTable (subNum) {
    document.querySelector("div.image").firstElementChild.innerText = "통계자료 이미지";
    const tbodyEl = document.querySelector("tbody");
    const imgEl = document.querySelectorAll("div.image > img");
    const subEl = tbodyEl.children[subNum].children;
    let subjectName;
    if(subNum <= 3) {
        subjectName = subEl[0].innerText;
    } else {
        if(type == "1st") {
            if(subNum == 5)
                subjectName = subEl[0].innerText;
            else   
                subjectName = subEl[1].innerText;
        } else {
            if(subNum == 5)
                subjectName = subEl[0].firstElementChild.value;
            else   
                subjectName = subEl[1].firstElementChild.value;
        }
    }
        
    const srcAttr = document.createAttribute("src");
    const altAttr = document.createAttribute("alt");
    srcAttr.value = "./img/" + year + "/" + type + "/" + month + "/" + subjectName + ".png"
    imgEl[1].setAttributeNode(srcAttr);
    
    altAttr.value = "미지원"
    imgEl[1].setAttributeNode(altAttr);

    // 3학년 국/수 표준점수 산출 공식
    if((type == "3rd" || type == "sat") && (subNum == "0" || subNum == "1")) {
        const srcAttr = document.createAttribute("src");
        srcAttr.value = "./img/" + year + "/" + type + "/" + month + "/공식.png";
        imgEl[0].setAttributeNode(srcAttr);
    } else {
        imgEl[0].removeAttribute("src");
    }
} 
