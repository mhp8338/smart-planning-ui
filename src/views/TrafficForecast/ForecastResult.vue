<template>
    <div>
        <!--        1.现状流量分析结果-->
        <div class="current-traffic-chart">
            <a-row>
                <a-col :span="8">
                    <h2 style="text-align:center; color: #8392A5; font-size:20px">1.现状流量分析结果</h2>
                    <br>
                    <div style="border:2px black solid;width:250px;height:350px;margin: auto">
                        <h2 style="text-align:left; font-size:15px;">{{ forecastData['present_analysis'] }}</h2>
                    </div>
                </a-col>
                <a-col :span="16">
                    <h2 style="text-align:center; font-size:15px;font-weight: bold">（1）线状流量线柱图</h2>
                    <Chart :option="currentTrafficChartOption" style="height: 400px"></Chart>
                </a-col>
            </a-row>
        </div>
        <!--        2.预测流量分析结果-->
        <div class="predict-traffic-chart" style="margin-top: 20px">
            <a-row>
                <a-col :span="8">
                    <h2 style="text-align:center; color: #8392A5; font-size:20px">2.预测流量分析结果</h2>
                    <br>
                    <div style="border:2px black solid;width:250px;height:350px;margin: auto">
                        <h2 style="text-align:left; font-size:15px;">{{ forecastData['PRE_result_analysis'] }}</h2>
                    </div>
                </a-col>
                <a-col :span="16">
                    <h2 style="text-align:center; font-size:15px;font-weight: bold">（2）预测流量线柱图</h2>
                    <Chart :option="predictTrafficChartOption" style="height: 400px"></Chart>
                </a-col>
            </a-row>
        </div>
        <!--        3.省际流量预测值-->
        <div class="province-traffic-chart" style="margin-top: 20px">
            <a-row>
                <a-col :span="8">
                    <h2 style="text-align:center; color: #8392A5; font-size:20px">3.省际流量分析结果</h2>
                </a-col>
                <a-col :span="16">
                    <h2 style="text-align:center; font-size:15px;font-weight: bold">（3-1）省际流量预测值</h2>
                    <Chart :option="provinceTrafficChartOption" style="height: 400px"></Chart>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="8">
                    <h2 style="text-align:center; color: #8392A5; font-size:20px"></h2>
                </a-col>
                <a-col :span="16">
                    <h2 style="text-align:center; font-size:15px;font-weight: bold">（3-2）省际流量预测值年增长率</h2>
                    <Chart :option="provinceTrafficGrowthRateChartOption" style="height: 400px"></Chart>
                </a-col>
            </a-row>
            <!--    表格展示-->
            <a-table :columns="tableColumns" :data-source="tableData" bordered style="margin-top: 20px"
                     class="show-table" :pagination="pagination">
                <template slot="name" slot-scope="province">
                    <a>{{ province }}</a>
                </template>
            </a-table>

        </div>


    </div>
</template>

