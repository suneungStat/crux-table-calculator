const tableType1 = 
'<table>\
    <caption></caption>\
    <thead>\
        <tr>\
            <th width = "15%">과목</th>\
            <th width = "20%">선택과목</th>\
            <th width = "15%">원점수</th>\
            <th width = "14%">표준점수</th>\
            <th width = "14%">백분위</th>\
            <th width = "8%">등급</th>\
            <th width = "14%">통계자료</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr class="kor">\
            <td>국어</td>\
            <td>-</td>\
            <td class="kw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="kp"></td>\
            <td class="kb"></td>\
            <td class="kd"></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr class="math">\
            <td>수학</td>\
            <td>-</td>\
            <td class="mw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="mp"></td>\
            <td class="mb"></td>\
            <td class="md"></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td class="ew"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="ed"></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td class="hw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="hd"></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr id="ex1">\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td class="ex1w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="ex1p"></td>\
            <td class="ex1b"></td>\
            <td class="ex1d"></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr id="ex2">\
            <td class="ex2s"></td>\
            <td class="ex2w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="ex2p"></td>\
            <td class="ex2b"></td>\
            <td class="ex2d"></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr id="sfl">\
            <td>제2외국어/한문</td>\
            <td class="ss"><select onchange=showInfo1()></select></td>\
            <td class="sw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class>-</td>\
            <td class>-</td>\
            <td class="sd"></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>\
<p>* 유효하지 않은 원점수를 입력하면 결과가 "X"로 나옵니다.</p>\
';

const tableType2 = 
'<table>\
<caption></caption>\
    <thead>\
        <tr>\
            <th rowspan="2" width="18%">과목</th>\
            <th rowspan="2" width="20%">선택과목</th>\
            <th colspan="2" width="18%">원점수</th>\
            <th rowspan="2" width="12%">표준점수</th>\
            <th rowspan="2" width="12%">백분위</th>\
            <th rowspan="2" width="8%">등급</th>\
            <th rowspan="2" width="12%">통계자료</th>\
        </tr>\
        <tr>\
            <th width="0%">공통</th>\
            <th width="0%">선택</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr id="kor">\
            <td>국어</td>\
            <td class="ks"></td>\
            <td class="kw1"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="kw2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="kp"></td>\
            <td class="kb"></td>\
            <td class="kd"></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr id="math">\
            <td>수학</td>\
            <td class="ms"></td>\
            <td class="mw1"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="mw2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="mp"></td>\
            <td class="mb"></td>\
            <td class="md"></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td colspan="2" class="ew"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="ed"></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td colspan="2" class="hw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="hd"></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr id="ex1">\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td colspan="2" class="ex1w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="ex1p"></td>\
            <td class="ex1b"></td>\
            <td class="ex1d"></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr id="ex2">\
            <td class="ex2s"></td>\
            <td colspan="2" class="ex2w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td class="ex2p"></td>\
            <td class="ex2b"></td>\
            <td class="ex2d"></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr id="sfl">\
            <td>제2외국어/한문</td>\
            <td class="ss"><select onchange=showInfo1()></select></td>\
            <td colspan="2" class="sw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo1()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="sd"></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>\
<p>* 국어 공통과목 원점수 만점: 76점, 선택과목 원점수 만점: 24점</p>\
<p>** 수학 공통과목 원점수 만점: 74점, 선택과목 원점수 만점: 26점</p>\
<p>*** 유효하지 않은 원점수를 입력하면 결과가 "X"로 나옵니다.</p>\
<p>**** 유효한 원점수를 입력했으나 해당 표준점수를 받은 응시자가 없는 경우에는 "N/A"가 출력됩니다.</p>\
';


const tableType3 = 
'<table class="rev">\
    <caption></caption>\
    <thead>\
        <tr>\
            <th width = "19%">과목</th>\
            <th width = "24%">선택과목</th>\
            <th width = "19%">표준점수</th>\
            <th width = "19%">원점수</th>\
            <th width = "19%">통계자료</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr id="kor">\
            <td>국어</td>\
            <td>-</td>\
            <td class="kp"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="kw"></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr id="math">\
            <td>수학</td>\
            <td>-</td>\
            <td class="mp"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="mw"></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        <tr></tr>\
        <tr></tr>\
        </tr>\
        <tr id="ex1">\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td class="ex1w"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="ex1d"></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr id="ex2">\
            <td class="ex2s"></td>\
            <td class="ex2w"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="ex2d"></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
    </tbody>\
</table>\
<span>\
    <p>* 유효한 표준점수를 입력했으나 해당 표준점수를 받은 인원이 없는 경우에는 결과가 "N/A"로 출력됩니다.</p>\
    <p>* 유효하지 않은 표준점수를 입력하면 결과가 "X"로 나옵니다.</p>\
    <p>* 유효한 표준점수 범위: 국어/수학은 0~200, 탐구는 0~100</p>\
</span>\
';

const tableType4 = 
'<table class="rev">\
    <caption></caption>\
    <thead>\
        <tr>\
            <th width = "15%">과목</th>\
            <th width = "20%">선택과목</th>\
            <th width = "14%">표준점수</th>\
            <th width = "14%">선택과목<br>원점수</th>\
            <th width = "14%">원점수<br>(공통+선택)</th>\
            <th width = "14%">통계자료</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr id="kor">\
            <td>국어</td>\
            <td></td>\
            <td class="kw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="kd"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="kb"></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr id="math">\
            <td>수학</td>\
            <td></td>\
            <td class="mw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="md"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="mb"></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr></tr>\
        <tr></tr>\
        <tr id="ex1">\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td class="ex1w"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="ex1d">-</td>\
            <td class="ex2b"></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr id="ex2">\
            <td class="ex2s"></td>\
            <td class="ex2w"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo2()" style=""></input></td>\
            <td class="ex2d">-</td>\
            <td class="ex2b"></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
    </tbody>\
</table>\
<span>\
    <p>* 국어 선택과목 원점수 만점: 24점</p>\
    <p>* 수학 선택과목 원점수 만점: 26점</p>\
    <p>* 국어, 수학에서 선택과목 원점수를 입력하지 않으면 가능한 결과의 전범위가 출력됩니다.</p>\
    <p>* 유효하지 않은 표준점수 또는 선택과목 원점수를 입력하면 결과가 "X"로 나옵니다.</p>\
    <p>* 두 값을 모두 유효하게 입력했지만 해당 표준점수를 받은 인원이 없으면 결과가 "N/A"로 출력됩니다.</p>\
    <p>* 해당 선택과목 원점수로 해당 표준점수를 받을 수 없는 경우에도 결과가 "N/A"로 출력됩니다.</p>\
    <p>* 유효한 표준점수 범위: 국어/수학은 0~200, 탐구는 0~100</p>\
</span>\
';