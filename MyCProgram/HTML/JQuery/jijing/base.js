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
                } else {
                    return "排序"
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
            },
            displayInNum: function(key) {
                return key == "jijing_last1year" || key == "jijing_last2year" || key == "jijing_last3year" || key == "jijing_last6Month" ||
                key == "jijing_last3Month" || key == "jijing_lastMonth" || key == "jijing_lastWeek" || key=="jijing_sinceestablish" || key == "jijing_sinceThisYear"
            },
            displayInSort: function(key) {
                return key.indexOf("sort")>0;
            },
            displayLink: function(key) {
                return key == "wareId";
            }
        }
    })


     var demo = new Vue({
        el: '#demo',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish'],
            gridData: goods
        }
    });

    var month1 = new Vue({
        el: '#month1',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish'],
            gridData: month1
        }
    });

/*
    var demo = new Vue({
        el: '#month3',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish', 'Sort'],
            gridData: goods
        }
    })

    var demo = new Vue({
        el: '#month6',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish', 'Sort'],
            gridData: goods
        }
    })

    var demo = new Vue({
        el: '#year1',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish', 'Sort'],
            gridData: goods
        }
    })

    var demo = new Vue({
        el: '#year2',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish', 'Sort'],
            gridData: goods
        }
    })

    var demo = new Vue({
        el: '#year3',
        data: {
            searchQuery: '',
            gridColumns: ['jijing_Code', 'jijing_Name', 'jijing_unitValue', 'jijing_totalValue', 'jijing_daliyIncreaseRate', 'jijing_lastWeek', 'jijing_lastWeek_sort', 'jijing_lastMonth', 'jijing_lastMonth_sort', 'jijing_last3Month', 'jijing_last3Month_sort', 'jijing_last6Month', 'jijing_last6Month_sort', 'jijing_last1year', 'jijing_last1year_sort', 'jijing_last2year', 'jijing_last2year_sort', 'jijing_last3year', 'jijing_last3year_sort', 'jijing_sinceThisYear', 'jijing_sinceestablish', 'Sort'],
            gridData: goods
        }
    })
    */



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

        //this.css('property', 'value');
        //this.style.backColor="#ffffff";
        if (this.id != "header")
            for (var i = 0; i < this.cells.length; i++) {
                console.log(this.cells[i].style.backgroundColor);
                //this.cells[i].style.background-color="#ffffff";
                this.cells[i].style.backgroundColor = "#d5f4fe";
            }

    }

    function doMouseout1() {
        if (this.id != "header")
            for (var i = 0; i < this.cells.length; i++) {
                //this.cells[i].style.background-color="#ffffff";
                this.cells[i].style.backgroundColor = "#f9f9f9";
            }
    }


    function doMouseover() {
        this.width = this.width * 1.05;
        this.height = this.height * 1.05;
    }

    function doMouseout() {
        this.width = this.width / 1.05;
        this.height = this.height / 1.05;
    }