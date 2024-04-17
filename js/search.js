// 초깃값 설정
const typeEls = document.querySelectorAll("input[name='test_type']");
let yearEl = document.querySelector("#year");   
let monthEl = document.querySelector("#month"); 
let typeEl = document.querySelector("#test_type");
let year, month, type; // 버튼을 눌렀을 때만 확정되는 값
let tbodyEl;

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
            years = ["2024", "2023"]; // 2025, 2022 추후에 추가
            months = ["6", "9", "11"];
            TNSE.innerText = ""
        } else {
            years = ["2024", "2023", "2022"]; // years는 1st~3rd가 공통됨 (2024, 2022, 2021 추후에 추가)
            if(type == "3rd") {
                months = ["3"]; // 2024 추가 이후에는 5로 바꾸기
                TNSE.innerText = "월 고3 전국연합학력평가";
            } else {
                months = ["3"]; // months는 1st, 2nd가 공통됨 (2024 추가 이후에는 10으로 바꾸기)
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
    let type;
    typeEls.forEach((t) => {
        if(t.checked == true)    type = t.value;
        console.log(type);
    })
    let months;

    if(type == "sat") {
        months = (yearEl.value == "2025") ? ["6"] : ["6", "9", "11"];
    } else if(type == "3rd") {
        months = (yearEl.value == "2024") ? ["3"] : ["3", "4", "7", "10"];
    } else {
        months = (yearEl.value == "2024") ? ["3"] : ["3", "6", "9", "11"];
    }

    changeOpts(monthEl, months, type == "sat");
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

    if(type == "sat" && year == "2025" && month == "6") {
        divEl.innerText = "해당 시험의 성적 발표일은 7월 2일(화)입니다."
        return;
    }
    if(type == "sat" && year == "2025" && month == "9") {
        divEl.innerText = "해당 시험의 성적 발표일은 10월 2일(수)입니다."
        return;
    }
    if(type == "sat" && year == "2025" && month == "11") {
        divEl.innerText = "해당 시험의 성적 발표일은 12월 6일(금)입니다."
        return;
    }
    if(type != "sat" && year == "2024" && month == "3") {
        divEl.innerText = "해당 시험의 성적 발표일은 4월 17일(수)입니다."
        return;
    }
    if(type != "sat" && year == "2024" && (month == "5" || month == "6" || month == "7"
        || month == "9" || month == "10")) {
        divEl.innerText = "해당 시험의 성적 발표일은 아직 정해지지 않았습니다."
        return;
    }

    if(divEl.firstChild)
        divEl.removeChild(divEl.firstChild);

    // 국어와 수학이 공통/선택으로 나뉘어 있는가? (있으면 tableType2, 없으면 tableType1)
    if(type == "sat" || type == "3rd") 
        divEl.innerHTML = tableType2;
    else
        divEl.innerHTML = tableType1;

    tbodyEl = document.querySelector("tbody"); // 표 생성 후 tbody 요소 지정

    // 제2외국어 처리 부분
    if(type == "1st" || type == "2nd" && month != "10" && month != "11"
        || type == "3rd" && month != "10") {
        const sfl = document.querySelector("#sfl");
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

        const sflSelectEl = tbodyEl.children[6].children[1].firstChild;
        changeOpts(sflSelectEl, sflList);
    }

    // 탐구 처리 부분
    if(type == "1st") {
        // 1학년인가? (1학년이면 탐구 선택과목 자동 지정, 표준점수와 등급은 지원 안 됨)
        if(month == "3") {
            tbodyEl.children[4].children[1].innerText = "사회";
            tbodyEl.children[5].children[0].innerText = "과학";
        } else {
            tbodyEl.children[4].children[1].innerText = "통합 사회";
            tbodyEl.children[5].children[0].innerText = "통합 과학";
        }
        tbodyEl.children[4].children[3].innerText = 
            tbodyEl.children[4].children[4].innerText = 
            tbodyEl.children[5].children[2].innerText = 
            tbodyEl.children[5].children[3].innerText = "-";
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
        tbodyEl.children[4].children[1].appendChild(exp1SelectEl);
        tbodyEl.children[5].children[0].appendChild(exp2SelectEl);
    }

    // 국어&수학 선택과목 선택기
    if(type == "3rd" || type == "sat") {
        const korList = ["화법과 작문", "언어와 매체"];
        const mathList = ["확률과 통계", "미적분", "기하"];
        const korSelectEl = document.createElement("select");
        const mathSelectEl = document.createElement("select");
        changeOpts(korSelectEl, korList);
        changeOpts(mathSelectEl, mathList);
        tbodyEl.children[0].children[1].appendChild(korSelectEl);
        tbodyEl.children[1].children[1].appendChild(mathSelectEl);
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

    // 너비 조정
    if(type == "2nd" && month.length == 2) {
        const thEl = document.querySelectorAll("th");
        thEl[0].getAttributeNode("width").value = "20%"
        thEl[1].getAttributeNode("width").value = "25%"
        thEl[2].getAttributeNode("width").value = "15%"
        thEl[3].getAttributeNode("width").value = "10%"
        thEl[4].getAttributeNode("width").value = "10%"
        thEl[5].getAttributeNode("width").value = "10%"
        thEl[6].getAttributeNode("width").value = "10%"
    }
}

function showInfo() {
    let key = year + month + type; // 딕셔너리형 데이터의 key
    // 국어&수학 처리 부분. 1~2학년은 if문에서, 3학년은 else문에서 처리
    if(type == "1st" || type == "2nd") {
        // 국어 처리 부분 (고1, 고2)
        const korEl = tbodyEl.children[0].children;
        const korScore = korEl[2].firstChild.value; // 국어 원점수  
        const KSCN = korEl[2].firstChild.getAttributeNode("style"); // 국어 원점수 스타일 노드
        // 국어 표준점수, 백분위, 등급 출력 부분 (고1, 고2)
        if(!korScore) {
            korEl[3].innerText = korEl[4].innerText = korEl[5].innerText = ''; 
        } else if (0 <= korScore && korScore <= 100 
            && korScore != 1 && korScore != 99) {
            korEl[3].innerText = data[key]["국어"][100-korScore][0];
            korEl[4].innerText = data[key]["국어"][100-korScore][1];
            korEl[5].innerText = data[key]["국어"][100-korScore][2];
            KSCN.value = "color: #3030EE";
        } else {
            korEl[3].innerText = korEl[4].innerText = korEl[5].innerText = 'X'; 
            KSCN.value = "color: #EE3030";
        }

        // 수학 처리 부분 (고1, 고2)
        const mathEl = tbodyEl.children[1].children;
        const mathScore = mathEl[2].firstChild.value; // 수학 원점수
        const mathScoreColor = mathEl[2].firstChild.getAttributeNode("style"); // 스타일 노드
        // 수학 표준점수, 백분위, 등급 출력 부분 (고1, 고2)
        if(!mathScore) {
            mathEl[3].innerText = mathEl[4].innerText = mathEl[5].innerText = ''; 
        } else if (0 <= mathScore && mathScore <= 100 && mathScore != 1 && mathScore != 99) {
            mathEl[3].innerText = data[key]["수학"][100-mathScore][0];
            mathEl[4].innerText = data[key]["수학"][100-mathScore][1];
            mathEl[5].innerText = data[key]["수학"][100-mathScore][2];
            mathScoreColor.value = "color: #3030EE";
        } else {
            mathEl[3].innerText = mathEl[4].innerText = mathEl[5].innerText = 'X'; 
            mathScoreColor.value = "color: #EE3030";
        }
        mathEl[2].firstChild.setAttributeNode(mathScoreColor);
    } else {
        // 국어 처리 부분 (고3, 수능)
        const korEl = tbodyEl.children[0].children;
        const korChoice = korEl[1].firstChild.value; // 국어 선택과목
        const korScore1 = korEl[2].firstChild.value; // 국어 공통과목 원점수
        const korScore2 = korEl[3].firstChild.value; // 국어 선택과목 원점수
        const KSSN1 = korEl[2].firstChild.getAttributeNode("style"); // 국어 공통과목 원점수 스타일 노드 (Korean Score Style Node 1)
        const KSSN2 = korEl[3].firstChild.getAttributeNode("style"); // 국어 선택과목 원점수 스타일 노드 (Korean Score Style Node 2)
        const korValidity1 = (0 <= korScore1 && korScore1 <= 76 && korScore1 != 1 && korScore1 != 75); // 국어 공통과목 원점수 유효성
        const korValidity2 = (0 <= korScore2 && korScore2 <= 24 && korScore2 != 1 && korScore2 != 23); // 국어 선택과목 원점수 유효성
        const korMemory = data[key]["국어"][0][korChoice] // 국어 표준점수 산출식 저장된 곳
        KSSN1.value = korValidity1 ? "color: #3030EE" : "color: #EE3030"; // 공통과목 원점수 유효하면 파란색, 아니면 빨간색
        KSSN2.value = korValidity2 ? "color: #3030EE" : "color: #EE3030"; // 선택과목 원점수 유효하면 파란색, 아니면 빨간색

        // 국어 표준점수, 백분위, 등급 출력 부분 (고3, 수능)
        if(!korScore1 || !korScore2) {
            korEl[4].innerText = korEl[5].innerText = korEl[6].innerText = ''; 
        } else if (korValidity1 && korValidity2) {
            const korStandard = parseInt(korMemory[0] * parseInt(korScore1) 
                + korMemory[1] * parseInt(korScore2) + korMemory[2] + 0.5);
            korEl[4].innerText = korStandard;

            let idx = 1;
            while(data[key]["국어"][idx][0] != korStandard) idx++;
            korEl[5].innerText = data[key]["국어"][idx][1];
            korEl[6].innerText = data[key]["국어"][idx][2];
        } else {
            korEl[4].innerText = korEl[5].innerText = korEl[6].innerText = 'X'; 
        }

        // 수학 처리 부분 (고3, 수능)
        const mathEl = tbodyEl.children[1].children;
        const mathChoice = mathEl[1].firstChild.value; // 수학 선택과목
        const mathScore1 = mathEl[2].firstChild.value; // 수학 공통과목 원점수
        const mathScore2 = mathEl[3].firstChild.value; // 수학 선택과목 원점수
        const MSSN1 = mathEl[2].firstChild.getAttributeNode("style"); // 수학 공통과목 원점수 스타일 노드 (Math Score Style Node 1)
        const MSSN2 = mathEl[3].firstChild.getAttributeNode("style"); // 수학 선택과목 원점수 스타일 노드 (Math Score Style Node 2)
        const MathValidity1 = (0 <= mathScore1 && mathScore1 <= 74 && mathScore1 != 1 && mathScore1 != 73);
        const MathValidity2 = (0 <= mathScore2 && mathScore2 <= 26 && mathScore2 != 1 && mathScore2 != 25);
        const mathMemory = data[key]["수학"][0][mathChoice] // 수학 표준점수 산출식 저장된 곳
        MSSN1.value = MathValidity1 ? "color: #3030EE" : "color: #EE3030"; // 공통과목 원점수 유효하면 파란색, 아니면 빨간색
        MSSN2.value = MathValidity2 ? "color: #3030EE" : "color: #EE3030"; // 선택과목 원점수 유효하면 파란색, 아니면 빨간색

        // 수학 표준점수, 백분위, 등급 출력 부분 (고3, 수능)
        if(!mathScore1 || !mathScore2) {
            mathEl[4].innerText = mathEl[5].innerText = mathEl[6].innerText = ''; 
        } else if (MathValidity1 && MathValidity2) {
            const mathStandard = parseInt(mathMemory[0] * parseInt(mathScore1) 
                + mathMemory[1] * parseInt(mathScore2) + mathMemory[2] + 0.5);
                mathEl[4].innerText = mathStandard;

            let idx = 1;
            while(data[key]["수학"][idx][0] != mathStandard) idx++;
            mathEl[5].innerText = data[key]["수학"][idx][1];
            mathEl[6].innerText = data[key]["수학"][idx][2];
        } else {
            mathEl[4].innerText = mathEl[5].innerText = mathEl[6].innerText = 'X'; 
        }
    }

    // 영어 처리 부분
    const engEl = tbodyEl.children[2].children;
    const engScore = engEl[2].firstChild.value; // 영어 원점수
    const ESSN = engEl[2].firstChild.getAttributeNode("style");
    engEl[5].innerText = 
        engScore == "" ? "" :
        engScore == 100 ? 1 : 
        0 <= engScore && engScore <= 9 && engScore != 1 ? 9 :
        2 <= engScore && engScore <= 98 ? 10-parseInt(engScore/10) : 
        "X";
    ESSN.value = engEl[5].innerText != "X" ? "color: #3030EE" : "color: #EE3030";

    // 한국사 처리 부분
    const histEl = tbodyEl.children[3].children;
    const histScore = histEl[2].firstChild.value; // 한국사 원점수
    const HSSN = histEl[2].firstChild.getAttributeNode("style");
    histEl[5].innerText = 
        histScore == "" ? "" :
        histScore == 50 ? 1 : 
        45 <= histScore && histScore <= 48 ? 1 :
        2 <= histScore && histScore <= 44 || histScore == 0 ? 10-parseInt(histScore/5+1) : 
        "X";
    HSSN.value = histEl[5].innerText != "X" ? "color: #3030EE" : "color: #EE3030";

    // 탐구 처리 부분
    const exp1El = tbodyEl.children[4].children;
    const exp2El = tbodyEl.children[5].children;
    const exp1Score = exp1El[2].firstChild.value; // 탐구1 원점수
    const exp2Score = exp2El[1].firstChild.value; // 탐구2 원점수
    const Ex1SSN = exp1El[2].firstChild.getAttributeNode("style");
    const Ex2SSN = exp2El[1].firstChild.getAttributeNode("style");
    if(type == "1st") {
        // 1학년 탐구는 절대평가
        exp1El[5].innerText = 
            exp1Score == "" ? "" :
            exp1Score == 50 ? 1 : 
            45 <= exp1Score && exp1Score <= 48 ? 1 :
            2 <= exp1Score && exp1Score <= 44 || exp1Score == 0 ? 10-parseInt(exp1Score/5+1) : 
            "X"
        Ex1SSN.value = exp1El[5].innerText != "X" ? "color: #3030EE" : "color: #EE3030";

        exp2El[4].innerText = 
            exp2Score == "" ? "" :
            exp2Score == 50 ? 1 : 
            45 <= exp2Score && exp2Score <= 48 ? 1 :
            2 <= exp2Score && exp2Score <= 44 || exp2Score == 0 ? 10-parseInt(exp2Score/5+1) : 
            "X"
        Ex2SSN.value = exp2El[4].innerText != "X" ? "color: #3030EE" : "color: #EE3030";
    } else {
        let subject = exp1El[1].firstChild.value;
        // 원점수 처리 (탐구 1선택)
        if(!exp1Score) {
            exp1El[3].innerText = exp1El[4].innerText = exp1El[5].innerText = ''; 
        } else if (0 <= exp1Score && exp1Score <= 50 && exp1Score != 1 && exp1Score != 49) {
            exp1El[3].innerText = data[key][subject][50-exp1Score][0];
            exp1El[4].innerText = data[key][subject][50-exp1Score][1];
            exp1El[5].innerText = data[key][subject][50-exp1Score][2];
        } else {
            exp1El[3].innerText = exp1El[4].innerText = exp1El[5].innerText = 'X'; 
        }
        Ex1SSN.value = exp1El[5].innerText != "X" ? "color: #3030EE" : "color: #EE3030";

        subject = exp2El[0].firstChild.value;
        // 원점수 처리 (탐구 2선택)
        if(!exp2Score) {
            exp2El[2].innerText = exp2El[3].innerText = exp2El[4].innerText = ''; 
        } else if (0 <= exp2Score && exp2Score <= 50 && exp2Score != 1 && exp2Score != 49) {
            exp2El[2].innerText = data[key][subject][50-exp2Score][0];
            exp2El[3].innerText = data[key][subject][50-exp2Score][1];
            exp2El[4].innerText = data[key][subject][50-exp2Score][2];
        } else {
            exp2El[2].innerText = exp2El[3].innerText = exp2El[4].innerText = 'X'; 
        }
        Ex2SSN.value = exp2El[4].innerText != "X" ? "color: #3030EE" : "color: #EE3030";
    }

    // 제2외국어&한문 처리 부분
    if(tbodyEl.children.length == 7) {
        const sflEl = tbodyEl.children[6].children;
        const sflScore = sflEl[2].firstChild.value; // 제2외국어 원점수
        const SSSN = sflEl[2].firstChild.getAttributeNode("style");
        sflEl[5].innerText = 
            sflScore == "" ? "" :
            sflScore == 50 ? 1 : 
            0 <= sflScore && sflScore <= 4 ? 9 :
            5 <= sflScore && sflScore <= 49 ? 10-parseInt(sflScore/5) : 
            "X"
        SSSN.value = sflEl[5].innerText != "X" ? "color: #3030EE" : "color: #EE3030";
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