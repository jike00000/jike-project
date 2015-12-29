//给每个.circle绑定onclick
var list = document.querySelectorAll(".circle");
for (var i = 0; i < list.length; i++) {
    list[i].onclick = change;
}


function change() {
    //取得点击元素的背景颜色
    var color = this.style.backgroundColor;
    //改变其他元素的颜色
    document.getElementById('loading').style.backgroundColor = color;
    document.querySelector('.greenbtn3').style.backgroundColor = color;
    document.querySelector('.lesson-nav').style.borderColor = color;
    document.querySelectorAll('.free-box p')[0].style.color = color;
    document.querySelectorAll('.free-box p')[1].style.color = color;
    document.querySelector('.greenbtn2').style.color = color;
    document.querySelector('.greenbtn2').style.borderColor = color;
    document.querySelector('.hot-lesson ul').style.backgroundColor = color;
    document.querySelector('.jktxt').style.color = color;
    document.querySelectorAll('.free-box h2')[0].style.color = color;
    document.querySelectorAll('.free-box h2')[1].style.color = color;
    // 遍历a标签,改变每个标签的字体颜色
    var fontColorList = document.querySelectorAll('a');
    for (var i = 0; i < fontColorList.length; i++) {
        fontColorList[i].style.color = color;
    }
    // 将获取的颜色存储到localStorage
    localStorage["localColor"] = color;

}

// 页面加载时,改变元素颜色
document.getElementById('loading').style.backgroundColor = localStorage["localColor"];
document.querySelector('.greenbtn3').style.backgroundColor = localStorage["localColor"];
document.querySelector('.lesson-nav').style.borderColor = localStorage["localColor"];
document.querySelectorAll('.free-box p')[0].style.color = localStorage["localColor"];
document.querySelectorAll('.free-box p')[1].style.color = localStorage["localColor"];
document.querySelector('.greenbtn2').style.color = localStorage["localColor"];
document.querySelector('.greenbtn2').style.borderColor = localStorage["localColor"];
document.querySelector('.hot-lesson ul').style.backgroundColor = localStorage["localColor"];
document.querySelector('.jktxt').style.color = localStorage["localColor"];
document.querySelectorAll('.free-box h2')[0].style.color = localStorage["localColor"];
document.querySelectorAll('.free-box h2')[1].style.color = localStorage["localColor"];
var fontColorList = document.querySelectorAll('a');
for (var i = 0; i < fontColorList.length; i++) {
    fontColorList[i].style.color = localStorage["localColor"];
}
