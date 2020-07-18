const view = new ViewAdap();
view.setViewMode({
    designWidth: 1920,
    designHeight: 1080,
    mode: 'contain'
})

// 点击事件
// 点击引领思想
$(document).on('click', '.index .djyl .content', function () {
    $('.wall').fadeIn(500)
    $('.index').fadeOut()
    // $('.index .content.action').removeClass('action')
    // $(this).addClass('action')
    // $(this).eq(0).siblings().find('.img').attr('src', './img/right.png')
    // $(this).eq(0).find('.img').attr('src', './img/right1.png')
})

$(document).on('click', '.wall-back', function () {
    $('.wall').hide()
    $('.index').show()
})

// 点击支部概况
$(document).on('click', '.index .zbgk .zbgk1', function () {
    $('.zzjg').fadeIn(500)
    $('.index').fadeOut()
})

// $(document).on('click', '.index .zbgk>div', function () {
//     $(this).eq(0).siblings().find('.img').attr('src', './img/right.png')
//     $(this).eq(0).find('.img').attr('src', './img/right1.png')
// })

$(document).on('click', '.zzjg-back', function () {
    $('.zzjg').hide()
    $('.index').show()
})

// $(document).on('click', '.index .zbgk div', function () {
//     $('.index .zbgk div.action').removeClass('action')
//     $(this).addClass('action')
// })

// 点击重温誓词
$(document).on('click', '.index .zbgk .cwjc', function () {
    $('.cwsc').fadeIn(500)
    $('.index').fadeOut()
})

// $(document).on('click', '.index .dyjyz .box', function () {
//     // $('.index .zbgk div.action').removeClass('action')
//     // $(this).addClass('action')
//     // $(this).eq(0).siblings().find('.img').attr('src', './img/right.png')
//     // $(this).eq(0).find('.img').attr('src', './img/right1.png')
// })

$(document).on('click', '.cwsc-back', function () {
    $('.cwsc').hide()
    $('.index').show()
})

// 点击党建学习
$(document).on('click', '.index .dyjyz .djxx1', function () {
    $('.djxx').fadeIn(500)
    $('.index').fadeOut()
})

// $(document).on('click', '.index .dyjyz .content', function () {
//     // $('.index .dyjyz .content.action').removeClass('action')
//     // $(this).addClass('action')
//     $(this).eq(0).siblings().find('.img').attr('src', './img/right.png')
//     $(this).eq(0).find('.img').attr('src', './img/right1.png')
// })

$(document).on('click', '.djxx-back', function () {
    $('.djxx').hide()
    $('.index').show()
})

// 点击优秀党员
$(document).on('click', '.index .zbgk .box1', function () {
    $('.goodyg').fadeIn(500)
    $('.index').fadeOut()

})

$(document).on('click', '.goodyg-back', function () {
    $('.goodyg').hide()
    $('.index').show()
})

$(document).on('click', 'a', function () {
    $(this).find('.img').attr('src', './img/right1.png')
    $(this).css({ background: '#FFE3E3' })
    fn()
})

// 点击党建学习弹层返回按钮
$(document).on('click', '.good-tcBack', function () {
    $(this).hide()
    $('.good-tc').hide()
    var video = document.querySelector('.video')
    video.pause()
})



function fn() {
    setTimeout(function () {
        $('a').find('.img').attr('src', './img/right.png')
    }, 500)
    setTimeout(function () {
        $('a').css({ background: '#fff' })
    }, 500)
}



// 图表数据



// 请求数据

var baseUrl = "http://188.131.235.7/";
// var baseUrl = "http://192.168.1.148/";
let jqPostAjaxPromise = function (param) {
    // 接口地址
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: baseUrl + param.url,
            type: param.type,
            page: param.page,
            limite: param.limite,
            data: param.data || '',
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error)
            }
        });
    });
};

// 请求优秀员工风采
function getgoodyg() {
    jqPostAjaxPromise({
        url: "api/excellentPartyMember/list",
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        var li = ''
        console.log(data)
        for (var i in data) {
            li += `<li>
            <div class="img"><img src="${data[i].picture}" alt=""></div>
            <div>
                <div class="zhiwei">岗位: ${data[i].position}</div>
                <div class="zy">${data[i].motto}</div>
                <div class="xian1"></div>
                <div class="ygname">${data[i].name}</div>
            </div>
        </li>`
        }
        $('.goodyg .content ul').html(li)
    }).catch(err => {
        console.log(err)
    })
}
getgoodyg()


