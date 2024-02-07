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


                if (str == "imageurl") {
                    return "图片";
                } else if (str == "jdPrice") {
                    return "京东价格";
                } else if (str == "miaoShaPrice") {
                    return "秒杀价格";
                } else if (str == "discount") {
                    return "降价";
                } else if (str == "rate") {
                    return "折扣";
                } else if (str == "startTimeShow") {
                    return "开始时间";
                } else if (str == "endRemainTime") {
                    return "线束时间";
                } else if (str == "soldRate") {
                    return "卖出比例";
                } else if (str == "wname") {
                    return "名字";
                }

            }
        },
        methods: {
            sortBy: function(key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            },
            displayInDiv: function(key) {
                return key != "imageurl" && key != "endRemainTime" && key != "wname";
            },
            displayForRemianTime: function(key) {
                return key == "endRemainTime";
            },
            displayImage: function(key) {
                return key == "imageurl";
            },
            displayLink: function(key) {
                return key == "wname";
            }
        }
    })


    var demo = new Vue({
        el: '#demo',
        data: {
            searchQuery: '',
            gridColumns: ['imageurl', 'jdPrice', 'miaoShaPrice', 'discount', 'rate', 'startTimeShow', 'endRemainTime', 'soldRate', 'wname'],
            gridData: goods
        }
    })


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
