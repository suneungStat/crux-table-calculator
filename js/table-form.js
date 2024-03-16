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
            <td><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr id="sfl">\
            <td>제2외국어/한문</td>\
            <td class="sfl choice"></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
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
            <th rowspan="2">백분위</th>\
            <th rowspan="2">등급</th>\
            <th rowspan="2">통계자료</th>\
        </tr>\
        <tr>\
            <th>공통</th>\
            <th>선택</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr>\
            <td>국어</td>\
            <td></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></input></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td colspan="2"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()"></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td colspan="2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td></td>\
            <td colspan="2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td></td>\
            <td colspan="2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr id="sfl">\
            <td>제2외국어/한문</td>\
            <td></td>\
            <td colspan="2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()"></td>\
            <td>-</td>\
            <td>-</td>\
            <td></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>';