// 请求党建学习
// var classify
function getdjxx(classify) {
    var classify
    console.log(classify)
    jqPostAjaxPromise({
        url: "api/partyBuildingLearning/list?pageSize=1000000&pageNum=1&classify=" + classify,
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg.rows
        var li = ''
        console.log(data)
        for (var i in data) {
            var type = data[i].type
            if (type == 0) {
                li += `<li data-lx="${classify}" data-id="${data[i].id}" data-type="${data[i].type}">
                <div class="box1"><img src="${data[i].filePath}" alt=""></div>
            </li>`
            } else {
                li += `<li data-lx="${classify}" data-id="${data[i].id}" data-type="${data[i].type}">
                <video src="${data[i].filePath}"></video>
                <img src="./img/play.png" class="play">
            </li>`
            }
        }
        $('.djxx .content ul').html(li)
    }).catch(err => {
        console.log(err)
    })
}
// getdjxx(2)
$(document).on('click', '.index .dyjyz .content:eq(0)', function () {
    getdjxx(1)
    $('.djxx .content .title').html($(this).find('a').text())
})
$(document).on('click', '.index .dyjyz .content:eq(1)', function () {
    getdjxx(2)
    $('.djxx .content .title').html($(this).find('a').text())
})
$(document).on('click', '.index .dyjyz .content:eq(2)', function () {
    getdjxx(3)
    $('.djxx .content .title').html($(this).find('a').text())
})
$(document).on('click', '.index .dyjyz .content:eq(3)', function () {
    getdjxx(4)
    $('.djxx .content .title').html($(this).find('a').text())
})

// 点击党建学习列表页
$(document).on('click', '.djxx ul li', function () {
    var id = $(this).attr('data-id')
    var type = $(this).attr('data-type')
    var classify = $(this).attr('data-lx')
    console.log(classify)
    $('.good-tc').fadeIn(100)
    $('.good-tcBack').fadeIn(100)
    function getdjxx() {
        jqPostAjaxPromise({
            url: "api/partyBuildingLearning/list?pageSize=1000000&pageNum=1&classify=" + classify,
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg.rows
            var img = ''
            console.log(data)
            for (var i in data) {
                if (type == 0 && id == data[i].id) {
                    img += `<img src="${data[i].filePath}" alt="">`
                } else if (type == 1 && id == data[i].id) {
                    img += `<video autoplay src="${data[i].filePath}" class="video"></video>`
                }
            }
            $('.djxx .good-tc div').html(img)
        }).catch(err => {
            console.log(err)
        })
    }
    getdjxx()
})

// $(document).on('click','.index .dyjyz .djxx1',function(){
//     $('.djxx ul li').attr('data-lx',classify)
// })

// 请求支部概况
function getzbgk() {
    jqPostAjaxPromise({
        url: "api/organizationStructure/list",
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        var li = ''
        var div = ''
        for (var i in data) {
            var type = data[i].type
            if (type == 1 || type == 2) {
                div += `<div class="ygname" data-type="${data[i].type}">
                    <div class="ygimg"><img src="${data[i].picture}" alt=""></div>
                    <div class="ygjs">
                        <p>姓名：<span>${data[i].name}</span></p>
                        <p>党内职务：<span>${data[i].job}</span></p>
                    </div>
                    </div>`
            } else {
                li += `<li>
                        <div class="ygimg"><img src="${data[i].picture}" alt=""></div>
                        <div class="ygjs">
                            <p>姓名：<span>${data[i].name}</span></p>
                            <p>党内职务：<span>${data[i].job}</span></p>
                        </div>
                    </li>`
            }
        }
        $('.left .sj').html(div)
        $('.left ul').html(li)
    }).catch(err => {
        console.log(err)
    })
}
getzbgk()


// 点击叉关闭图层
$(document).on('click', '.tc1 .cha', function () {
    $('.tc1').fadeOut('slow')
    $('.cha.action7').removeClass('action7')
})

// 点击图片出现弹层
// var type = 2
// img(type)
// function img(type){
//     $(document).on('click', '.wall .wall-photo img', function () {
//         var id = $(this).attr('data-id')
//         $('.tc1').fadeIn('slow')
//         $('.tc1 img').addClass('action4')
//         function getdjyl() {
//             jqPostAjaxPromise({
//                 url: "api/party_building/list?pbType=" + type,
//                 type: "get",
//                 data: {}
//             }).then(res => {
//                 var data = res.msg
//                 var img = ''
//                 console.log(data)
//                 for(var i in data){
//                     if(id == data[i].pbId){
//                         img += `<div class="tc">
//                             <img src="${data[i].pbImg}" alt="" class="zw">
//                             <div class="xian2"></div>
//                             <p>${data[i].pbDescription}</p>
//                         </div>
//                         <img src="./img/cha.png" alt="" class="cha">
//                         <div class="dz">
//                             <img src="./img/shou.png" alt="">
//                         </div>`
//                     }
//                 }
//                 $('.tc1').html(img)
//             }).catch(err => {
//                 console.log(err)
//             })
//         }
//         getdjyl()
//     })
// }



