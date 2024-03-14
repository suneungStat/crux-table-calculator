const typeEls = document.querySelectorAll("input[name='test_type']");
const testNameEl = document.querySelector("p#test_name");
const years = ["2024", "2023", "2022"]; // 2025 추후에 추가
const months = ["대학수학능력시험 6월 모의평가", "대학수학능력시험 9월 모의평가", "대학수학능력시험"];
let yearEl = document.querySelector("#year");
let monthEl = document.querySelector("#month");

const addOpts = (array, parent) => {
    array.forEach((component) => {
        const opt = document.createElement("option");
        opt.value = component;
        opt.innerText = component;
        parent.appendChild(opt);
    })
}

addOpts(years, yearEl);
addOpts(months, monthEl);

typeEls.forEach((type) => { 
    type.addEventListener("change", (e) => {
        const current = e.currentTarget;
        testNameEl.innerHTML = "시험명 : \n<select name='year' id='year' onchange='yearChange()'></select>학년도 <select name='month', id='month'></select>"
        yearEl = document.querySelector("#year");
        monthEl = document.querySelector("#month");
        if(current.id == "sat") {
            const years = ["2024", "2023", "2022"]; // 2025 추후에 추가
            const months = ["대학수학능력시험 6월 모의평가", "대학수학능력시험 9월 모의평가", "대학수학능력시험"];
            addOpts(years, yearEl);
            addOpts(months, monthEl);
        } else {
            const years = ["2023", "2022", "2021"]; // 2024 추후에 추가
            addOpts(years, yearEl);
            if(current.id == "3rd") {
                const months = ["3", "4", "7", "10"]; // 2024 추가 이후에는 5로 바꾸기
                addOpts(months, monthEl);
                testNameEl.innerHTML += "월 고3 전국연합학력평가"
            } else {
                const months = ["3", "6", "9", "11"]; // 2024 추가 이후에는 10으로 바꾸기
                addOpts(months, monthEl);
                if(current.id == "2nd") {
                    testNameEl.innerHTML += "월 고2 전국연합학력평가"
                } else {
                    testNameEl.innerHTML += "월 고1 전국연합학력평가"
                }
            }
        }
    })
})

function yearChange() {
    yearEl = document.querySelector("#year");
    monthEl = document.querySelector("#month");
    typeEls.forEach((type) => {
        if(type.checked == true) {
            if(type.value == "3rd") {
                const change = monthEl.children[1];
                if(yearEl.value == "2024") {
                    change.value = "5";
                    change.innerText = "5";
                } else {
                    change.value = "4";
                    change.innerText = "4";
                }
            } else {
                const change = monthEl.children[3];
                if(yearEl.value == "2024") {
                    change.value = "10";
                    change.innerText = "10";
                } else {
                    change.value = "11";
                    change.innerText = "11";
                }
            }
        }
    })
}