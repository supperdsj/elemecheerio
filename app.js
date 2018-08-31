const axios = require('axios');

function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function main() {
    let shops = [];
    console.log('start');
    for (let i = 0; i < 10; i++) {
        // axios.get({
        //     url:`https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wx4g1wcswhqb&latitude=39.940218&limit=24&longitude=116.435432&offset=${shops.length}&restaurant_category_ids%5B%5D=-100&sign=1535687117685&terminal=web`,
        //     headers: {
        //         'cookie': 'ubt_ssid=9e16q7uzjpl6t3v7wnjbsdoysx9xfd4q_2018-08-31; _utrace=468814b2ce8cfa884f90b9a3fd356464_2018-08-31; track_id=1535687047|b3fa31e4518778b9eced9362105291c8c51bb33201682478cd|e2882e65e7cf535afcc709cff50983f6; USERID=28470805; SID=oyyNdQ7VCBoEyrH3PrgJram0ggOO6CwDvUjQ'
        //     }
        // });
        // shops = [...shops, ...(await axios.get(`https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wx4g1wcswhqb&latitude=39.940218&limit=24&longitude=116.435432&offset=${shops.length}&restaurant_category_ids%5B%5D=-100&sign=1535641308142`)).data]
        // shops = [...shops, ...(await axios.get(`https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wx4g1wcswhqb&latitude=39.940218&limit=24&longitude=116.435432&offset=${shops.length}&restaurant_category_ids%5B%5D=-100&sign=1535643656443&terminal=web`)).data];
        shops = [...shops, ...(await axios({
            url: `https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wx4g1wcswhqb&latitude=39.940218&limit=24&longitude=116.435432&offset=${shops.length}&restaurant_category_ids%5B%5D=-100&sign=1535687117685`,
            method: "GET",
            headers: {
                'cookie': 'ubt_ssid=9e16q7uzjpl6t3v7wnjbsdoysx9xfd4q_2018-08-31; _utrace=468814b2ce8cfa884f90b9a3fd356464_2018-08-31; track_id=1535687047|b3fa31e4518778b9eced9362105291c8c51bb33201682478cd|e2882e65e7cf535afcc709cff50983f6; USERID=28470805; SID=oyyNdQ7VCBoEyrH3PrgJram0ggOO6CwDvUjQ'
            }
        })).data];
        // await sleep(2000);
        console.log(shops.length);
    }
    console.log(`shops loaded:${shops.length}`);
    let i = 0;
    for (let shop of shops) {
        console.log(`${i++}:${shop.id}`);
        // shop.tags = (await axios.get(`https://www.ele.me/restapi/shopping/v2/menu?restaurant_id=${shop.id}`)).data;
        shop.tags = (await axios({
            url: `https://www.ele.me/restapi/shopping/v2/menu?restaurant_id=${shop.id}`,
            method: "GET",
            headers: {
                'cookie': 'ubt_ssid=9e16q7uzjpl6t3v7wnjbsdoysx9xfd4q_2018-08-31; _utrace=468814b2ce8cfa884f90b9a3fd356464_2018-08-31; track_id=1535687047|b3fa31e4518778b9eced9362105291c8c51bb33201682478cd|e2882e65e7cf535afcc709cff50983f6; USERID=28470805; SID=oyyNdQ7VCBoEyrH3PrgJram0ggOO6CwDvUjQ'
            }
        })).data;
    }
    console.log('foods loaded');
    console.log(`shop.name屫shop.distance屫shop.address屫shop.rating屫shop.rating_count屫shop.recent_order_num屫shop.opening_hours屫flavors屫tag.name屫ag.description屫food.name屫food.description屫food.month_sales屫food.rating屫food.rating_count屫sfood.name屫sfood.recent_rating屫sfood.price屫sfood.recent_popularity`);
    for (let shop of shops) {
        for (let tag of shop.tags) {
            for (let food of tag.foods) {
                let flavors = [];
                for (let fav of shop.flavors) {
                    flavors.push(fav.name);
                }
                flavors = flavors.join('/');
                for (let sfood of food.specfoods) {
                    let str = `${shop.name}屫${shop.distance}屫${shop.address}屫${shop.rating}屫${shop.rating_count}屫${shop.recent_order_num}屫${shop.opening_hours}屫${flavors}屫${tag.name}屫${tag.description}屫${food.name}屫${food.description}屫${food.month_sales}屫${food.rating}屫${food.rating_count}屫${sfood.name}屫${sfood.recent_rating}屫${sfood.price}屫${sfood.recent_popularity}`;
                    while (str.indexOf('\n') >= 0) {
                        str = str.replace('\n', '');
                    }
                    console.log(str);
                }
            }
        }
    }
    console.log('finish');
}

main();