// 统计图数据
function gettjt() {
    jqPostAjaxPromise({
        url: "api/organizationStructure/getPartyAccounted",
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        console.log(data)
        var team1 = data.scale1
        var team2 = data.scale2
        var team3 = data.scale3
        var team4 = data.scale4
        var team5 = data.scale5
        var Num = Number(data.count1) + Number(data.count2) + Number(data.count3) + Number(data.count4) + Number(data.count5)
        var div = '', li = ''
        div += `<p class="p1">中共党员${Num}人</p>`
        $('.zzt').append(div)
        li += `<li class="li1">
        网点负责人团队
        (${data.count1}人)
    </li>
    <li class="li2">客户经理团队
            (${data.count2}人)
    </li>
    <li class="li3">运营主管团队
            (${data.count3}人)
    </li>
    <li class="li4">大堂经理团队
            (${data.count4}人)
    </li>
    <li class="li5">
        柜员团队
            (${data.count5}人)
    </li>`
    $('.zzt .text ul').html(li)
        var arrVisitors = new Array();
        arrVisitors[0] = "," + Number(team1) + "%";
        arrVisitors[1] = "," + Number(team2) + "%";
        arrVisitors[2] = "," + Number(team3) + "%";
        arrVisitors[3] = "," + Number(team4) + "%";
        arrVisitors[4] = "," + Number(team5) + "%";
        var canvas;
        var context;
        // 图表属性
        var cWidth, cHeight, cMargin, cSpace;
        var cMarginSpace, cMarginHeight;
        // 条形图属性
        var bWidth, bMargin, totalBars, maxDataValue;
        var bWidthMargin;
        // 条形动画
        var ctr, numctr, speed;
        // 轴属性
        var totLabelsOnYAxis;
        // 条形图构造函数
        function barChart() {
            canvas = document.getElementById('bchart');
            if (canvas && canvas.getContext) {
                context = canvas.getContext('2d');
            }
            chartSettings();
            drawAxisLabelMarkers();
            drawChartWithAnimation();
        }
        barChart()
        // 初始化图表和条形图值
        function chartSettings() {
            // 图表属性
            cMargin = 20;
            cSpace = 10;
            cHeight = canvas.height - 2 * cMargin - cSpace;
            cWidth = canvas.width - 2 * cMargin - cSpace;
            cMarginSpace = cMargin + cSpace;
            // cMarginSpace = 10
            cMarginHeight = cMargin + cHeight;
            // 条形图属性
            bMargin = 40;  //条形图之间的距离
            totalBars = arrVisitors.length;
            bWidth = (cWidth / totalBars) - bMargin;
            //找到要在图表上绘制的最大值
            maxDataValue = 100;
            for (var i = 0; i < totalBars; i++) {
                var arrVal = arrVisitors[i].split(",");
                var barVal = parseInt(arrVal[1]);
                if (parseInt(barVal) > parseInt(maxDataValue))
                    maxDataValue = barVal;
            }
            totLabelsOnYAxis = 6;
            context.font = "8pt Garamond";

            // 初始化动画变量
            ctr = 0;
            numctr = 100;
            speed = 10;
        }
        // 绘制图表轴、标签和标记
        function drawAxisLabelMarkers() {
            context.lineWidth = ".5";
            // 绘制y轴
            drawAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
            //绘制x轴
            drawAxis(cMarginSpace, cMarginHeight, cMarginSpace + cWidth, cMarginHeight);
            context.lineWidth = ".5";
            drawMarkers();
        }
        //绘制X和Y轴
        function drawAxis(x, y, X, Y) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(X, Y);
            context.closePath();
            context.stroke();
        }
        //在X和Y轴上绘制图表标记
        function drawMarkers() {
            var numMarkers = parseInt(maxDataValue / totLabelsOnYAxis);
            context.textAlign = "right";
            context.fillStyle = "#D84342";
            context.font = "16px Calibri";
            //y轴
            for (var i = 0; i <= totLabelsOnYAxis; i++) {
                markerVal = i * numMarkers;
                markerValHt = i * numMarkers * cHeight;
                var xMarkers = cMarginSpace - 10;
                var yMarkers = cMarginHeight - (markerValHt / maxDataValue);
                context.fillText(markerVal, xMarkers, yMarkers, cSpace);
            }
            //X轴
            context.textAlign = 'center';
            context.font = "18px Calibri";
            for (var i = 0; i < totalBars; i++) {
                arrval = arrVisitors[i].split(",");
                name = arrval[1];
                markerXPos = cMarginSpace + bMargin + (i * (bWidth + bMargin)) + (bWidth / 2);
                markerYPos = cMarginHeight + 20; //X轴文字位置
                context.fillText(name, markerXPos, markerYPos, bWidth);
            }
            context.save();
        }
        function drawChartWithAnimation() {
            //循环遍历总条并绘制
            for (var i = 0; i < totalBars; i++) {
                var arrVal = arrVisitors[i].split(",");
                bVal = parseInt(arrVal[1]);
                bHt = (bVal * cHeight / maxDataValue) / numctr * ctr;
                bX = cMarginSpace + (i * (bWidth + bMargin)) + bMargin;
                // bX = 60 * i
                bY = cMarginHeight - bHt - 2;
                drawRectangle(bX, bY, bWidth, bHt, true);
            }
            // 超时运行并检查是否已达到条
            // 所需高度；如果不是，则继续增长
            if (ctr < numctr) {
                ctr = ctr + 1;
                setTimeout(arguments.callee, speed);
            }
        }
        function drawRectangle(x, y, w, h, fill) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.closePath();
            context.stroke();
            if (fill) {
                var gradient = context.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, '#D84342');
                //gradient.addColorStop(1, 'rgba(67,203,36,.15)');
                gradient.addColorStop(0, '#D84342');
                context.fillStyle = gradient;
                context.strokeStyle = gradient;
                context.fill();
            }
        }
    }).catch(err => {
        console.log(err)
    })
}
gettjt()



