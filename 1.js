var offset = 0;

function displayInfo(res) {
    var jsonToJs = JSON.parse(res);
    if (jsonToJs.code == 200){
        var tbody = document.getElementById('tbody-info');
        if (document.getElementsByTagName('tr').length > 1){
            // 删除上次的结果
            tbody.parentNode.removeChild(tbody);
            var table = document.getElementById('table');
            var tbody = document.createElement('tbody');
            tbody.setAttribute("id", "tbody-info");
            table.appendChild(tbody);
            var tbody = document.getElementById('tbody-info');
        }
        for (var i = 0; i < jsonToJs.info.length; i++) {
            // 创建tr
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
            // 创建td
            for (var k in jsonToJs.info[i]){
                if (jsonToJs.info[i][k] != jsonToJs.info[i]['HTML_LINK']){
                    var td = document.createElement('td');
                    if (jsonToJs.info[i][k] == jsonToJs.info[i]['FUNC_NAME']){
                        td.innerHTML = "<a href='" + jsonToJs.info[i]['HTML_LINK'] + "'>" + jsonToJs.info[i][k] + "</a>"
                    }else{
                        td.innerHTML = jsonToJs.info[i][k];
                    }
                    tr.appendChild(td);
                }
            }
        }
        desplayTpage();
    }else{
        alert(jsonToJs.info);
    }
}

function desplayTpage() {
    var page = document.getElementById('page');
    var tmp = document.getElementById('previousPage');
    if (tmp) {tmp.remove();}
    tmp = document.getElementById('nextPage');
    if (tmp) {tmp.remove();}
    if (offset>0){
        var previousPage = document.createElement('button');
        previousPage.setAttribute('onclick', 'search("previousPage")');
        previousPage.setAttribute('id', 'previousPage');
        previousPage.innerText = "上一页";
        page.appendChild(previousPage);
    }
    // 已有20个数据
    if (document.getElementsByTagName('tr').length == 21){
        var nextPage = document.createElement('button');
        nextPage.setAttribute('onclick', 'search("nextPage")');
        nextPage.setAttribute('id', 'nextPage');
        nextPage.innerText = "下一页";
        page.appendChild(nextPage);
    }

}

window.onload = function () {
            var xmlhttp;
            if (window.XMLHttpRequest) {
                //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // IE6, IE5 浏览器执行代码
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //初始化table内容
                    //将服务器端json数据转成js对象，传回前端页面
                    var json = xmlhttp.responseText;
                    displayInfo(json);
                }
            }

            xmlhttp.open("GET", "http://127.0.0.1:5000/getData", true);
            xmlhttp.send();
        }

// where, like, offset
// where in ['FUNC_NAME', 'VER_INFO', 'FUNC_PURPOSE', 'HTML_LINK', 'FUNC_USAGE', 'FUNC_WARNING', 'FUNC_NOTE', 'FUNC_CHANGE_LOG']
function search(flag='search'){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            var xmlhttp;
            if (window.XMLHttpRequest) {
                //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // IE6, IE5 浏览器执行代码
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //初始化table内容
                    //将服务器端json数据转成js对象，传回前端页面
                    var json = xmlhttp.responseText;
                    displayInfo(json);
                }
            }

            var where = document.getElementById('typelist').value;
            var like = document.getElementById('search_like').value;
            if (flag == "nextPage") {
                offset += 20;
            }else if (flag == "previousPage") {
                offset -= 20;
            }else if (flag == "search") {
                offset = 0;
            }
            var params = 'where=' + where + '&like=' + like + '&offset=' + offset;
            xmlhttp.open("GET", "http://127.0.0.1:5000/getData?" + params, true);
            xmlhttp.send();
        }
