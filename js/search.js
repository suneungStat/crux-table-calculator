// 초깃값 설정
const typeEls = document.querySelectorAll("input[name='test_type']");
let yearEl = document.querySelector("#year");   
let monthEl = document.querySelector("#month"); 
let typeEl = document.querySelector("input#sat");
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
        type = typeEl.value;
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
    // 기존에 통계자료 이미지를 띄웠다면 삭제
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
                
        const sflSelectEl = document.createElement("select");
        const onclickAttr = document.createAttribute("onclick");
        onclickAttr.value = "showInfo()";
        sflSelectEl.setAttributeNode(onclickAttr);
        changeOpts(sflSelectEl, sflList);
        tbodyEl.children[6].children[1].appendChild(sflSelectEl);
    }

    // 탐구 처리 부분
    if(type == "1st") {
        // 1학년인가? (1학년이면 탐구 선택과목 자동 지정, 표준점수와 등급은 지원 안 됨)
        if(month == "3") {
            tbodyEl.children[4].children[1].innerText = "사회"
            tbodyEl.children[5].children[0].innerText = "과학"
        } else {
            tbodyEl.children[4].children[1].innerText = "통합 사회"
            tbodyEl.children[5].children[0].innerText = "통합 과학"
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
            titleEl.innerText = `${year} + 학년도 대학수학능력시험 성적 계산기`;
        else
            titleEl.innerText = `${year}학년도 대학수학능력시험 ${month}월 모의평가 성적 계산기`
    } else {
        titleEl.innerText = `${year}학년도 ${month}월 고${type.substring(0,1)} 전국연합학력평가 성적 계산기`
    }
}

