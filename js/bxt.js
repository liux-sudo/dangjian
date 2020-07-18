





function gettjt() {
    jqPostAjaxPromise({
        url: "api/organizationStructure/getPartyAccounted",
        type: "get",
        data: {}
    }).then(res => {
        var data = res.msg
        var div = ''
        var div1 = ''
        // var div2 = ''



        // var c1 = document.querySelector('#c1');
        // var ctx = c1.getContext('2d');
        // var cx = 100, cy = 100, r = 100;
        // //1. 角度转弧度
        // function d2a(n) {
        //     return n * Math.PI / 180;
        // }
        // //2. 封装扇形重复调用
        // function pie(startAng, endAng, colors) {
        //     ctx.beginPath();
        //     // 1. 画线
        //     ctx.moveTo(cx, cy);
        //     var x = cx + Math.sin(d2a(startAng)) * r;
        //     var y = cy - Math.cos(d2a(startAng)) * r;
        //     ctx.lineTo(x, y);
        //     // 2. 画弧度
        //     ctx.arc(cx, cy, r, d2a(startAng - 90), d2a(endAng - 90), false);
        //     // 3. 闭合
        //     ctx.closePath();
        //     ctx.fillStyle = colors;
        //     ctx.fill();
        // }

        // //求和 + 数据的数据比 就是所占圆的角度函数
        // function totalPer(datas) {
        //     var sum = 0;
        //     for (key in datas) {
        //         sum += datas[key];
        //     }
        //     var angs = [];
        //     for (key in datas) {
        //         //  当个数据/ 总和 * 360
        //         angs.push(datas[key] / sum * 360); //圆分配比例
        //     }
        //     return angs;

        // }
        // // 数据
        // // 网点负责人党员人数
        // var head1 = data.head1
        // // 网点负责人党员占比
        // var head2 = data.head2
        // div += `<div class="fzrzb">${head2}%</div>`
        // $('.bxt1').append(div)
        // var datas = [Number(head2)];
        // // 数据对应颜色
        // var colors = ['#D84342', '#FF7C6E', '#0f0', '#00f'];
        // // 数据对应文本描述
        // var texts = ['小米', '华为', '苹果', '锤子'];
        // //    360* 每个datas[i]/sum
        // var Angs = totalPer(datas);  // 数据比的数组--每个数据的角度

        // var startAng = 0; // 初始值
        // Angs.forEach(function (Ang, index) {
        //     pie(startAng, Ang + startAng, colors[index]);
        //     startAng = startAng + Ang;
        // })




        var c2 = document.querySelector('#c2');
        var ctx = c2.getContext('2d');
        var cx = 100, cy = 100, r = 100;
        //1. 角度转弧度
        function d2a(n) {
            return n * Math.PI / 180;
        }
        //2. 封装扇形重复调用
        function pie(startAng, endAng, colors) {
            ctx.beginPath();
            // 1. 画线
            ctx.moveTo(cx, cy);
            var x = cx + Math.sin(d2a(startAng)) * r;
            var y = cy - Math.cos(d2a(startAng)) * r;
            ctx.lineTo(x, y);
            // 2. 画弧度
            ctx.arc(cx, cy, r, d2a(startAng - 90), d2a(endAng - 90), false);
            // 3. 闭合
            ctx.closePath();
            ctx.fillStyle = colors;
            ctx.fill();
        }

        //求和 + 数据的数据比 就是所占圆的角度函数
        function totalPer(datas) {
            var sum = 0;
            for (key in datas) {
                sum += datas[key];
            }
            var angs = [];
            for (key in datas) {
                //  当个数据/ 总和 * 360
                angs.push(datas[key] / sum * 360); //圆分配比例
            }
            return angs;

        }
        // 非党员人数oneTheJob3  
        var oneTheJob3 = data.oneTheJob3
        // 占比oneTheJob4
        var oneTheJob4 = data.oneTheJob4
        // 党员人数oneTheJob1
        var oneTheJob1 = data.oneTheJob1
        // 党员占比oneTheJob2
        var oneTheJob2 = data.oneTheJob2
        div1 += `<div class="box-bxt2 dy">中共党员${oneTheJob1}人占比${oneTheJob2}%</div>
        <div class="box-bxt2 dy2">非党员${oneTheJob3}人占比${oneTheJob4}%</div>`
        $('.bxt2').append(div1)
        div += `<p class="p1">在岗员工${Number(oneTheJob1)+Number(oneTheJob3)}人</p>`
        $('.bxt2').append(div)
        var datas = [Number(oneTheJob2), Number(oneTheJob4)];
        // 数据对应颜色
        var colors = ['#D84342', '#FF7C6E'];
        // 数据对应文本描述
        // var texts = ['小米', '华为', '苹果', '锤子'];
        //    360* 每个datas[i]/sum
        var Angs = totalPer(datas);  // 数据比的数组--每个数据的角度

        var startAng = 0; // 初始值
        Angs.forEach(function (Ang, index) {
            pie(startAng, Ang + startAng, colors[index]);
            startAng = startAng + Ang;
        })



        // var c3 = document.querySelector('#c3');
        // var ctx = c3.getContext('2d');
        // var cx = 100, cy = 100, r = 100;
        // //1. 角度转弧度
        // function d2a(n) {
        //     return n * Math.PI / 180;
        // }
        // //2. 封装扇形重复调用
        // function pie(startAng, endAng, colors) {
        //     ctx.beginPath();
        //     // 1. 画线
        //     ctx.moveTo(cx, cy);
        //     var x = cx + Math.sin(d2a(startAng)) * r;
        //     var y = cy - Math.cos(d2a(startAng)) * r;
        //     ctx.lineTo(x, y);
        //     // 2. 画弧度
        //     ctx.arc(cx, cy, r, d2a(startAng - 90), d2a(endAng - 90), false);
        //     // 3. 闭合
        //     ctx.closePath();
        //     ctx.fillStyle = colors;
        //     ctx.fill();
        // }

        // //求和 + 数据的数据比 就是所占圆的角度函数
        // function totalPer(datas) {
        //     var sum = 0;
        //     for (key in datas) {
        //         sum += datas[key];
        //     }
        //     var angs = [];
        //     for (key in datas) {
        //         //  当个数据/ 总和 * 360
        //         angs.push(datas[key] / sum * 360); //圆分配比例
        //     }
        //     return angs;
        // }
        // // 基层一线党员占比grass1
        // var grass1 = data.grass1
        // // 基层一线党员人数grass
        // var grass = data.grass
        // div2 += `<div class="fzrzb fzrzb1">${grass1}%</div>`
        // $('.bxt3').append(div2)
        // // 数据
        // var datas = [Number(grass1)];
        // // 数据对应颜色
        // var colors = ['#D84342', '#FF7C6E', '#0f0', '#00f'];
        // // 数据对应文本描述
        // var texts = ['小米', '华为', '苹果', '锤子'];
        // //    360* 每个datas[i]/sum
        // var Angs = totalPer(datas);  // 数据比的数组--每个数据的角度

        // var startAng = 0; // 初始值
        // Angs.forEach(function (Ang, index) {
        //     pie(startAng, Ang + startAng, colors[index]);
        //     startAng = startAng + Ang;
        // })
    }).catch(err => {
        console.log(err)
    })
}
gettjt()




