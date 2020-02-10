function parse_xml(content) {
    var xml_doc = null;
    try {
        xml_doc = (new DOMParser()).parseFromString(content.replace(/[\n\r]/g, ""), 'text/xml');
    } catch (e) {
        return false;
    }
    var flag = 0

    function build_xml(index, list, element) {
        var t = []
        for (var i = 0; i < flag; i++) {
            t.push('&nbsp;&nbsp;&nbsp;&nbsp;');
        }
        t = t.join("");
        list.push(t + '&lt;<span class="code-key">' + element.nodeName + '</span>&gt;<br/>');
        for (var i = 0; i < element.childNodes.length; i++) {
            var nodeName = element.childNodes[i].nodeName;
            if (element.childNodes[i].childNodes.length === 0) {
                var value_txt = ""
                var item = t + '&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="code-key">' + nodeName +
                    '</span>&gt;' + value_txt + '&lt;/<span class="code-key">' + nodeName + '</span>&gt;<br/>';
                list.push(item);
            } else if ((element.childNodes[i].childNodes.length === 1 && element.childNodes[i].childNodes[0].nodeValue != null)) {
                var value = element.childNodes[i].childNodes[0].nodeValue;
                var value_color = !isNaN(Number(value)) ? 'code-number' : 'code-string';
                var value_txt = '<span class="' + value_color + '">' + value + '</span>';
                var item = t + '&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="code-key">' + nodeName +
                    '</span>&gt;' + value_txt + '&lt;/<span class="code-key">' + nodeName + '</span>&gt;<br/>';
                list.push(item);

            } else {
                flag++
                build_xml(++index, list, element.childNodes[i]);
                flag--
            }
        }
        list.push(t + '&lt;/<span class="code-key">' + element.nodeName + '</span>&gt;<BR/>');
    }

    var list = [];
    build_xml(0, list, xml_doc.documentElement);

    return list.join("");
};

var msg = '<li class='position_shares' id='position_shares' style='display:block' ><div class='poptableWrap'><table class='ui-table-hover' width='100%' border='0' cellspacing='0' cellpadding='0'> <tr>   <th class="alignLeft">股票名称</th>   <th class="alignRight">持仓占比</th>   <th class="alignRight">涨跌幅</th>   <th class="alignRight10">相关资讯</th>  </tr><tr>  <td colspan="4" style="color:#808080">暂无数据  </td>   </tr></table><p class='sum'></p></div><div class='poptableWrap_footer'><span class='end_date'>持仓截止日期: </span><a href='http://fundf10.eastmoney.com/ccmx_000016.html' class='poptab_more'>更多持仓信息></a></div></li>';

console.log(parse_xml(msg));