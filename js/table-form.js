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
        <tr>\
            <td>국어</td>\
            <td>-</td>\
            <td class="kw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="kp"></td>\
            <td class="kb"></td>\
            <td class="kd"></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td>-</td>\
            <td class="mw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="mp"></td>\
            <td class="mb"></td>\
            <td class="md"></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td class="ew"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="ed"></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td class="hw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="hd"></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td class="ex1w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="ex1p"></td>\
            <td class="ex1b"></td>\
            <td class="ex1d"></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td class="ex2s"></td>\
            <td class="ex2w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="ex2p"></td>\
            <td class="ex2b"></td>\
            <td class="ex2d"></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr class="sfl">\
            <td>제2외국어/한문</td>\
            <td class="ss"><select onchange=showInfo()></select></td>\
            <td class="sw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class>-</td>\
            <td class>-</td>\
            <td class="sd"></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>';

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
        <tr>\
            <td>국어</td>\
            <td class="ks"></td>\
            <td class="kw1"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="kw2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="kp"></td>\
            <td class="kb"></td>\
            <td class="kd"></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td class="ms"></td>\
            <td class="mw1"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="mw2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="mp"></td>\
            <td class="mb"></td>\
            <td class="md"></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td colspan="2" class="ew"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="ed"></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td colspan="2" class="hw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="hd"></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td colspan="2" class="ex1w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="ex1p"></td>\
            <td class="ex1b"></td>\
            <td class="ex1d"></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td class="ex2s"></td>\
            <td colspan="2" class="ex2w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="ex2p"></td>\
            <td class="ex2b"></td>\
            <td class="ex2d"></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr class="sfl">\
            <td>제2외국어/한문</td>\
            <td class="ss"><select onchange=showInfo()></select></td>\
            <td colspan="2" class="sw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td>-</td>\
            <td>-</td>\
            <td class="sd"></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>';

const tableType3 = 
'<table id="input">\
    <caption></caption>\
    <thead>\
        <tr>\
            <th width = "25%">과목</th>\
            <th width = "25%">선택과목</th>\
            <th width = "25%">원점수</th>\
            <th width = "25%">통계자료</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr>\
            <td>국어</td>\
            <td>-</td>\
            <td class="kw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td>-</td>\
            <td class="mw"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td class="ew"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td class="hw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td class="ex1w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td class="ex2s"></td>\
            <td class="ex2w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr class="sfl">\
            <td>제2외국어/한문</td>\
            <td class="ss"><select onchange=showInfo()></select></td>\
            <td class="sw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>\
\
<table id="output">\
    <thead>\
        <tr>\
            <th width = "25%">과목</th>\
            <th width = "25%">표준점수</th>\
            <th width = "25%">백분위</th>\
            <th width = "25%">등급</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr>\
            <td>국어</td>\
            <td class="kp"></td>\
            <td class="kb"></td>\
            <td class="kd"></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td class="mp"></td>\
            <td class="mb"></td>\
            <td class="md"></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td>-</td>\
            <td class="ed"></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td>-</td>\
            <td class="hd"></td>\
        </tr>\
        <tr>\
            <td>탐구1</td>\
            <td class="ex1p"></td>\
            <td class="ex1b"></td>\
            <td class="ex1d"></td>\
        </tr>\
        <tr>\
            <td>탐구2</td>\
            <td class="ex2p"></td>\
            <td class="ex2b"></td>\
            <td class="ex2d"></td>\
        </tr>\
        <tr class="sfl">\
            <td>제2외국어/한문</td>\
            <td class>-</td>\
            <td class>-</td>\
            <td class="sd"></td>\
        </tr>\
    </tbody>\
</table>';

const tableType4 = 
'<table>\
<caption></caption>\
    <thead>\
        <tr>\
            <th rowspan="2" width="25%">과목</th>\
            <th rowspan="2" width="25%">선택과목</th>\
            <th colspan="2" width="25%">원점수</th>\
            <th rowspan="2" width="25%">통계자료</th>\
        </tr>\
        <tr>\
            <th width="12.5%">공통</th>\
            <th width="12.5%">선택</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr>\
            <td>국어</td>\
            <td class="ks"></td>\
            <td class="kw1"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="kw2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(0)">보기</button></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td class="ms"></td>\
            <td class="mw1"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td class="mw2"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(1)">보기</button></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td colspan="2" class="ew"><input type="text" name="score" maxlength="3" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(2)">보기</button></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td colspan="2" class="hw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(3)">보기</button></td>\
        </tr>\
        <tr>\
            <td rowspan="2">탐구</td>\
            <td class="ex1s"></td>\
            <td colspan="2" class="ex1w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(4)">보기</button></td>\
        </tr>\
        <tr>\
            <td class="ex2s"></td>\
            <td colspan="2" class="ex2w"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(5)">보기</button></td>\
        </tr>\
        <tr class="sfl">\
            <td>제2외국어/한문</td>\
            <td class="ss"><select onchange=showInfo()></select></td>\
            <td colspan="2" class="sw"><input type="text" name="score" maxlength="2" placeholder="입력란" onchange="showInfo()" style=""></input></td>\
            <td><button type="button" onclick="printTable(6)">보기</button></td>\
        </tr>\
    </tbody>\
</table>\
\
<table id="output">\
    <thead>\
        <tr>\
            <th width = "25%">과목</th>\
            <th width = "25%">표준점수</th>\
            <th width = "25%">백분위</th>\
            <th width = "25%">등급</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr>\
            <td>국어</td>\
            <td class="kp"></td>\
            <td class="kb"></td>\
            <td class="kd"></td>\
        </tr>\
        <tr>\
            <td>수학</td>\
            <td class="mp"></td>\
            <td class="mb"></td>\
            <td class="md"></td>\
        </tr>\
        <tr>\
            <td>영어</td>\
            <td>-</td>\
            <td>-</td>\
            <td class="ed"></td>\
        </tr>\
        <tr>\
            <td>한국사</td>\
            <td>-</td>\
            <td>-</td>\
            <td class="hd"></td>\
        </tr>\
        <tr>\
            <td>탐구1</td>\
            <td class="ex1p"></td>\
            <td class="ex1b"></td>\
            <td class="ex1d"></td>\
        </tr>\
        <tr>\
            <td>탐구2</td>\
            <td class="ex2p"></td>\
            <td class="ex2b"></td>\
            <td class="ex2d"></td>\
        </tr>\
        <tr class="sfl">\
            <td>제2외국어/한문</td>\
            <td class>-</td>\
            <td class>-</td>\
            <td class="sd"></td>\
        </tr>\
    </tbody>\
</table>';