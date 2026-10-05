/* =========================================
   بيانات المنصة
========================================= */
// Supabase
const SUPABASE_URL ="https://xyxlbrvxvjwwdhfhdjvd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY ="sb_publishable_I_KdKIYT_n21zLnr9oFSYQ_xZYJk-GZ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase connected");

const TEACHER_PASSWORD = "1234";


let currentStudent = null;

let currentQuestion = 0;

let score = 0;


/* =========================================
   أسئلة تجريبية
========================================= */

const questions = [

    {
        question:
            "ما قيمة المميز للمعادلة x² - 5x + 6 = 0؟",

        options: [
            "1",
            "5",
            "25",
            "6"
        ],

        answer: 0
    },


    {
        question:
            "ما جذرا المعادلة x² - 5x + 6 = 0؟",

        options: [
            "1 و 6",
            "2 و 3",
            "3 و 4",
            "5 و 6"
        ],

        answer: 1
    },


    {
        question:
            "محدد المصفوفة [1 2; 3 4] يساوي:",

        options: [
            "-2",
            "2",
            "10",
            "12"
        ],

        answer: 0
    },


    {
        question:
            "ما قيمة |−7|؟",

        options: [
            "-7",
            "0",
            "7",
            "14"
        ],

        answer: 2
    },


    {
        question:
            "ميل المستقيم y = 3x + 2 يساوي:",

        options: [
            "2",
            "3",
            "-3",
            "1"
        ],

        answer: 1
    }

];


/* =========================================
   شاشة الدخول
========================================= */

function showStudentLogin() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("studentLogin")
        .classList.remove("hidden");
}


function showTeacherLogin() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("teacherLogin")
        .classList.remove("hidden");
}


function backToLogin() {

    document
        .querySelectorAll(".login-page")
        .forEach(page => {

            page.classList.add("hidden");

        });


    document
        .getElementById("loginPage")
        .classList.remove("hidden");
}


/* =========================================
   دخول الطالب
========================================= */

function studentLogin() {

    const name =
        document
            .getElementById("studentName")
            .value
            .trim();


    const number =
        document
            .getElementById("studentNumber")
            .value
            .trim();


    const error =
        document
            .getElementById("studentError");


    if (!name || !number) {

        error.textContent =
            "الرجاء إدخال اسم الطالب ورقم الطالب.";

        return;
    }


    if (number.length < 3) {

        error.textContent =
            "رقم الطالب غير صحيح.";

        return;
    }


    currentStudent = {

        name: name,

        number: number,

        loginTime:
            new Date().toLocaleString("ar-SA"),

        score: null,

        total: questions.length

    };


    saveStudent();


    document
        .getElementById("studentLogin")
        .classList.add("hidden");


    document
        .getElementById("studentPlatform")
        .classList.remove("hidden");


    document
        .getElementById("welcomeStudent")
        .textContent =
        `الطالب: ${name}`;


    startExam();

}


/* =========================================
   دخول المعلمة
========================================= */

function teacherLogin() {

    const password =
        document
            .getElementById("teacherPassword")
            .value;


    const error =
        document
            .getElementById("teacherError");


    if (password !== TEACHER_PASSWORD) {

        error.textContent =
            "كلمة المرور غير صحيحة.";

        return;
    }


    document
        .getElementById("teacherLogin")
        .classList.add("hidden");


    document
        .getElementById("teacherDashboard")
        .classList.remove("hidden");


    loadStudentsTable();

}


/* =========================================

.., [16/04/48 10:09 ص]
تخزين الطالب
========================================= */

function getStudents() {

    return JSON.parse(
        localStorage.getItem(
            "mathStudents"
        ) || "[]"
    );

}


function saveStudent() {

    const students =
        getStudents();


    const existing =
        students.find(
            student =>
                student.number ===
                currentStudent.number
        );


    if (existing) {

        Object.assign(
            existing,
            currentStudent
        );

    } else {

        students.push(
            currentStudent
        );

    }


    localStorage.setItem(
        "mathStudents",
        JSON.stringify(students)
    );

}


/* =========================================
   أدوات الطالب
========================================= */

function openStudentSection(section) {

    document
        .querySelectorAll(".student-section")
        .forEach(element => {

            element.classList.add("hidden");

        });


    let id = "";


    if (section === "tools")
        id = "studentTools";


    if (section === "flashcards")
        id = "studentFlashcards";


    if (section === "exam")
        id = "studentExam";


    if (section === "laws")
        id = "studentLaws";


    document
        .getElementById(id)
        .classList.remove("hidden");

}


/* =========================================
   المعادلة التربيعية
========================================= */

function solveEquation() {

    const a =
        Number(
            document.getElementById("a").value
        );


    const b =
        Number(
            document.getElementById("b").value
        );


    const c =
        Number(
            document.getElementById("c").value
        );


    const result =
        document.getElementById(
            "equationResult"
        );


    if (a === 0) {

        result.innerHTML =
            "قيمة a يجب أن تكون مختلفة عن صفر.";

        return;
    }


    const delta =
        b * b - 4 * a * c;


    if (delta > 0) {

        const x1 =
            (-b + Math.sqrt(delta))
            / (2 * a);


        const x2 =
            (-b - Math.sqrt(delta))
            / (2 * a);


        result.innerHTML = `

            <strong>
                المميز:
            </strong>

            ${delta}

            <br>

            الجذر الأول:
            ${x1.toFixed(2)}

            <br>

            الجذر الثاني:
            ${x2.toFixed(2)}

        `;

    }

    else if (delta === 0) {

        const x =
            -b / (2 * a);


        result.innerHTML = `

            المميز = 0

            <br>

            الجذر:

            ${x.toFixed(2)}

        `;

    }

    else {

        result.innerHTML = `

            المميز = ${delta}

            <br>

            الجذور مركبة.

        `;

    }

}


