<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登陆时间：<span>2022-8-12</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 460px">
                <el-table :data="tableData">
                    <el-table-column 
                    v-for="(val, key) in tableLabel"
                    :key="key"
                    :prop="key"
                    :label="val"
                    >

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card 
                v-for="item in countData"
                :key="item.name"
                :body-style="{display: 'flex', padding: '0px'}"
                >
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                    <div class="detail">
                        <p class="num" >￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px">
                <!-- <div style="height: 280px" ref="echarts"> </div> -->
                <Echart :chartData="echartData.order" style="height: 280px"/>
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <!-- <div style="height: 240px" ref="userEcharts"></div> -->
                    <Echart :chartData="echartData.user" style="height: 240px"></Echart>
                </el-card>
                <el-card style="height:260px">
                    <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
                    <Echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px"></Echart>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>

import {getData} from '../../../api/data'
import Echart from '../../components/Echarts.vue'


export default {
    name: "user",
    components: {
        Echart
    },   
    data() {
        return {
            //@代表src路径
            userImg: require("@/assets/images/user.png"),
            tableData: [],
            tableLabel: {
                name: "品牌",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
            echartData: {
                order: {
                    xData: [],
                    series: []
                },
                user: {
                    xData: [],
                    series: []
                },
                video: {
                    series: []
                }
            }
        };
    },
    methods: {},
    mounted() {
        // this.$http.get('/user/ID=12345')
        // .then(function(respone){
        //     console.log(respone);
        // })
        // .catch(function(error){
        //     console.log(error);
        // })
        getData().then(res => {
            const { code, data } = res.data;
            if (code == 20000) {
                this.tableData = data.tableData;
                const order = data.orderData;
                const xData = order.date;
                const keyArray = Object.keys(order.data[0]);
                const series = [];
                keyArray.forEach((key) => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: "line"
                    });
                });
                //折线图====
                // const options = {
                //     xAxis: {
                //         data: xData
                //     },
                //     tooltip: {
                //         trigger: "axis",
                //     },
                //     yAxis: {},
                //     legend: {
                //         data: keyArray
                //     },
                //     series
                // };
                // const E = echarts.init(this.$refs.echarts);
                // E.setOption(options);
                this.echartData.order.xData = xData
                this.echartData.order.series = series
                //用户(柱状图=====
                // const userOptions = {
                //     legend: {
                //         // 图例文字颜色
                //         textStyle: {
                //             color: "#333",
                //         },
                //     },
                //     grid: {
                //         left: "20%",
                //     },
                //     // 提示框
                //     tooltip: {
                //         trigger: "axis",
                //     },
                //     xAxis: {
                //         type: "category",
                //         data: data.userData.map(item => item.date),
                //         axisLine: {
                //             lineStyle: {
                //                 color: "#17b3a3",
                //             },
                //         },
                //         axisLabel: {
                //             interval: 0,
                //             color: "#333",
                //         },
                //     },
                //     yAxis: [
                //         {
                //             type: "value",
                //             axisLine: {
                //                 lineStyle: {
                //                     color: "#17b3a3",
                //                 },
                //             },
                //         },
                //     ],
                //     color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                //     series: [
                //         {
                //             name: "新增用户",
                //             data: data.userData.map(item => item.new),
                //             type: "bar"
                //         },
                //         {
                //             name: "活跃用户",
                //             data: data.userData.map(item => item.active),
                //             type: "bar"
                //         }
                //     ],
                // };
                // const U = echarts.init(this.$refs.userEcharts);
                // U.setOption(userOptions);
                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series = [
                        {
                            name: "新增用户",
                            data: data.userData.map(item => item.new),
                            type: "bar"
                        },
                        {
                            name: "活跃用户",
                            data: data.userData.map(item => item.active),
                            type: "bar"
                        }
                    ]
                //饼状图=====
                // const videoOptions = {
                //     tooltip: {
                //         trigger: "item",
                //     },
                //     color: [
                //         "#0f78f4",
                //         "#dd536b",
                //         "#9462e5",
                //         "#a6a6a6",
                //         "#e1bb22",
                //         "#39c362",
                //         "#3ed1cf",
                //     ],
                //     series: [
                //         {
                //             data: data.videoData,
                //             type: "pie"
                //         }
                //     ]
                // };
                // const V = echarts.init(this.$refs.videoEcharts);
                // V.setOption(videoOptions);
                 this.echartData.video.series = [
                    {
                        data: data.videoData,
                        type: 'pie'
                    }
                 ]
            }
            console.log(res);
        });
    },
    created() {
        
    },

}
</script>
<style lang="less" scoped>
    
</style>