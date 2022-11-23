<template>
    <div style="padding-left: 20px;">
        <div>
            <canvas id="qrcode" width="140" height="140"></canvas>
            <div
                style="height: 8mm; width:34mm; line-height: 8mm; text-align: center;font-size: 13px;overflow: hidden;">
                1000000001000000010000001</div>
        </div>
        <div style="height:30px;line-height: 30px;font-size: 12px;">图五</div>
        <!-- 图五 -->
        
        <table class="tag" border="1px solid #ccc" cellspacing="0">
            <tr>
                <td rowspan="4" style="background-color:aqua;width:40mm;"></td>
                <td class="tag-tit">名称</td>
                <td colspan="3">台式计算机</td>
            </tr>
            <tr>
                <td class="tag-tit">供应商</td>
                <td colspan="3">联想集团有限公司</td>
                
            </tr>
            <tr>
                <td class="tag-tit">规格型号</td>
                <td style="width: 24mm;">启天M428</td>
                <td class="tag-tit">分箱号</td>
                <td>1/3</td>
            </tr>
            <tr>
                <td class="tag-tit">生产日期</td>
                <td style="width: 24mm;">2021年07月08号</td>
                <td class="tag-tit">计量单位</td>
                <td>套</td>
            </tr>
            <tr>
                <td style="width:40mm;">品种号:AC0541420</td>
                <td>单件码</td>
                <td colspan="3">108549783120220824101926H</td>
            </tr>
        </table>
    
        <div style="height:30px;line-height: 30px;font-size: 12px;">图八</div>
        <!-- 图八 -->
       
        <table class="tag" border="1px solid #ccc" cellspacing="0">
            <tr>
                <td rowspan="4" style="background-color:aqua;width:40mm;"></td>
                <td class="tag-tit">名称</td>
                <td colspan="3">春秋常服</td>
            </tr>
            <tr>
                <td class="tag-tit">供应商</td>
                <td colspan="3">际华三五〇三服装有限公司</td>
                
            </tr>
            <tr>
                <td class="tag-tit">规格型号</td>
                <td colspan="3">165/88</td>
            </tr>
            <tr>
                <td class="tag-tit">计量单位</td>
                <td class="tag-msg">件</td>
                <td class="tag-tit">数量</td>
                <td class="tag-msg">100</td>
            </tr>
            <tr>
                <td style="width:40mm;">品种码:868749282</td>
                <td class="tag-tit">生产日期</td>
                <td colspan="3">2021年07月08日</td>
            </tr>
        </table>
    
        <div style="height:30px;line-height: 30px;font-size: 12px;">图九</div>
        <!-- 图九 -->
        <table class="tag" border="1px solid #ccc" cellspacing="0">
            <tr>
                <td rowspan="4" style="background-color:aqua;width:40mm;"></td>
                <td class="tag-tit">名称</td>
                <td colspan="3">台式计算机</td>
            </tr>
            <tr>
                <td class="tag-tit">供应商</td>
                <td colspan="3">联想集团有限公司</td>
                
            </tr>
            <tr>
                <td class="tag-tit">规格型号</td>
                <td class="tag-msg">启天M428</td>
                <td class="tag-tit">分箱号</td>
                <td class="tag-msg">1/3</td>
            </tr>
            <tr>
                <td class="tag-tit">计量单位</td>
                <td class="tag-msg">套</td>
                <td class="tag-tit">数量</td>
                <td class="tag-msg">100</td>
            </tr>
            <tr>
                <td style="width:40mm;">品种号:AC0541420</td>
                <td>单件码</td>
                <td colspan="3">108549783120220824101926H</td>
            </tr>
        </table>

        <div style="height:30px;line-height: 30px;font-size: 12px;"></div>
    </div>
    
</template>
<script>
import UQRCode from 'uqrcodejs'
export default {
    data() {
        return {
        }
    },
    mounted() {
        this.createQrcode()
    },
    computed: {
    },
    methods: {
        createQrcode() {
            // 获取uQRCode实例
            var qr = new UQRCode();
            console.log(qr);
            // 设置二维码内容
            qr.data = "1234563";

            // 设置二维码大小，必须与canvas设置的宽高一致
            /* qr.backgroundImageHeight = 150;
            qr.backgroundImageWidth = 150; */
            qr.size = 140
            // 调用制作二维码方法
            qr.make();
            // 获取canvas元素
            var canvas = document.getElementById("qrcode");
            // 获取canvas上下文
            var canvasContext = canvas.getContext("2d");
            // 设置uQRCode实例的canvas上下文
            qr.canvasContext = canvasContext;
            // 调用绘制方法将二维码图案绘制到canvas上
            qr.drawCanvas();
        },
    },
}
</script>
<style scoped>
* {
    box-sizing: border-box;
    font-size: 6pt;
    font-family: '黑体';
}
/* .box{
    width: 100mm;
    height: 50mm;
    background-color: rgb(203, 231, 241);
    display: flex;
    justify-content: center;
    align-items: center;
} */
.tag {
     width: 98mm;
     height: 45mm;
     background-color: #fff;
 }
.tag tr,td {
    height: 9mm;
    text-align: center;
    
}
.tag-tit{
    width: 10mm;
    height: 9mm;
}
.tag-msg{
    width: 18mm;
}
</style>