/* =========================================
   المصفوفة
========================================= */

function solveMatrix() {

    const a =
        Number(
            document.getElementById("m11").value
        );


    const b =
        Number(
            document.getElementById("m12").value
        );


    const c =
        Number(
            document.getElementById("m21").value
        );


    const d =
        Number(
            document.getElementById("m22").value
        );


    const determinant =
        a * d - b * c;


    document.getElementById(
        "matrixResult"
    ).innerHTML = `

        المحدد:

        (${a} × ${d})
        −
        (${b} × ${c})

        <br><br>

        <strong>
            = ${determinant}
        </strong>

    `;

}


/* =========================================
   البطاقات
========================================= */

const flashcards = [

    {
        question:
            "ما هو المميز؟",

        answer:
            "Δ = b² - 4ac"
    },


    {
        question:
            "متى تكون الجذور مركبة؟",

        answer:
            "عندما يكون Δ < 0"
    },


    {
        question:
            "ما صيغة الدالة الخطية؟",

        answer:
            "f(x) = mx + b"


}

];


let cardIndex = 0;


function flipCard() {

    document
        .getElementById("flashcard")
        .classList.toggle("flipped");

}


function nextCard() {

    cardIndex++;

    if (
        cardIndex >= flashcards.length
    ) {

        cardIndex = 0;

    }


    document.getElementById(
        "flashQuestion"
    ).textContent =
        flashcards[cardIndex].question;


    document.getElementById(
        "flashAnswer"
    ).textContent =
        flashcards[cardIndex].answer;


    document
        .getElementById("flashcard")
        .classList.remove("flipped");

}


/* =========================================
   الاختبار
========================================= */

function startExam() {

    currentQuestion = 0;

    score = 0;

    openStudentSection("exam");

    showQuestion();

}


function showQuestion() {

    const q =
        questions[currentQuestion];


    if (!q) {

        finishExam();

        return;
    }


    document.getElementById(
    "questionNumber"
).textContent =
    document.getElementById(
        "equationResult"
    ).textContent;

document.getElementById(
    "question"
).textContent =
    q.question;


    const options =
        document.getElementById(
            "options"
        );


    options.innerHTML = "";


    q.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                option;


            button.onclick = () => {

                if (
                    index === q.answer
                ) {

                    score++;

                }


                nextQuestion();

            };


            options.appendChild(
                button
            );

        }
    );

}


function nextQuestion() {

    currentQuestion++;

    showQuestion();

}


function finishExam() {

    if (!currentStudent)
        return;


    currentStudent.score =
        score;


    currentStudent.total =
        questions.length;


    saveStudent();


    alert("تم أنهاء الاختبار بنجاح");

   

/* =========================================
   لوحة المعلمة
========================================= */

function loadStudentsTable() { const students = getStudents(); const table = document.getElementById("studentsTable");
if (!table) return;

table.innerHTML = "";

students.forEach((student, index) => {
    const row = document.createElement("tr");

    let percentage = "-";

    if (
        student.score !== null &&
        student.total > 0
    ) {
        percentage = Math.round(
            (student.score / student.total) * 100
        );
    }

    row.innerHTML =
        "<td>" + (index + 1) + "</td>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.number + "</td>" +
        "<td>" + student.loginTime + "</td>" +
        "<td>" +
            (
                student.score !== null
                    ? student.score
                    : "لم يختبر"
            ) +
        "</td>" +
        "<td>" +
            (
                percentage === "-"
                    ? "-"
                    : percentage + "%"
            ) +
        "</td>";

    table.appendChild(row);
});
}
/* =========================================
   تصدير Excel
========================================= */

function exportExcel() {
const students = getStudents();

if (students.length === 0) {

    alert("لا توجد بيانات لتصديرها.");

    return;
}

let csv = "\uFEFF";

csv +=
    "اسم الطالب,رقم الطالب,وقت الدخول,الدرجة,النسبة\n";

students.forEach(student => {

    let percentage = "";

    if (
        student.score !== null &&
        student.total > 0
    ) {
        percentage = Math.round(
            (student.score / student.total) * 100
        );
    }

    csv +=
        '"' +
        student.name + '","' +
        student.number + '","' +
        student.loginTime + '","' +
        (student.score ?? "") + '","' +
        percentage + '%"\n';
});

const blob = new Blob(
    [csv],
    {
        type: "text/csv;charset=utf-8;"
    }
);

const url =
    URL.createObjectURL(blob);

const link =
    document.createElement("a");

link.href = url;

link.download =
    "بيانات-الطلاب.csv";

link.click();

URL.revokeObjectURL(url);
}
/* =========================================
   مسح البيانات
========================================= */

function clearStudentData() {

    const confirmed =
        confirm(
            "هل تريد مسح جميع بيانات الطلاب؟"
        );


    if (!confirmed)
        return;


    localStorage.removeItem(
        "mathStudents"
    );


    loadStudentsTable();

}


/* =========================================
   تسجيل الخروج
========================================= */

function logout() {

    currentStudent = null;


    document
        .getElementById("studentPlatform")
        .classList.add("hidden");


    document
        .getElementById("teacherDashboard")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}


/* =========================================
   تشغيل أولي
========================================= */

console.log(
    "منصة رياضيات ثاني ثانوي تعمل."
);

window.showStudentLogin = showStudentLogin;
window.showTeacherLogin = showTeacherLogin;