function showInfo() {
    let key = year + month + type; // 딕셔너리형 데이터의 key

    // 국어&수학 처리 부분. 1~2학년은 if문에서, 3학년은 else문에서 처리
    if(type == "1st" || type == "2nd") {
        const korEl = tbodyEl.children[0].children;
        const korScore = korEl[2].firstChild.value; // 국어 원점수                
        // 원점수 처리
        if(!korScore) {
            korEl[3].innerText = korEl[4].innerText = korEl[5].innerText = ''; 
        } else if (0 <= korScore && korScore <= 100 && korScore != 1 && korScore != 99) {
            korEl[3].innerText = data[key]["국어"][100-korScore][0];
            korEl[4].innerText = data[key]["국어"][100-korScore][1];
            korEl[5].innerText = data[key]["국어"][100-korScore][2];
        } else {
            korEl[3].innerText = korEl[4].innerText = korEl[5].innerText = 'invalid'; 
        }

        const mathEl = tbodyEl.children[1].children;
        const mathScore = mathEl[2].firstChild.value; // 수학 원점수
        // 원점수 처리
        if(!mathScore) {
            mathEl[3].innerText = mathEl[4].innerText = mathEl[5].innerText = ''; 
        } else if (0 <= mathScore && mathScore <= 100 && mathScore != 1 && mathScore != 99) {
            mathEl[3].innerText = data[key]["수학"][100-mathScore][0];
            mathEl[4].innerText = data[key]["수학"][100-mathScore][1];
            mathEl[5].innerText = data[key]["수학"][100-mathScore][2];
        } else {
            mathEl[3].innerText = mathEl[4].innerText = mathEl[5].innerText = 'invalid'; 
        }
    } else {
        const korEl = tbodyEl.children[0].children;
        const korChoice = korEl[1].firstChild.value; // 국어 선택과목
        const korScore1 = korEl[2].firstChild.value; // 국어 공통과목 원점수
        const korScore2 = korEl[3].firstChild.value; // 국어 선택과목 원점수
        const korMemory = data[key]["국어"][0][korChoice] // 국어 표준점수 산출식 저장된 곳

        // 국어 원점수 처리
        if(!korScore1 || !korScore2) {
            korEl[4].innerText = korEl[5].innerText = korEl[6].innerText = ''; 
        } else if (0 <= korScore1 && korScore1 <= 76 && korScore1 != 1 && korScore1 != 75
                && 0 <= korScore2 && korScore2 <= 24 && korScore2 != 1 && korScore2 != 23) {
            const korStandard = parseInt(korMemory[0] * parseInt(korScore1) 
                + korMemory[1] * parseInt(korScore2) + korMemory[2] + 0.5);
            korEl[4].innerText = korStandard;

            let idx = 1;
            while(data[key]["국어"][idx][0] != korStandard) idx++;
            korEl[5].innerText = data[key]["국어"][idx][1];
            korEl[6].innerText = data[key]["국어"][idx][2];
        } else {
            korEl[4].innerText = korEl[5].innerText = korEl[6].innerText = 'invalid'; 
        }

        const mathEl = tbodyEl.children[1].children;
        const mathChoice = mathEl[1].firstChild.value; // 수학 선택과목
        const mathScore1 = mathEl[2].firstChild.value; // 수학 공통과목 원점수
        const mathScore2 = mathEl[3].firstChild.value; // 수학 선택과목 원점수
        const mathMemory = data[key]["수학"][0][mathChoice] // 수학 표준점수 산출식 저장된 곳

        // 수학 원점수 처리
        if(!mathScore1 || !mathScore2) {
            mathEl[4].innerText = mathEl[5].innerText = mathEl[6].innerText = ''; 
        } else if (0 <= mathScore1 && mathScore1 <= 74 && mathScore1 != 1 && mathScore1 != 73
                && 0 <= mathScore2 && mathScore2 <= 26 && mathScore2 != 1 && mathScore2 != 25) {
            const mathStandard = parseInt(mathMemory[0] * parseInt(mathScore1) 
                + mathMemory[1] * parseInt(mathScore2) + mathMemory[2] + 0.5);
                mathEl[4].innerText = mathStandard;

            let idx = 1;
            while(data[key]["수학"][idx][0] != mathStandard) idx++;
            mathEl[5].innerText = data[key]["수학"][idx][1];
            mathEl[6].innerText = data[key]["수학"][idx][2];
        } else {
            mathEl[4].innerText = mathEl[5].innerText = mathEl[6].innerText = 'invalid'; 
        }
    }

    // 영어&한국사 처리 부분
    let engEl;
    engEl = tbodyEl.children[2].children;
    const engScore = engEl[2].firstChild.value; // 영어 원점수
    engEl[5].innerText = 
        engScore == "" ? "" :
        engScore == 100 ? 1 : 
        0 <= engScore && engScore <= 9 && engScore != 1 ? 9 :
        2 <= engScore && engScore <= 98 ? 10-parseInt(engScore/10) : 
        "invalid"

    const histEl = tbodyEl.children[3].children;
    const histScore = histEl[2].firstChild.value; // 한국사 원점수
    histEl[5].innerText = 
        histScore == "" ? "" :
        histScore == 50 ? 1 : 
        45 <= histScore && histScore <= 48 ? 1 :
        2 <= histScore && histScore <= 44 || histScore == 0 ? 10-parseInt(histScore/5+1) : 
        "invalid"

    // 탐구 처리 부분
    const exp1El = tbodyEl.children[4].children;
    const exp2El = tbodyEl.children[5].children;
    const exp1Score = exp1El[2].firstChild.value; // 탐구1 원점수
    const exp2Score = exp2El[1].firstChild.value; // 탐구2 원점수
    if(type == "1st") {
        // 1학년 탐구는 절대평가
        exp1El[5].innerText = 
            exp1Score == "" ? "" :
            exp1Score == 50 ? 1 : 
            45 <= exp1Score && exp1Score <= 48 ? 1 :
            2 <= exp1Score && exp1Score <= 44 || exp1Score == 0 ? 10-parseInt(exp1Score/5+1) : 
            "invalid"
        
        exp2El[4].innerText = 
            exp2Score == "" ? "" :
            exp2Score == 50 ? 1 : 
            45 <= exp2Score && exp2Score <= 48 ? 1 :
            2 <= exp2Score && exp2Score <= 44 || exp2Score == 0 ? 10-parseInt(exp2Score/5+1) : 
            "invalid"
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
            exp1El[3].innerText = exp1El[4].innerText = exp1El[5].innerText = 'invalid'; 
        }

        subject = exp2El[0].firstChild.value;
        // 원점수 처리 (탐구 2선택)
        if(!exp2Score) {
            exp2El[2].innerText = exp2El[3].innerText = exp2El[4].innerText = ''; 
        } else if (0 <= exp2Score && exp2Score <= 50 && exp2Score != 1 && exp2Score != 49) {
            exp2El[2].innerText = data[key][subject][50-exp2Score][0];
            exp2El[3].innerText = data[key][subject][50-exp2Score][1];
            exp2El[4].innerText = data[key][subject][50-exp2Score][2];
        } else {
            exp2El[2].innerText = exp2El[3].innerText = exp2El[4].innerText = 'invalid'; 
        }
    }

    // 제2외국어&한문 처리 부분
    if(tbodyEl.children.length == 7) {
        const sflEl = tbodyEl.children[6].children;
        const sflScore = sflEl[2].firstChild.value; // 제2외국어 원점수
        sflEl[5].innerText = 
            sflScore == "" ? "" :
            sflScore == 50 ? 1 : 
            0 <= sflScore && sflScore <= 4 ? 9 :
            5 <= sflScore && sflScore <= 49 ? 10-parseInt(sflScore/5) : 
            "invalid"
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
        console.log(srcAttr.value);
    } else {
        imgEl[0].removeAttribute("src");
    }
} 
