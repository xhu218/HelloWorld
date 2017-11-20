    // register the grid component
    Vue.component('demo-grid', {
        template: '#grid-template',
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function() {
            var sortOrders = {}
            this.columns.forEach(function(key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredData: function() {
                var sortKey = this.sortKey
                var filterKey = this.filterKey && this.filterKey.toLowerCase()
                var order = this.sortOrders[sortKey] || 1
                var data = this.data
                if (filterKey) {

                    data = data.filter(function(row) {
                        return Object.keys(row).some(function(key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })


                }
                if (sortKey) {
                    data = data.slice().sort(function(a, b) {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return data
            }
        },
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            },
            changeHeader: function(str) {


                if (str == "jijing_Code") {
                    return "基金代码";
                } else if (str == "jijing_Name") {
                    return "基金简称";
                } else if (str == "jijing_unitValue") {
                    return "单位净值";
                } else if (str == "jijing_totalValue") {
                    return "累计净值";
                } else if (str == "jijing_daliyIncreaseRate") {
                    return "日增长率";
                } else if (str == "jijing_lastWeek") {
                    return "近1周";
                } else if (str == "jijing_lastMonth") {
                    return "近1月";
                } else if (str == "jijing_last3Month") {
                    return "近3月";
                } else if (str == "jijing_last6Month") {
                    return "近6月"
                } else if (str == "jijing_last1year") {
                    return "近1年"
                } else if (str == "jijing_last2year") {
                    return "近2年"
                } else if (str == "jijing_last3year") {
                    return "近3年"
                } else if (str == "jijing_sinceThisYear") {
                    return "今年来"
                } else if (str == "jijing_sinceestablish") {
                    return "成立来"
                } else if(str =="jijing_last3year_sort" || str == "jijing_last2year_sort" || str == "jijing_last1year_sort" || str == "jijing_last6Month_sort" 
                    || str == "jijing_last3Month_sort" || str == "jijing_lastMonth_sort" || str == "jijing_lastWeek_sort") {

                    return "排序"
                }else if (str == "select"){
                    return "选择";
                }

            }
        },
        methods: {
            sortBy: function(key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            },
            displayInDiv: function(key) {
                return key == "jijing_Code" || key == "jijing_Name" 
            }
        }
    })


    var demo = new Vue({
        el: '#demo',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish', 'select'],
            gridData: goods
        }
    });

    function GetTail() {
        $.ajax({
            url: './data/2017-11-19-tail-1.json',
            type: 'GET', //GET
            async: true, //或false,是否异步 
            timeout: 10000, //超时时间
            dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
            beforeSend: function(xhr) {
                console.log(xhr)
                console.log('发送前')
            },
            success: function(data, textStatus, jqXHR) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {

                    Vue.set(goods, 1000 + i, data[i]);
                }
               
               


                console.log(textStatus)
                console.log(jqXHR)
            },
            error: function(xhr, textStatus) {
                console.log('错误')
                console.log(xhr)
                console.log(textStatus)
            },
            complete: function() {
                console.log('结束') 
                setTimeout(changeStyle(), 10000);
            }
        })
    }

    function changeStyle() {
        console.log("start to chage style...")
        console.log($("tr").length);
        var color = "#b9e8e8"

        //$("tr").attr("bgColor", "#b9e8e8");

        //$("tr:even").css("background-color", "#93b1b1");

        
        $("tr :nth-child(7)").css("background", color);
        $("tr :nth-child(9)").css("background", color);
        $("tr :nth-child(11)").css("background", color);
        $("tr :nth-child(13)").css("background", color);
        $("tr :nth-child(15)").css("background", color);
        $("tr :nth-child(17)").css("background", color);
        $("tr :nth-child(19)").css("background", color);
        $("tr").each(function(index) {
            if ($(this).children().last().text().trim() == "true") {
                $(this).attr("bgColor", "#93b1b1");
            }
        });
    }

    $(document).ready(function() {
        changeStyle();
        //setTimeout(function() { GetTail() }, 3000);

    });


    window.onload = function() {


        var imgs = document.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; i++) {

            if (document.addEventListener) {
                imgs[i].addEventListener("mouseover", doMouseover, false);
                imgs[i].addEventListener("mouseout", doMouseout, false);
            } else if (document.attachEvent) {
                imgs[i].attachEvent("mouseover", doMouseover);
                imgs[i].attachEvent("mouseout", doMouseout);
            } else {
                imgs[i].onmouseover = doMouseover;
                imgs[i].onmouseout = doMouseout;
            }
        }

        var trs = document.getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {

            if (document.addEventListener) {
                trs[i].addEventListener("mouseover", doMouseover1, false);
                trs[i].addEventListener("mouseout", doMouseout1, false);
            } else if (document.attachEvent) {
                trs[i].attachEvent("mouseover", doMouseover1);
                trs[i].attachEvent("mouseout", doMouseout1);
            } else {
                trs[i].onmouseover = doMouseover1;
                trs[i].onmouseout = doMouseout1;
            }
        }



    }

    function doMouseover1() {

        if (this.id != "header") {
            this["backcolor"] = this.style.backgroundColor;
            this.style.backgroundColor = "#ffff00";
        }
    }

    function doMouseout1() {
        if (this.id != "header")
            this.style.backgroundColor = this["backcolor"];
    }


    function doMouseover() {
        this.width = this.width * 1.05;
        this.height = this.height * 1.05;
    }

    function doMouseout() {
        this.width = this.width / 1.05;
        this.height = this.height / 1.05;
    }