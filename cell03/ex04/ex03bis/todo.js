<!-- ต้องมี jQuery ก่อน -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<script>
const ft_list = $("#ft_list");
const newBtn = $("#new_btn");

// 1. โหลด TO DO จาก cookie ตอนเปิดหน้า
$(window).on("load", function () {
    const cookies = document.cookie.split("; ");
    const todoCookie = cookies.find(row => row.startsWith("todo_list="));

    if (todoCookie) {
        const tasks = JSON.parse(
            decodeURIComponent(todoCookie.split("=")[1])
        );

        // reverse เพื่อให้ลำดับบนสุดเหมือนเดิม
        tasks.reverse().forEach(taskText => addTask(taskText, false));
    }
});

// 2. ปุ่ม New
newBtn.on("click", function () {
    const task = prompt("What do you need to do?");
    if (task && task.trim() !== "") {
        addTask(task, true);
    }
});

// 3. เพิ่ม task ลง DOM
function addTask(text, save) {
    const div = $("<div></div>").text(text);

    // click เพื่อลบ
    div.on("click", function () {
        if (confirm("Do you really want to remove this TO DO?")) {
            $(this).remove();
            saveToCookies();
        }
    });

    // ต้องเพิ่มไว้บนสุด
    ft_list.prepend(div);

    if (save) saveToCookies();
}

// 4. บันทึกลง cookie
function saveToCookies() {
    const tasks = [];

    ft_list.children("div").each(function () {
        tasks.push($(this).text());
    });

    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie =
        "todo_list=" +
        encodeURIComponent(JSON.stringify(tasks)) +
        ";" +
        expires +
        ";path=/";
}
</script>
