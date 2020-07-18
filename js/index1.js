// requestAnimationFrame兼容性写法
const requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        //所有都不支持，用setTimeout兼容
        function (callback) {
            return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL));
        };
})();
const cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        };
})();


// let IMGDATA = window.imgData; // 图片数据
const wall = document.querySelector('.wall-photo');
const _array = [];
// const _num = 25;    //图片数量

let _width = 0;
let _height = 0;

// 获取图片墙移动区域尺寸
function getWallSize() {
    // const rect = wall.getBoundingClientRect();
    // _width = rect.width;
    // _height = rect.height;
    _width = $('.wall-photo').width();
    _height = $('.wall-photo').height();
}

const Block = function (x, y, data) {
    this.width = 164;
    this.height = 113;
    this.left = x > _width - this.width ? x - this.width : x;
    this.top = y > _height - this.height ? y - this.height : y;
    this.velocityX = rd(0.3, 0.2) * (Math.random() < 0.5 ? -1 : 1); // X轴的速度
    this.velocityY = rd(0.3, 0.2) * (Math.random() < 0.5 ? -1 : 1);
    this.el = '';
    this.data = data;   //图片数据
}
Block.prototype = {
    create() {
        this.el = document.createElement('div');
        _css(this.el, {
            position: 'absolute',
            top: `${this.top}px`,
            left: `${this.left}px`,
            width: `${this.width}px`,
            height: `${this.height}px`,
            backgroundColor: '#fff'
        });
        this.photoFrame();
        const image = new Image();
        image.onload = () => { this.el.appendChild(image) }
        image.src = this.data.pbImg;
        // 设置图片的ID
        image.setAttribute('data-id', this.data.pbId);
        image.setAttribute('draggable', 'false');
        wall.appendChild(this.el)
    },
    move() {
        this.edge();
        this.left += this.velocityX;
        this.top += this.velocityY;
        _css(this.el, {
            top: `${this.top}px`,
            left: `${this.left}px`,
        })
    },
    // 边缘碰撞
    edge() {
        // 判断是否为边缘位置
        if (this.left < 0 || this.left > _width - this.width) {
            this.velocityX = -this.velocityX;
        }
        if (this.top < 0 || this.top > _height - this.height) {
            this.velocityY = -this.velocityY;
        }
    },
    // 根据身份添加相框
    photoFrame() {
        parseInt(this.data.type) ? this.el.classList.add('pt') : this.el.classList.add('ld');
    },
    setRem(px) {
        const REM = 864;
        console.log(px / REM);
        return `${px / REM}rem`

    },
    trans() {
        if (this.el.classList.contains('trans')) return;
        this.el.classList.add('trans');
        setTimeout(() => this.el.classList.remove('trans'), 15 * 1000);
    }
}

