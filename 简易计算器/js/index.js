var btns = document.querySelectorAll('.btns li');
var myNumb = document.getElementById('myNumb');

// 存取第一次输入的数字
var num1 = [];
// 存取运算符
var num2 = [];
// 存取第1+n次输入的数字
var num3 = [];
// 百分号计算
var baifenhao = [];
// 是否开启第二次运算,
var bool = false;

// 遍历获取所有的按钮
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function(){
        // 将当前的按钮赋值为a
        var a = this.innerText;
        if (a == 0 || a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 6 || a == 7 || a == 8 || a == 9 || a == '.') {
            // 清除显示屏上的计算符号
            if (myNumb.innerText == '+' || myNumb.innerText == '-' || myNumb.innerText == '×' || myNumb.innerText == '÷' || myNumb.innerText == '%') {
                num2.push(myNumb.innerText);
                myNumb.innerText = '';
            }
            // 计算出结果以后判断是否进行另外一项运算，如果还存在运算符号则还是在累计计算,
            if(bool&&num2.length==0){
                clearArr()
                myNumb.innerText = '';
                // 关闭下次输入数字清空显示屏,保证第n+1次运算在出结果前不被清空显示屏;
                bool=false;
            };
            // 数字累加;
            myNumb.innerText += a;
        } else if (a == 'AC') {
            // 清空显示屏
            myNumb.innerText = '';
            // 清空数组
            clearArr();
            // 打印是否清空
            console.log(num1, num2, num3, baifenhao);
        } else if (a == '=') {
            // 如果只输入一个数没有输入其他的
            if (num1.length == 0 && num2.length == 0 && num3.length == 0) {
                myNumb.innerText = '';
                clearArr();
            }
            // 输入完进行计算
            console.log(num1,num2);
            if (num1.length != '0' && num2.length != '0') {
                num3.push(myNumb.innerText);
                calculator(num2[0]);
            }
        } else if (a == '+' || a == '-' || a == '×' || a == '÷') {
            // 如果num1内没有数字,则将当前的输入的数字添加到num1内，方便的是第二次的计算
            if (num1.length == 0) {
                num1.push(myNumb.innerText);
            }
            // 向显示屏展示在做那种计算;
            if (num2.length == 0) {
                myNumb.innerText = a;
            }
            // 进行多次累加,计算例如1+1+1+2
            if (num1.length != '0' && num2.length != '0') {
                num3.push(myNumb.innerText);
                calculator(num2[0]);
                myNumb.innerText = a;
            }
            console.log(num1,num2,num3,baifenhao); 
        // 输入mc|m+|m-|mr的计算
        }else if (a == 'm+' || a == 'm-' || a == 'mr'|| a == 'mc') {
            alert('mc,m+,m-,mr功能暂不能使用')
        } else if (a == '%') {
            baifenhao.push(myNumb.innerText);
            calculator('%');
        }
    }
}

// 清空数组函数
function clearArr() {
    num1 = [];
    num2 = [];
    num3 = [];
}

// 进行四则计算
function calculator(opten) {
    // 将数组转换为数字
    var one = Number(num1.join());
    var two = Number(num3.join());
    var three = Number(baifenhao.join());

    switch (opten) {
        case '+':
            var myNum = one + two
            // 运算结果显示到输入框;
            myNumb.innerText = myNum;
            // 将所有数组清空
            clearArr();
            // 将计算出的结果赋值到第一个数组进行,进行下一次计算
            num1.push(myNumb.innerText);
            // 这次计算出结果后，开启下次输入数字清空显示屏；
            bool = true;
            break;
        case '-':
            var myNum = one - two
            myNumb.innerText = myNum;
            clearArr();
            num1.push(myNumb.innerText);
            bool = true;
            break;
        case '×':
            var myNum = one * two
            myNumb.innerText = myNum;
            clearArr();
            num1.push(myNumb.innerText);
            bool = true;
            break;
        case '÷':
            if (two == 0) {
                myNumb.innerText = '除数不能为零';
                clearArr();
            } else {
                var myNum = one / two
                myNumb.innerText = myNum;
                clearArr();
                num1.push(myNumb.innerText);
            }
            bool = true;
            break;
        case '%':
            var myNum = three * 0.01;
            myNumb.innerText = myNum;
            baifenhao = [];
            break;
    }
}