<script>
    import Chart from "../../components/Chart/Chart";
    function city_select(result, city) {
        const value = [];
        for (let i = 0; i < result.length; i++) {
            value[i] = result[i][city]
        }
        return value
    }
    export default {
        name: "ForecastResult",
        components: {Chart},
        props: {
            forecastData: Object,
        },
        data() {
            return {
                currentTrafficChartOption: {},
                predictTrafficChartOption: {},
                provinceTrafficChartOption: {},
                provinceTrafficGrowthRateChartOption: {},
                tableData: [],
                tableColumns: [],
                pagination :{
                    pageSize: 15
                }
            }
        },
        methods: {
            getCurrentTrafficChartOption() {
                const A_D_present = JSON.parse(this.forecastData['A_D_present'])
                const time = city_select(A_D_present, 'collect_time')
                const A_D = city_select(A_D_present, "A_D");
                const MAN = city_select(A_D_present, "MAN");
                const IDC = city_select(A_D_present, "IDC");
                const A_D_ratio = city_select(A_D_present, "A_D_ratio");
                const MAN_ratio = city_select(A_D_present, "MAN_ratio");
                const IDC_ratio = city_select(A_D_present, "IDC_ratio");
                this.currentTrafficChartOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['A_D', 'MAN', 'IDC', 'A_D同比增长率', 'MAN同比增长率', 'IDC同比增长率']
                    },
                    xAxis: [
                        {
                            "axisLabel": {
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 45
                            },
                            type: 'category',
                            axisTick: {show: false},
                            data: time
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '流量（T）',
                            min: 0,
                            max: 180,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value} T'
                            }
                        },
                        {
                            type: 'value',
                            name: '年增长率',
                            min: -100,
                            max: 120,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value}% '
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'A_D',
                            type: 'bar',
                            data: A_D
                        },
                        {
                            name: 'MAN',
                            type: 'bar',
                            data: MAN
                        },
                        {
                            name: 'IDC',
                            type: 'bar',
                            data: IDC
                        },
                        {
                            name: 'A_D同比增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: A_D_ratio
                        },
                        {
                            name: 'MAN同比增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: MAN_ratio
                        },
                        {
                            name: 'IDC同比增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: IDC_ratio
                        }
                    ]
                }

            },
            getPredictTrafficChartOption() {
                const PRE_result_ratio = JSON.parse(this.forecastData['PRE_result_ratio'])
                const time = city_select(PRE_result_ratio, 'collect_time')
                const A_D = city_select(PRE_result_ratio, "A_D");
                const MAN = city_select(PRE_result_ratio, "MAN");
                const IDC = city_select(PRE_result_ratio, "IDC");
                const A_D_ratio = city_select(PRE_result_ratio, "A_D_ratio");
                const MAN_ratio = city_select(PRE_result_ratio, "MAN_ratio");
                const IDC_ratio = city_select(PRE_result_ratio, "IDC_ratio");
                this.predictTrafficChartOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['A_D', 'MAN', 'IDC', 'A_D同比增长率', 'MAN同比增长率', 'IDC同比增长率']
                    },
                    xAxis: [
                        {
                            "axisLabel": {
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 45
                            },
                            type: 'category',
                            axisTick: {show: false},
                            data: time
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '流量（T）',
                            min: 0,
                            max: 260,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value} T'
                            }
                        },
                        {
                            type: 'value',
                            name: '年增长率',
                            min: -100,
                            max: 120,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value}% '
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'A_D',
                            type: 'bar',
                            data: A_D
                        },
                        {
                            name: 'MAN',
                            type: 'bar',
                            data: MAN
                        },
                        {
                            name: 'IDC',
                            type: 'bar',
                            data: IDC
                        },
                        {
                            name: 'A_D同比增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: A_D_ratio
                        },
                        {
                            name: 'MAN同比增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: MAN_ratio
                        },
                        {
                            name: 'IDC同比增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: IDC_ratio
                        }
                    ]
                }
            },
            getProvinceTrafficChartOption() {
                const time = this.forecastData['SUM_province_time']
                const result = JSON.parse(this.forecastData['SUM_province_show'])
                const city = this.forecastData['city']
                const newData = []
                for (let i = 0; i < city.length; i++) {
                    const lineItem = {
                        name: '',
                        type: 'bar',
                        data: []
                    };
                    lineItem.name = city[i];
                    lineItem.data = city_select(result, city[i]);
                    newData.push(lineItem);
                }
                console.log(newData)
                this.provinceTrafficChartOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    legend: {
                        x: 'left',
                        data: city,
                        left: 10,
                        selectedMode: 'single'
                    },
                    xAxis: {
                        data: time
                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLabel: {
                            formatter: '{value} G'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['stack', 'tiled', 'line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    dataZoom: [{
                        textStyle: {
                            color: '#8392A5'
                        }

                    }, {
                        type: 'inside'
                    }],
                    series: newData
                }

            },
            getProvinceTrafficGrowthRateChartOption() {
                const result = JSON.parse(this.forecastData['SUM_province_ratio_show'])
                const time = this.forecastData['SUM_province_time']
                const city = this.forecastData['city']
                const newData = []
                for (let i = 0; i < city.length; i++) {
                    const lineItem = {
                        name: '',
                        type: 'line',
                        data: []
                    };
                    lineItem.name = city[i];
                    lineItem.data = city_select(result, city[i]);
                    newData.push(lineItem);
                }
                this.provinceTrafficGrowthRateChartOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    legend: {
                        x: 'left',
                        data: city,
                        left: 10,
                        selectedMode: 'single'
                    },

                    xAxis: {
                        data: time
                    },

                    yAxis: {
                        splitLine: {show: false},
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },

                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['stack', 'tiled', 'line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },

                    dataZoom: [{
                        textStyle: {
                            color: '#8392A5'
                        }

                    }, {
                        type: 'inside'
                    }],

                    series: newData
                }

            },
            getTable(){
                this.tableColumns = [
                    {
                        title: '省份',
                        dataIndex: 'province',
                        scopedSlots: { customRender: 'province' },
                    },
                    {title: '2020/06(G)',dataIndex:'data0'},
                    {title: '2020/12(G)', dataIndex: 'data1'},
                    {title: '2021/12(G)', dataIndex: 'data2'},
                    {title: '2022/12(G)', dataIndex: 'data3'},
                    {title: '2023/12(G)', dataIndex: 'data4'},
                    {title: '2024/12(G)', dataIndex: 'data5'},
                    {title: '2020/06年增长率(%)', dataIndex: 'ratio0'},
                    {title: '2020/12年增长率(%)', dataIndex: 'ratio1'},
                    {title: '2021/12年增长率(%)', dataIndex: 'ratio2'},
                    {title: '2022/12年增长率(%)', dataIndex: 'ratio3'},
                    {title: '2023/12年增长率(%)', dataIndex: 'ratio4'},
                    {title: '2024/12年增长率(%)', dataIndex: 'ratio5'}
                ]
                const rawData = JSON.parse(this.forecastData['shows'])
                for (let i = 0; i <rawData.length; i++) {
                    rawData[i]['key'] = i+1
                }
                this.tableData = rawData
            },
            beforeDestroy() {
                clearInterval(this.interval);
            },

        },
        mounted() {
            this.getCurrentTrafficChartOption()
            this.getPredictTrafficChartOption()
            this.getProvinceTrafficChartOption()
            this.getProvinceTrafficGrowthRateChartOption()
            this.getTable()
            this.interval = setInterval(() => {
                this.getCurrentTrafficChartOption();
                this.getPredictTrafficChartOption()
                this.getProvinceTrafficChartOption()
                // this.getProvinceTrafficGrowthRateChartOption()
            }, 300000);

        }

    }
</script>

<style scoped>

</style>
