// 1학년, 2학년 3~9월
const tableType1 = 
'<table>\
    <caption></caption>\
    <thead>\
        <tr>\
            <th>과목</th>\
            <th>선택과목</th>\
            <th>원점수</th>\
            <th>표준점수</th>\
            <th>백분위</th>\
            <th>등급</th>\
            <th>통계자료</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr>\
            <td>국어</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="3" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="3" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="3" onchange="showInfo()"></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="2" onchange="showInfo()"></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td></td>\
            <td><input type="text" name="score" maxlength="2" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td></td>\
            <td><input type="text" name="score" maxlength="2" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr id="sfl">\
            <td>제2외국어/한문</td>\
            <td class="sfl choice"></td>\
            <td><input type="text" name="score" onchange="showInfo()"></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>';

const tableType2 = 
'<table>\
<caption></caption>\
    <thead>\
        <tr>\
            <th rowspan="2">과목</th>\
            <th rowspan="2">선택과목</th>\
            <th colspan="2">원점수</th>\
            <th rowspan="2">표준점수</th>\
            <th rowspan="2">등급</th>\
            <th rowspan="2">백분위</th>\
            <th rowspan="2">통계자료</th>\
        </tr>\
        <tr>\
            <th>공통</th>\
            <th>선택</th>\
        </tr>\
        <tr>\
            <td>국어</td>\
            <td class="kor_choice"></td>\
            <td class="kor_gong_ori"></td>\
            <td class="kor_sun_ori"></td>\
            <td class="kor_standard"></td>\
            <td class="kor_grade"></td>\
            <td class="kor_percentile"></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td class="math_choice"></td>\
            <td class="math_gong_ori"></td>\
            <td class="math_sun_ori"></td>\
            <td class="math_standard"></td>\
            <td class="math_grade"></td>\
            <td class="math_percentile"></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td class="eng_original"></td>\
            <td>-</td>\
            <td class="eng_grade"></td>\
            <td>-</td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td class="hist_original"></td>\
            <td>-</td>\
            <td class="hist_grade"></td>\
            <td>-</td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td class="exp1_choice"></td>\
            <td class="exp1_original"></td>\
            <td class="exp1_standard"></td>\
            <td class="exp1_grade"></td>\
            <td class="exp1_percentile"></td>\
        </tr>\
        <tr>\
            <td class="exp2_choice"></td>\
            <td class="exp2_original"></td>\
            <td class="exp2_standard"></td>\
            <td class="exp2_grade"></td>\
            <td class="exp2_percentile"></td>\
        </tr>\
        <tr id="sfl">\
            <td>제2외국어/한문</td>\
            <td class="sfl_choice"></td>\
            <td class="sfl_original"></td>\
            <td>-</td>\
            <td class="sfl_grade"></td>\
            <td>-</td>\
        </tr>\
    </thead>\
</table>';

let fileName;
function makeTable() {
    const divEl = document.querySelector("div#table");
    yearEl = document.querySelector("#year");
    monthEl = document.querySelector("#month");

    divEl.innerHTML = "";
    
    typeEls.forEach((typeEl) => {
        if(typeEl.checked == true) {
            // 국어와 수학이 공통/선택으로 나뉘어 있는가? 1
            if(typeEl.id == "sat" || typeEl.id == "3rd") {
                divEl.innerHTML = tableType2;
            } else {
                divEl.innerHTML = tableType1;
            }

            // 제2외국어가 없는가?
            if(typeEl.id == "1st" || typeEl.id == "2nd" && monthEl.value != "10" && monthEl.value != "11") {
                const sfl = document.querySelector("#sfl");
                sfl.parentNode.removeChild(sfl);
            }

            const tbodyEl = divEl.firstElementChild.lastElementChild;
            if(typeEl.id == "1st") {
                // 1학년인가? (1학년이면 탐구 선택과목 자동 지정)
                if(monthEl.value == "3") {
                    tbodyEl.children[4].children[1].innerText = "사회"
                    tbodyEl.children[5].children[0].innerText = "과학"
                } else {
                    tbodyEl.children[4].children[1].innerText = "통합 사회"
                    tbodyEl.children[5].children[0].innerText = "통합 과학"
                }
            } else {
                let expList;
                // 2학년 3~9월, 3학년 3월 (기본)
                if(typeEl.id == "2nd" && monthEl.value.length == 1 || 
                    typeEl.id == "3rd" && monthEl.value == "3")
                    expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                    "세계사", "경제", "정치와 법", "사회·문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                    "지구과학Ⅰ"]

                // 2학년 11(10)월 (기본에서 직업탐구 추가됨)
                if(typeEl.id == "2nd" && monthEl.value.length == 2)
                    expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                    "세계사", "경제", "정치와 법", "사회·문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                    "지구과학Ⅰ", "성공적인 직업생활", "농업 기초 기술", "공업 일반", "상업 경제", 
                    "수산·해운 산업 기초", "인간 발달"];

                // 3학년 4(5), 7월 (기본에서 투과목 추가됨)
                if(typeEl.id == "3rd" && (monthEl.value == "4" || monthEl.value == "5" || monthEl.value == "7"))
                    expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                    "세계사", "경제", "정치와 법", "사회·문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                    "지구과학Ⅰ", "물리학Ⅱ", "화학Ⅱ", "생명과학Ⅱ", "지구과학Ⅱ"];

                // 3학년 6월, 9월, 10월, 수능 (기본에서 투과목, 직업탐구 추가됨)
                if(typeEl.id == "3rd" && monthEl.value == "10" || typeEl.id == "sat")
                    expList = ["생활과 윤리", "윤리와 사상", "한국지리", "세계지리", "동아시아사",
                    "세계사", "경제", "정치와 법", "사회·문화", "물리학Ⅰ", "화학Ⅰ", "생명과학Ⅰ",
                    "지구과학Ⅰ", "물리학Ⅱ", "화학Ⅱ", "생명과학Ⅱ", "지구과학Ⅱ", "성공적인 직업생활",
                    "농업 기초 기술", "공업 일반", "상업 경제", "수산·해운 산업 기초", "인간 발달"];

                const choice1El = document.createElement("select");
                const choice2El = document.createElement("select");
                addOpts(expList, choice1El);
                addOpts(expList, choice2El);
                if(typeEl.id == "2nd") {
                    tbodyEl.children[4].children[1].appendChild(choice1El);
                    tbodyEl.children[5].children[0].appendChild(choice2El);
                } else {

                }
            }

            // 테이블 제목
            const titleEl = document.querySelector("caption");
            if(typeEl.id == "sat") 
                titleEl.innerText = yearEl.value + "학년도 " + monthEl.value + " 성적통지표"
            else
                titleEl.innerText = yearEl.value + "학년도 " + monthEl.value + "월 고" + typeEl.id.substring(0,1) + " 전국연합학력평가 성적통지표"

            // 불러올 파일 이름
            fileName = yearEl.value.substring(2, 4);

            if(monthEl.value.length == 1) {
                fileName += ("0" + monthEl.value + "-"); 
            } else {
                fileName += (monthEl.value + "-");
            }

            if(typeEl.id == "1st") {
                fileName += "1.xlsm";
            } else if(typeEl.id == "2nd") {
                fileName += "2.xlsm";
            } else if(typeEl.id == "3rd"){
                fileName += "3.xlsm";
            } else {
                fileName += "sat.xlsm";
            }
        }
    })
}

