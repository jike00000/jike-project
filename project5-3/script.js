 var a = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a"];
 var b = [];   // 用来放重复的元素
 var isRepeated;
 document.getElementById("demo1").innerHTML = a;  //输出数组
 document.getElementById("demo2").innerHTML = a.sort();  //输出排序后数组
 for (var i = 0; i < a.length; i++) {
    // 检测元素是否在之前重复过
     for (var k = 0; k < b.length; k++) {
         if (a[i] == b[k]) {
             isRepeated = true;
             break;
         } else {
             isRepeated = false;
         }
     }
     // 如果元素没有重复过，从元素位置往后遍历
     if (!isRepeated) {
         var num = 1;
         document.write(a[i] + " key: " + i + " ");
         for (var j = i + 1; j < a.length; j++) {
            //  如果元素重复，元素个数加一，并将元素加入到b数组中
             if (a[i] == a[j]) {  
                 num += 1;
                 document.write(j + " ");
                 b.push(a[i]);  //
             }
         }
         document.write("<br>" + "&nbsp;" + "count: " + num);
         document.write("<br>");
     }
 }