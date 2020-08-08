// 时间段显示
!(function(){
    var sayhi = document.querySelector(".form_list .hi");
    var d = new Date();
    var hour = d.getHours();
    if(hour>=1 && hour<=5){
        sayhi.innerText='凌晨啦,请';
    }else if(hour>5 && hour<=8){
        sayhi.innerText='早上好,请';
    }else if(hour>8 && hour<=11){
        sayhi.innerText='上午好,请';
    }else if(hour>11 && hour<=13){
        sayhi.innerText='中午好,请';
    }else if(hour>13 && hour<=17){
        sayhi.innerText='下午好,请';
    }else if(hour>17 && hour<=24){
        sayhi.innerText='晚上好,请';
    }
})();


// 头部地区选择点击显示隐藏-------------------------------------------
!(function(){
    var place = document.querySelector(".place");
    var place_menu = document.querySelector(".place_menu");
    var close_menu = document.querySelector('.place_menu .close_menu');
    place.onclick=function(evt){
        var e = evt || event;
        e.stopPropagation?e.stopPropagation():(e.cancelBubble = true);
        place.style.background='#fff';
        place_menu.style.display='block';
        cutLetter();
    };
    close_menu.onclick=function(evt){
        var e = evt || event;
        e.stopPropagation?e.stopPropagation():(e.cancelBubble = true);
        place.style.background='';
        place_menu.style.display='none';
    };
    document.onclick=function(){
        place.style.background='';
        place_menu.style.display='none';
    };
})();

// 按字母查找城市位置----------------
function cutLetter(){
    var place_lis=document.querySelectorAll('.place .place_menu .all_city_list .select_city li');
    var city_list_wrap=document.querySelector(".city_list_wrap");
    var letterA_ele = document.querySelectorAll(".letter_list a");
    
    var place_arr = [0];
    var place_roll = 0;
    
    for(var i = 0 , n=place_lis.length-1; i < n; i++){
        place_roll += place_lis[i].clientHeight + 10;
        place_arr.push(place_roll);
    };
    
    for(let j=0 , leng = letterA_ele.length; j < leng; j++){
        letterA_ele[j].onclick=function(){
            animate(city_list_wrap,{
                scrollTop:place_arr[j]
            })
        }
    }
}


// json加载设置头部地区全部地区---------------------------------------------
!(function(){
    var cityList_ele = document.querySelector('.city_list_wrap');
    var cityUl = document.createElement('ul');
    cityUl.className='select_city';
    for(var i = 0 , a = chinaCity.length; i < a; i++){
        var cityLi   = document.createElement('li');
        var cityDiv1 = document.createElement('div');
        var cityDiv2 = document.createElement('div');
        cityDiv1.className='letter_zm';
        cityDiv1.innerText=chinaCity[i].letter;
        cityLi.appendChild(cityDiv1);
        cityDiv2.className='all_area';
        for(var j = 0 , b = chinaCity[i].city.length; j < b; j++){
            var cityA = document.createElement('a');
            cityA.setAttribute('href','#');
            cityA.innerText=chinaCity[i].city[j];
            cityDiv2.appendChild(cityA);
        }
        cityLi.appendChild(cityDiv2);
        cityUl.appendChild(cityLi);
    };
    cityList_ele.appendChild(cityUl);
})();


// 实现点击切换地区名称----------------------------------------------------------
!(function(){
    var place_message = document.querySelector('.place a em');
    var place_menu = document.querySelector('.place_menu');
    place_menu.onclick=function(evt){ 
        var e = evt || event;
        var target = e.target || e.srcElement;
        if(target.parentNode.getAttribute('class') === 'all_area'){
            place_message.innerText = target.innerText;
        }
        if(target.parentNode.nodeName === 'UL'){
            place_message.innerText = target.innerText;
        }
    };
})();


// 设置头部通知无缝滚动---------------------------------------------------------
!(function(){
    var inform_lis = document.querySelectorAll(".inform .ul_roll ul li");
    var inform_ul = document.querySelector(".inform .ul_roll ul");
    var ul_roll = document.querySelector(".ul_roll");
    // 拷贝一个元素
    var newli = inform_lis[0].cloneNode(true);
    inform_ul.appendChild(newli);
    // 实现自动滚动
    var roll_heigth = inform_lis[0].clientHeight;
    var wz = 0,timer;
    function move(){
        clearInterval(timer);
        timer = setInterval(function(){
            wz ++;
            if(wz >= roll_heigth * 3){
                wz = 0;
            }
            if(wz % roll_heigth === 0 ){
                clearInterval(timer);
                setTimeout(function(){
                    move();
                },3000);
            }
            ul_roll.scrollTop = wz;
        },10)
    }
    setTimeout(function(){
        move();
    },3000);
})();