// 点击显示iframe
$(document).on('click', '.content1-a', function () {
    $('.iframe').fadeIn(100)
    $('.iframe-back').fadeIn(100)
    $('.iframe').css({ zIndex: '1' })
    $('.iframe-back').css({ zIndex: '1' })
})

$(document).on('click', '.iframe-back', function () {
    $('.iframe').fadeOut()
    $('.iframe-back').fadeOut()
    $('.iframe').css({ zIndex: '-1' })
    $('.iframe-back').css({ zIndex: '-1' })
})

// 请求党建引领数据
function getdjyl(type) {
    jqPostAjaxPromise({
        url: "api/party_building/list?pbType=" + type,
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        console.log(data)
        var li = '';
        for (var i in data) {
            li += `<li data-id="${data[i].pbId}" data-type="${data[i].pbType}">
                    <img src="${data[i].pbImg}" alt="">
                </li>`
        }
        $('.wall .container ul').html(li)
    }).catch(err => {
        console.log(err)
    })
}

var type
$(document).on('click', '.yl1', function () {
    type = 1
    getdjyl(type)
})
$(document).on('click', '.yl2', function () {
    type = 2
    getdjyl(type)
})
$(document).on('click', '.yl3', function () {
    type = 3
    getdjyl(type)
})
$(document).on('click', '.yl4', function () {
    type = 4
    getdjyl(type)
})

function getdjylImg(type, id) {
    var id
    console.log(id)
    jqPostAjaxPromise({
        url: "api/party_building/list?pbType=" + type,
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        var div = ''
        for (var i in data) {
            if (id == data[i].pbId) {
                div += `<div class="wallTc">
                <img src="${data[i].pbImg}" alt="">
                <div class="xian2"></div>
                <p>${data[i].pbDescription}</p>
            </div>
            <img src="./img/cha.png" alt="" class="cha">
            <div class="dz1">
                <img src="./img/shou.png" alt="" class="shou">
                <p>${data[i].clickNumber}</p>
            </div>`
            }
        }
        $('.TCwall').html(div)
    }).catch(err => {
        console.log(err)
    })
}

// 点击党建引领里面的图片
$(document).on('click', '.wall .container ul li', function () {
    var id = $(this).attr('data-id')
    var type = $(this).attr('data-type')
    getdjylImg(type, id)
    $('.TCwall').fadeIn(100)
    $('.TCwall').attr('data-id', id)
})

// 点击叉关闭弹层
$(document).on('click', '.cha', function () {
    $('.TCwall').fadeOut()
})



// 点赞
function getdz(id) {
    jqPostAjaxPromise({
        url: "api/party_building/setClickNumber?id=" + id,
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
    }).catch(err => {
        console.log(err)
    })
}

$(document).on('click', '.dz1', function () {
    var id = $(this).parent().attr('data-id')
    getdz(id)
    getdjylImg(type, id)
})