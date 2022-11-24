<template>
    <div style="padding-left: 20px;">

        <div style="height:30px;line-height: 30px;font-size: 12px;">图五 <router-link to="/">返回</router-link>
        </div>
        <!-- 图五 -->
        <div class="container">
            <table class="tag" border="1px solid #ccc" cellspacing="0" v-for="(item, index) in qrList">
                <tr>
                    <td rowspan="4" style="width:40mm;">

                        <canvas :id="`second_${index}`"></canvas>

                    </td>
                    <td class="tag-tit">名称</td>
                    <td colspan="3">{{ item.name }}</td>
                </tr>
                <tr>
                    <td class="tag-tit">供应商</td>
                    <td colspan="3">{{ item.supplier }}</td>

                </tr>
                <tr>
                    <td class="tag-tit">规格型号</td>
                    <td style="width: 24mm;">{{ item.tag1 }}</td>
                    <td class="tag-tit">分箱号</td>
                    <td>{{ item.tag2 }}</td>
                </tr>
                <tr>
                    <td class="tag-tit">生产日期</td>
                    <td style="width: 24mm;">{{ item.tag3 }}</td>
                    <td class="tag-tit">计量单位</td>
                    <td>{{ item.tag4 }}</td>
                </tr>
                <tr>
                    <td style="width:40mm;">品种号:{{ item.type }}</td>
                    <td>单件码</td>
                    <td colspan="3">{{ item.code }}</td>
                </tr>
            </table>
        </div>

        <div style="height:30px;line-height: 30px;font-size: 12px;">图八</div>
        <!-- 图八 -->
        <div class="container">
            <table class="tag" border="1px solid #ccc" cellspacing="0" v-for="(item, index) in qrList2">
                <tr>
                    <td rowspan="4" style="width:40mm;">
                        <canvas :id="`eight_${index}`"></canvas>
                    </td>
                    <td class="tag-tit">名称</td>
                    <td colspan="3">{{ item.name }}</td>
                </tr>
                <tr>
                    <td class="tag-tit">供应商</td>
                    <td colspan="3">{{ item.supplier }}</td>

                </tr>
                <tr>
                    <td class="tag-tit">规格型号</td>
                    <td colspan="3">{{ item.model }}</td>
                </tr>
                <tr>
                    <td class="tag-tit">计量单位</td>
                    <td class="tag-msg">{{ item.tag1 }}</td>
                    <td class="tag-tit">数量</td>
                    <td class="tag-msg">{{ item.tag2 }}</td>
                </tr>
                <tr>
                    <td style="width:40mm;">品种码:{{ item.type }}</td>
                    <td class="tag-tit">生产日期</td>
                    <td colspan="3">{{ item.time }}</td>
                </tr>
            </table>
        </div>

        <div style="height:30px;line-height: 30px;font-size: 12px;">图九</div>
        <!-- 图九 -->
        <div class="container">
            <table class="tag" border="1px solid #ccc" cellspacing="0" v-for="(item, index) in qrList3">
                <tr>
                    <td rowspan="4" style="width:40mm;">
                        <canvas :id="`nine_${index}`"></canvas>
                    </td>
                    <td class="tag-tit">名称</td>
                    <td colspan="3">{{ item.name }}</td>
                </tr>
                <tr>
                    <td class="tag-tit">供应商</td>
                    <td colspan="3">{{ item.supplier }}</td>

                </tr>
                <tr>
                    <td class="tag-tit">规格型号</td>
                    <td class="tag-msg">{{ item.tag1 }}</td>
                    <td class="tag-tit">分箱号</td>
                    <td class="tag-msg">{{ item.tag2 }}</td>
                </tr>
                <tr>
                    <td class="tag-tit">计量单位</td>
                    <td class="tag-msg">{{ item.tag3 }}</td>
                    <td class="tag-tit">数量</td>
                    <td class="tag-msg">{{ item.tag4 }}</td>
                </tr>
                <tr>
                    <td style="width:40mm;">品种号:{{ item.type }}</td>
                    <td>单件码</td>
                    <td colspan="3">{{ item.code }}</td>
                </tr>
            </table>
        </div>

        <div style="height:30px;line-height: 30px;font-size: 12px;"></div>
    </div>

</template>
<script>
import QRCode from "qrcode";
export default {
    data() {
        return {
            qrList: [
                {
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "2021年07月08号",
                    tag4: "套",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                },
                {
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "2021年07月08号",
                    tag4: "套",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                },{
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "2021年07月08号",
                    tag4: "套",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                },{
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "2021年07月08号",
                    tag4: "套",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                },{
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "2021年07月08号",
                    tag4: "套",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                }
            ],
            qrList2: [
                {
                    qrmsg: "123456",
                    name: "春秋常服",
                    supplier: "际华三五〇三服装有限公司",
                    model: "165/88",
                    tag1: "件",
                    tag2: "100",
                    type: "868749282",
                    time: '2021年07月08日'
                },
                {
                    qrmsg: "123456",
                    name: "春秋常服",
                    supplier: "际华三五〇三服装有限公司",
                    model: "165/88",
                    tag1: "件",
                    tag2: "100",
                    type: "868749282",
                    time: '2021年07月08日'
                },
            ],
            qrList3: [
                {
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "套",
                    tag4: "100",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                },
                {
                    qrmsg: "123456",
                    name: "台式计算机",
                    supplier: "联想集团有限公司",
                    tag1: "启天M428",
                    tag2: "1/3",
                    tag3: "套",
                    tag4: "100",
                    type: "AC0541420",
                    code: '108549783120220824101926H'
                },
            ]
        }
    },
    mounted() {
        /* this.qrList = [...this.qrList, ...this.qrList, ...this.qrList, ...this.qrList, ...this.qrList] */
    
        console.log(this.qrList);
        this.qrList.forEach((val, index) => {
            console.log(index, val.qrmsg);
            this.createQrcode(index, val.qrmsg)
        })
        this.qrList2.forEach((val, index) => {
            this.createQrcode1(index, val.qrmsg)
        })
        this.qrList3.forEach((val, index) => {
            this.createQrcode2(index, val.qrmsg)
        })

    },
    computed: {
    },
    methods: {
        createQrcode(id, msg) {
            QRCode.toCanvas(document.getElementById("second_" + id), msg, {
                margin: 0,
                width: this.$mmToPx(34)
            });
        },
        createQrcode1(id, msg) {
            QRCode.toCanvas(document.getElementById("eight_" + id), msg, {
                margin: 0,
                width: this.$mmToPx(34)
            });
        },
        createQrcode2(id, msg) {
            QRCode.toCanvas(document.getElementById("nine_" + id), msg, {
                margin: 0,
                width: this.$mmToPx(34)
            });
        },
    },
}
</script>
<style lang="scss" scoped>
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
.container {
    display: flex;
    flex-flow: row wrap;
}

.tag {
    width: 100mm;
    height: 50mm;
    background-color: #fff;
    margin: 10px 20px;
}

.tag tr,
td {
    height: 9mm;
    text-align: center;

    canvas {
        height: 34mm;
        width: 34mm;
    }
}

.tag-tit {
    width: 10mm;
    height: 9mm;
}

.tag-msg {
    width: 18mm;
}
</style>