function showInfo() {
    const divEl = document.querySelector("div#table");
    const tbodyEl = divEl.firstElementChild.lastElementChild;
    
    typeEls.forEach((typeEl) => {
        if(typeEl.checked == true) {
            // 국어&수학 처리 부분. 1~2학년은 if문에서, 3학년은 else문에서 처리
            if(typeEl.id == "1st" || typeEl.id == "2nd") {
                const korEl = tbodyEl.children[0].children;
                const korScore = korEl[2].firstChild.value; // 국어 원점수                
                // 유효하지 않은 원점수 처리
                if(!korScore) {
                    korEl[3].innerText = korEl[4].innerText = korEl[5].innerText = ''; 
                } else if (0 <= korScore && korScore <= 100 && korScore != 1 && korScore != 99) {
                    const idx = yearEl.value + monthEl.value + typeEl.id
                    korEl[3].innerText = data[idx]["국어"][100-korScore][0];
                    korEl[4].innerText = data[idx]["국어"][100-korScore][1];
                    korEl[5].innerText = data[idx]["국어"][100-korScore][2];
                } else {
                    korEl[3].innerText = korEl[4].innerText = korEl[5].innerText = 'invaild'; 
                }

                const mathEl = tbodyEl.children[1].children;
                const mathScore = mathEl[2].firstChild.value; // 수학 원점수
                // 유효하지 않은 원점수 처리
                if(!mathScore) {
                    mathEl[3].innerText = mathEl[4].innerText = mathEl[5].innerText = ''; 
                } else if (0 <= mathScore && mathScore <= 100 && mathScore != 1 && mathScore != 99) {
                    const idx = yearEl.value + monthEl.value + typeEl.id
                    mathEl[3].innerText = data[idx]["수학"][100-mathScore][0];
                    mathEl[4].innerText = data[idx]["수학"][100-mathScore][1];
                    mathEl[5].innerText = data[idx]["수학"][100-mathScore][2];
                } else {
                    mathEl[3].innerText = mathEl[4].innerText = mathEl[5].innerText = 'invaild'; 
                }
            } else {
                
            }

            // 영어&한국사 처리 부분
            const engEl = tbodyEl.children[2].children;
            const engScore = engEl[2].firstChild.value; // 영어 원점수
            engEl[5].innerText = 
                engScore == "" ? "" :
                engScore == 100 ? 1 : 
                0 <= engScore && engScore <= 9 && engScore != 1 ? 9 :
                2 <= engScore && engScore <= 98 ? 10-parseInt(engScore/10) : 
                "invalid"

            const histEl = tbodyEl.children[3].children;
            const histScore = histEl[2].firstChild.value; // 영어 원점수
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
            if(typeEl.id == "1st") {
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
    })
}

// 크럭스 테이블 이미지 출력
function printTable (subNum) {
    typeEls.forEach((typeEl) => {
        if(typeEl.checked == true) {
            const tbodyEl = document.querySelector("tbody");
            const imgEl = document.querySelector("img");
            const subEl = tbodyEl.children[subNum].children;
            let subjectName;
            if(subNum <= 3 || subNum == 5)
                subjectName = subEl[0].innerText;
            else   
                subjectName = subEl[1].innerText;

            const hrefAttr = document.createAttribute("src");
            hrefAttr.value = "../img/" + yearEl.value + "/" + typeEl.value + "/" + monthEl.value + "/" + subjectName + ".png"
            imgEl.setAttributeNode(hrefAttr);
        }
    })
}