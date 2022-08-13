<template>
    <div ref="echarts">
        
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            //折线图和柱状图
            axisOptions:{
                legend: {
                // 图例文字颜色
                textStyle: {
                color: "#333",
                },
                },
                grid: {
                left: "20%",
                },
                // 提示框
                tooltip: {
                trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                    axisLabel: {
                    interval: 0,
                    color: "#333",
                    },
                },
                yAxis: [
                    {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [],
            },
            //饼状图
            normalOptions: {
                tooltip: {
                trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [],
            },
            echartInit: null
        }
    },
    props:{
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default(){
                return {
                    xData: [],
                    series: []
                }
            }
            // default: {
            //     xData: [],
            //     series: []
            // }
        }
    },
    watch: {
        //监听chartData，当发生变化时，执行回调
        chartData: {
            handler: function(){
                this.initChart()
            },
            deep: true,
            
        }
    },
    methods:{
        initChart(){
            this.initChartData()
            if(this.echartInit){
                this.echartInit.setOption(this.options)
            }else{
                this.echartInit = echarts.init(this.$refs.echarts)
                this.echartInit.setOption(this.options)
            }
        },
        initChartData(){
            if(this.isAxisChart){
                this.axisOptions.xAxis.data = this.chartData.xData
                this.axisOptions.series = this.chartData.series
            }
            //不是折线和柱状图，是饼状图没有x和y轴
            else{
                this.normalOptions.series = this.chartData.series
            }
        }
    },
    computed:{
        options(){
            return this.isAxisChart ? this.axisOptions : this.normalOptions
        }
    },
    created(){
        
    },
}
</script>
<style lang="less" scoped>
    
</style>