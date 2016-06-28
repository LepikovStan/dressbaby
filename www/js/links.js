/*
 $('.subregions li').each(function(i, el) {
 if ($(el).text().match('(городской округ)')) {
 console.log('"'+$.trim($(el).text().toLowerCase().replace('(городской округ)', ''))+'": '+$(el).find('a').attr('href').split('/')[3]+',');
 }
 });
* */
/*

 https://www.gismeteo.ru/catalog/russia/1980/
 https://www.gismeteo.ru/catalog/russia/1912/
 https://www.gismeteo.ru/catalog/russia/1914/
 https://www.gismeteo.ru/catalog/russia/1980/
 https://www.gismeteo.ru/catalog/russia/2002/
 https://www.gismeteo.ru/catalog/russia/4956/
 https://www.gismeteo.ru/catalog/russia/2030/
 https://www.gismeteo.ru/catalog/russia/4603/
 https://www.gismeteo.ru/catalog/russia/2065/
 https://www.gismeteo.ru/catalog/russia/2078/
 https://www.gismeteo.ru/catalog/russia/2095/
 https://www.gismeteo.ru/catalog/russia/2115/
 https://www.gismeteo.ru/catalog/russia/2116/
 https://www.gismeteo.ru/catalog/russia/2157/
 https://www.gismeteo.ru/catalog/russia/4616/
 https://www.gismeteo.ru/catalog/russia/2185/
 https://www.gismeteo.ru/catalog/russia/2211/
 https://www.gismeteo.ru/catalog/russia/4618/
 https://www.gismeteo.ru/catalog/russia/4620/
 https://www.gismeteo.ru/catalog/russia/4627/
 https://www.gismeteo.ru/catalog/russia/4633/
 https://www.gismeteo.ru/catalog/russia/2313/
 https://www.gismeteo.ru/catalog/russia/2326/
 https://www.gismeteo.ru/catalog/russia/2359/
 https://www.gismeteo.ru/catalog/russia/2350/
 https://www.gismeteo.ru/catalog/russia/2376/
 https://www.gismeteo.ru/catalog/russia/2384/
 https://www.gismeteo.ru/catalog/russia/2392/
 https://www.gismeteo.ru/catalog/russia/4641/
 https://www.gismeteo.ru/catalog/russia/2436/
 https://www.gismeteo.ru/catalog/russia/4920/
 https://www.gismeteo.ru/catalog/russia/4927/
 https://www.gismeteo.ru/catalog/russia/4925/
 https://www.gismeteo.ru/catalog/russia/4928/
 https://www.gismeteo.ru/catalog/russia/2496/
 https://www.gismeteo.ru/catalog/russia/2502/
 https://www.gismeteo.ru/catalog/russia/2531/
 https://www.gismeteo.ru/catalog/russia/2525/
 https://www.gismeteo.ru/catalog/russia/2513/
 https://www.gismeteo.ru/catalog/russia/4661/
 https://www.gismeteo.ru/catalog/russia/2571/






 https://www.gismeteo.ru/catalog/russia/2581/
 https://www.gismeteo.ru/catalog/russia/2608/
 https://www.gismeteo.ru/catalog/russia/4664/
 https://www.gismeteo.ru/catalog/russia/2669/
 https://www.gismeteo.ru/catalog/russia/2653/
 https://www.gismeteo.ru/catalog/russia/2670/
 https://www.gismeteo.ru/catalog/russia/2664/
 https://www.gismeteo.ru/catalog/russia/4689/
 https://www.gismeteo.ru/catalog/russia/4688/
 https://www.gismeteo.ru/catalog/russia/4146/
 https://www.gismeteo.ru/catalog/russia/2690/
 https://www.gismeteo.ru/catalog/russia/251/
 https://www.gismeteo.ru/catalog/russia/2768/
 https://www.gismeteo.ru/catalog/russia/2772/
 https://www.gismeteo.ru/catalog/russia/2776/
 https://www.gismeteo.ru/catalog/russia/2777/
 https://www.gismeteo.ru/catalog/russia/2787/
 https://www.gismeteo.ru/catalog/russia/4703/
 https://www.gismeteo.ru/catalog/russia/2819/
 https://www.gismeteo.ru/catalog/russia/2808/
 https://www.gismeteo.ru/catalog/russia/4705/
 https://www.gismeteo.ru/catalog/russia/4709/
 https://www.gismeteo.ru/catalog/russia/4713/
 https://www.gismeteo.ru/catalog/russia/2913/
 https://www.gismeteo.ru/catalog/russia/2952/
 https://www.gismeteo.ru/catalog/russia/4728/
 https://www.gismeteo.ru/catalog/russia/4731/
 https://www.gismeteo.ru/catalog/russia/3054/

 https://www.gismeteo.ru/catalog/russia/3071/
 https://www.gismeteo.ru/catalog/russia/3082/
 https://www.gismeteo.ru/catalog/russia/3101/
 https://www.gismeteo.ru/catalog/russia/4738/
 https://www.gismeteo.ru/catalog/russia/4850/
 https://www.gismeteo.ru/catalog/russia/4955/
 https://www.gismeteo.ru/catalog/russia/4125/





 https://www.gismeteo.ru/catalog/russia/4121/
 https://www.gismeteo.ru/catalog/russia/4109/
 https://www.gismeteo.ru/catalog/russia/4102/
 https://www.gismeteo.ru/catalog/russia/4072/
 https://www.gismeteo.ru/catalog/russia/4047/
 https://www.gismeteo.ru/catalog/russia/4064/
 https://www.gismeteo.ru/catalog/russia/4065/
 https://www.gismeteo.ru/catalog/russia/4833/
 https://www.gismeteo.ru/catalog/russia/4834/
 https://www.gismeteo.ru/catalog/russia/4835/
 https://www.gismeteo.ru/catalog/russia/4836/
 https://www.gismeteo.ru/catalog/russia/4831/
 https://www.gismeteo.ru/catalog/russia/4828/
 https://www.gismeteo.ru/catalog/russia/3989/
 https://www.gismeteo.ru/catalog/russia/3952/
 https://www.gismeteo.ru/catalog/russia/3934/
 https://www.gismeteo.ru/catalog/russia/3937/
 https://www.gismeteo.ru/catalog/russia/3904/
 https://www.gismeteo.ru/catalog/russia/3879/
 https://www.gismeteo.ru/catalog/russia/4811/
 https://www.gismeteo.ru/catalog/russia/4816/
 https://www.gismeteo.ru/catalog/russia/4817/
 https://www.gismeteo.ru/catalog/russia/4808/
 https://www.gismeteo.ru/catalog/russia/4803/
 https://www.gismeteo.ru/catalog/russia/3772/
 https://www.gismeteo.ru/catalog/russia/3773/
 https://www.gismeteo.ru/catalog/russia/3777/
 https://www.gismeteo.ru/catalog/russia/3791/
 https://www.gismeteo.ru/catalog/russia/3793/
 https://www.gismeteo.ru/catalog/russia/4801/
 https://www.gismeteo.ru/catalog/russia/4591/
 https://www.gismeteo.ru/catalog/russia/3695/
 https://www.gismeteo.ru/catalog/russia/4797/
 https://www.gismeteo.ru/catalog/russia/4899/
 https://www.gismeteo.ru/catalog/russia/3680/
 https://www.gismeteo.ru/catalog/russia/4947/
 https://www.gismeteo.ru/catalog/russia/4942/
 https://www.gismeteo.ru/catalog/russia/4147/
 https://www.gismeteo.ru/catalog/russia/3650/
 https://www.gismeteo.ru/catalog/russia/3606/
 https://www.gismeteo.ru/catalog/russia/3610/
 https://www.gismeteo.ru/catalog/russia/3611/
 https://www.gismeteo.ru/catalog/russia/4774/
 https://www.gismeteo.ru/catalog/russia/3546/
 https://www.gismeteo.ru/catalog/russia/3542/
 https://www.gismeteo.ru/catalog/russia/3533/
 https://www.gismeteo.ru/catalog/russia/3509/
 https://www.gismeteo.ru/catalog/russia/3489/
 https://www.gismeteo.ru/catalog/russia/3499/
 https://www.gismeteo.ru/catalog/russia/3474/
 https://www.gismeteo.ru/catalog/russia/3469/
 https://www.gismeteo.ru/catalog/russia/3454/
 https://www.gismeteo.ru/catalog/russia/3444/
 https://www.gismeteo.ru/catalog/russia/3416/
 https://www.gismeteo.ru/catalog/russia/3413/
 https://www.gismeteo.ru/catalog/russia/3373/
 https://www.gismeteo.ru/catalog/russia/3343/
 https://www.gismeteo.ru/catalog/russia/1418/
 https://www.gismeteo.ru/catalog/russia/3320/
 https://www.gismeteo.ru/catalog/russia/3331/
 https://www.gismeteo.ru/catalog/russia/3312/
 https://www.gismeteo.ru/catalog/russia/3306/
 https://www.gismeteo.ru/catalog/russia/3297/
 https://www.gismeteo.ru/catalog/russia/3282/
 https://www.gismeteo.ru/catalog/russia/3262/
 https://www.gismeteo.ru/catalog/russia/3230/
 https://www.gismeteo.ru/catalog/russia/3200/
 https://www.gismeteo.ru/catalog/russia/3193/
 https://www.gismeteo.ru/catalog/russia/3192/
 https://www.gismeteo.ru/catalog/russia/3134/
 https://www.gismeteo.ru/catalog/russia/3125/
 https://www.gismeteo.ru/catalog/russia/3129/
*/