// 水波
class Ripple {
    constructor(path, wrap, width = 100, height = 100) {
        this.waveImgPath = path;
        this.width = width;
        this.height = height;
        this.el = '';
        this.wrapEl = wrap;
        this.wrapWidth = 0;
        this.wrapHeight = 0;
        this.animateTime = 5;
        this.iskeyframes = false;
    }
    createWave() {
        this.el = document.createElement('div');
        this.setWaveStyle();
        this.insertWrap();
        this.createkeyframes().animate();
    }
    setWaveStyle() {
        this.getwrapSize();
        const style = this.el.style;

        style.position = 'absolute';
        style.top = `${(this.wrapHeight - this.height) * Math.random()}px`;
        style.left = `${(this.wrapWidth - this.width) * Math.random()}px`;
        style.backgroundImage = `url(${this.waveImgPath})`;
        style.backgroundRepeat = 'no-repeat';
        style.backgroundSize = '100% 100%';
        style.width = `${this.width}px`;
        style.height = `${this.height}px`;
    }
    getwrapSize() {
        const wrap = this.wrapEl;

        this.wrapWidth = wrap.clientWidth;
        this.wrapHeight = wrap.clientHeight;
    }
    insertWrap() {
        this.wrapEl.appendChild(this.el);
    }
    createkeyframes() {
        if (this.iskeyframes) return this;
        const head = document.querySelector('head');
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes water {
                0% { transform: scale(.1); opacity: 1;}
                50% { transform: scale(.8); opacity: 0.6; }
                100% { transform: scale(1.3); opacity: 0; }
            } `
        head.appendChild(style);
        this.iskeyframes = true;
        return this;
    }
    animate() {
        const el = this.el;
        el.style.animation = `${this.animateTime}s water forwards linear`;
        setTimeout(() => this.deleteWave(el), this.animateTime * 1000);
    }
    deleteWave(el) {
        this.wrapEl.removeChild(el);
    }
}

// 运动过程
function animate() {
    // 给每一张图片添加运动
    _array.map(el => el.move())
    requestAnimationFrame(animate);
}

/**
 * 获取n至m随机数
 */
function rd(n, m) {
    var c = m - n + 1;
    return Math.floor((Math.random() * c + n) * 100) / 100;
}
/**
 * 对数组进行随机取值
 * @param {Array} arr 
 */
function getRandomArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 改变元素的style属性
 * 调用方式:_css($el, {"font-size": ..., "background": ...}；
 * @param {HTMLElement} element dom对象
 * @param {Object} styles 样式对象
 */
function _css(element, styles) {
    for (let i in styles) {
        element.style[i] = styles[i];
    }
}


// 无人操作时定时自动关闭弹窗
function noHuman(time, el) {
    let timer = 0;
    let revtime = setTimeout(function () {
        el.classList.add('hide')
    }, time)
    el.addEventListener('click', function () {
        clearTimeout(revtime);
        clearTimeout(timer);
        timer = setTimeout(function () {
            el.classList.add('hide')
        }, time);
    }, false);
}
// var type;
function getPicWall(type) {
    return axios.get('party_building/list?pbType=' + type).then(rs => {
        return rs.data.msg
    }).then(rs => {
        IMGDATA = rs;
        for (let i = 0; i < IMGDATA.length; i++) {
            let DATA = getRandomArr(IMGDATA);
            _array.push(new Block(Math.random() * _width, Math.random() * _height, DATA));
            _array[i].create()
        }
    }).then(() => {
        setInterval(() => { getRandomArr(_array).trans() }, 400);
    }).catch(err => {
        console.log(err)
    })
}
// getPicWall(type)
function init() {
    getWallSize();
    animate();
    $('.wall-photo').html('')
}
init()

// 请求党建引领
$(document).on('click', '.yl1', function () {
    getPicWall(1)
    var type = 1
    img(type)
    $('.tc1 .dz').attr('data-type',type)
    $('.wall .title').html('引领思想')
})
$(document).on('click', '.yl2', function () {
    getPicWall(2)
    var type = 2
    img(type)
    $('.tc1 .dz').attr('data-type',type)
    $('.wall .title').html('引领发展')
})
$(document).on('click', '.yl3', function () {
    getPicWall(3)
    var type = 3
    img(type)
    $('.tc1 .dz').attr('data-type',type)
    $('.wall .title').html('引领服务')
})
$(document).on('click', '.yl4', function () {
    getPicWall(4)
    var type = 4
    img(type)
    $('.tc1 .dz').attr('data-type',type)
    $('.wall .title').html('引领成长')
})


function getdjyl1(type,id) {
    jqPostAjaxPromise({
        url: "api/party_building/list?pbType="+type,
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        var num = ''
        for (var i in data) {
            if (id == data[i].pbId && type == type) {
                num += `<img src="./img/shou.png" alt="">
                <p class="zd-p">${data[i].clickNumber}</p>`
            }
        }
        $('.tc1 .dz').html(num)
    }).catch(err => {
        console.log(err)
    })
}

function getdjyl2(id) {
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
$(document).on('click', '.wall .tc1 .dz', function () {
    var id = $(this).attr('data-id')
    var type = $(this).attr('data-type')
    $('.tc1').fadeIn('slow')
    $('.dz').addClass('action7')
    getdjyl2(id)
    getdjyl1(type,id)
    $('.dz.action7').removeClass('action7')
    $('.cha').addClass('action7')
})

// 点击漂浮图片弹窗

function img(type) {
    $(document).on('click', '.wall .wall-photo .ld img', function () {
        var id = $(this).attr('data-id')
        $('.wall .tc1 .dz').attr('data-id',id)
        $('.tc1').fadeIn('slow')
        $('.dz').addClass('action7')
        function getdjyl() {
            jqPostAjaxPromise({
                url: "api/party_building/list?pbType=" + type,
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg
                console.log(data)
                var img = ''
                var num = ''
                for (var i in data) {
                    if (id == data[i].pbId) {
                        img += `<img src="${data[i].pbImg}" alt="" class="zw">
                            <div class="xian2"></div>
                            <p>${data[i].pbDescription}</p>`
                        num += `<img src="./img/shou.png" alt="">
                        <p class="zd-p">${data[i].clickNumber -1}</p>`
                    }
                }
                $('.tc1 .tc').html(img)
                $('.tc1 .dz').html(num)
            }).catch(err => {
                console.log(err)
            })
        }
        getdjyl(type)
        $('.tc1 .dz').html('')
    })
}





// $(document).on('click', '.wall-back', function () {
//     window.location.reload()
// })