// 菜单栏json加载---------------------------------------------------------
!(function(){
    var content_lists = document.querySelectorAll(".menu_list .content_list");
    var count = 0 ,count2=0;
    for (var i = 0 , n= menu.length; i < n; i++){
        count++;
        var newDiv = document.createElement('div');
        newDiv.className='con';
        var newP = document.createElement('p');
        newP.innerHTML= menu[i].title;
        newDiv.appendChild(newP);
        var newUl = document.createElement('ul');
        for (var j = 0 , a = menu[i].data.length; j < a; j++) {
            var newLi = document.createElement('li');
            newLi.innerHTML=menu[i].data[j];
            newUl.appendChild(newLi);
        };
        newDiv.appendChild(newUl);
        if( count <= 3 ){
            content_lists[count2].appendChild(newDiv);
            if(count == 2){
                count=0;
                count2++;
            }
        }
    };
})();


// 搜索框请求---------------------------------------------------------------
!(function(){
    var commodity_list=document.querySelector(".commodity_list");
    var commodity_list_ul = document.querySelector(".commodity_list ul");
    var seek_input = document.querySelector(".buy_box form input");
    var history_ele= document.querySelector(".hd_search_history_new");
    var timeper ,timeper1,timeper2;

    // 点击搜索框显示历史框
    seek_input.onclick=function(){
        if(!seek_input.value){
            history_ele.style.display='block';
        }else{
            seek_input.onkeyup();
        }
    }
    // 移入搜索框时'历史框'和'搜索提示框'还在显示时清除隐藏计时器
    seek_input.onmouseenter=function(){
        if(window.getComputedStyle(history_ele,null).display === 'block'){
            clearTimeout(timeper1);
        }
        if(window.getComputedStyle(commodity_list,null).display === 'block'){
            clearTimeout(timeper2);
        }
    }

    // 移出搜索框100毫秒后隐藏'历史框'和'搜索提示框'
    seek_input.onmouseleave=function(){
        timeper=setTimeout(function(){
            history_ele.style.display='none';
            commodity_list.style.display='none';
        },100);
    }

    // 移入'历史框'和'搜索提示框'清除计时器
    history_ele.onmouseenter=function(){
        clearTimeout(timeper);
    }
    commodity_list.onmouseenter=function(){
        clearTimeout(timeper);
    }
    
    // 离开'历史框'隐藏
    history_ele.onmouseleave=function(){
        timeper1=setTimeout(function(){
            history_ele.style.display='none';
        },100);
    }

    // 离开'搜索提示框'隐藏
    commodity_list.onmouseleave=function(){
        timeper2=setTimeout(function(){
            commodity_list.style.display='none';
        },100);
    }

    // 搜索框随机提示词
    var num = randomInt(0,random_arr.length-1);
    seek_input.placeholder=random_arr[num];

    seek_input.onkeyup=function(){
        if (!seek_input.value) {
            commodity_list_ul.innerHTML = '';
            commodity_list.style.display='none';
            history_ele.style.display='block';
            return false;
        }else{
            commodity_list.style.display='block';
            history_ele.style.display='none';
        }
        jsonp({
            url: 'https://suggest.taobao.com/sug',
            data:{
                code:'utf-8',
                q:seek_input.value,
                _ksTS:'1596362226668_235',
                callback:'jsonp236',
                k:'1',
                area:'c2c',
                bucketid:'11'
            },
            jsonp: 'callback',
            jsonpCallback: 'jsonp236',
            success: function (json){
                commodity_list_ul.innerHTML = '';
                json.result.forEach(item => {
                    commodity_list_ul.innerHTML += '<li>'+item[0]+'</li>';
                });
                // 如果没有搜索到数据则不显示搜索提示框
                if(commodity_list_ul.innerHTML===''){
                    commodity_list.style.display='none';
                }
            }
        });
    }
})();





