function www(item_no) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://www.yuceyi.com:9999/purchase_order/complete/list/',
        json: true,
        qs: {
            offset: '0',
            limit: '20',
            ordering: '',
            stock_keep_unit__product__item_no: 'BAG000107864N'
        },
        headers: {
            'postman-token': 'd5261416-ad63-e26f-63e2-6191b4204391',
            'cache-control': 'no-cache',
            cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0; warehouse=xiaoshan',
            'accept-language': 'zh-CN,zh;q=0.8',
            'accept-encoding': 'gzip, deflate',
            referer: 'http://www.yuceyi.com:9999/web',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilx1NzM4Ylx1NzNjYVx1NTlhZSIsImlzX2Nvb3BlcmF0aXZlX3N1cHBsaWVyIjpmYWxzZSwibG9naW5fbmFtZSI6InNoYW5uaXdhbmdAZXBpY2xvdWRzLm5ldCIsImV4cCI6MTUxMTg0NTYyNSwidXNlcl9pZCI6MTU2LCJ1c2VyX3V1aWQiOiIiLCJlbWFpbCI6IiJ9.tR496PE5ZhPXlXQguhO3T_cgG1HvRy1Qt2C99wGxZg0',
            'x-requested-with': 'XMLHttpRequest',
            accept: 'application/json, text/javascript, */*; q=0.01'
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        console.log("-----------------------------------------------------------");
        console.log(body.count);
        if (body.count > 0) {


            var image_url = body.results[0].stock_keep_unit.product.sku_image_url;
            var title = body.results[0].stock_keep_unit.sku_title;
            console.log(title, image_url);

        } else {

        }

    });

}

www("BAG000107864N");