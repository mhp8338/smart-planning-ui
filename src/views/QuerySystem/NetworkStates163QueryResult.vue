<template>
    <div>
        <a-row>
            <!--            查询内容-->
            <a-col :span="6">
                <a-card title="查询内容" style="text-align: center">
                    <div v-for="(content,i) in queryContentKey" style="text-align: left">
                        <p>
                            <span class="query-content-font-key">{{content}}：</span>{{queryResult['myform_values_CH'][i]===''?'未选择':queryResult
                            ['myform_values_CH'][i]}}
                        </p>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="17" class="aim-tab">
                <a-tabs default-active-key="1" size="large">
                    <!--                    汇总图-->
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <a-icon type="bar-chart"/>
                                汇总图
                        </span>
                        <chart :option="summaryPictureOption" style="height: 500px" v-on:click-data="getDate"></chart>
                    </a-tab-pane>
                    <!--                    表格-->
                    <a-tab-pane key="2">
                        <span slot="tab">
                            <a-icon type="table"/>
                                详细表格
                        </span>
                        <div style="display: flex;justify-content: flex-end">
                            <!--                            搜索-->
                            <a-input-search placeholder="input search text" style="width: 150px;margin-right: 10px"
                                            @search="onSearchTable"/>
                            <!--                            导出-->
                            <a-select default-value="Excel" style="width: 120px;margin-right: 10px"
                                      @change="handleExportSelectChange">
                                <a-select-option value="excel">
                                    Excel
                                </a-select-option>
                                <a-select-option value="txt">
                                    TXT
                                </a-select-option>
                                <a-select-option value="csv">
                                    CSV
                                </a-select-option>
                            </a-select>
                        </div>
                        <a-table :columns="tableColumns"
                                 :data-source="tableData" bordered style="margin: 10px">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                        </a-table>
                    </a-tab-pane>
                    <!--                    地图-->
                    <a-tab-pane key="3">
                        <span slot="tab">
                            <a-icon type="monitor"/>
                                地图
                        </span>
                        <chart :option="mapOption" style="height: 400px;margin: 10px"></chart>
                    </a-tab-pane>
                    <!--                    TOPO图-->
                    <a-tab-pane key="4">
                        <span slot="tab">
                            <a-icon type="fork"/>
                                拓扑图
                        </span>
                        <chart :option="topologyOption" style="height: 800px;margin: 10px"></chart>
                    </a-tab-pane>
                    <!--                    源数据-->
                    <a-tab-pane key="5">
                        <span slot="tab">
                            <a-icon type="database"/>
                                源数据
                        </span>
                        <pre style="height: auto;margin: 10px">{{jsonData}}</pre>

                    </a-tab-pane>
                </a-tabs>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {chinaMapOption} from "../../constants/networt-states-163/map"
    import Chart from "../../components/Chart/Chart";
    import * as resultConstant from "../../constants/networt-states-163/resultConstant"


    export default {
        name: "NetworkStates163QueryResult",
        components: {Chart},
        props: {
            queryResult: Object,
        },
        data() {
            return {

                queryContentKey: [],

                summaryPictureOption: {},
                mapOption: {},
                topologyOption: {},
                tableData: [],
                tableColumns: [],
                jsonData: {},
                date: '',
                searchValue: '',
                //qContent: Traffic
                qContent: '',
                qDefinition_Routing: '',

            }
        },
        methods: {
            //TODO 点击汇总图所触发的事件:生成表格和拓扑图
            getDate(value) {
                // console.log('date' + value)
                this.date = value
                if (resultConstant.NO_TABLE_DEFINE.indexOf(this.qDefinition_Routing) <= -1) {
                    this.tableColumns = this.getTableData().tableColumn
                    this.tableData = this.getTableData().tableData
                }
                if (resultConstant.NO_TOPO_DEFINE.indexOf(this.qDefinition_Routing) <= -1) {
                    this.setTopologyOption()
                }

            },
            //TODO 地图选项卡
            setMapOption() {
                this.mapOption = chinaMapOption
            },
            // TODO 汇总图的方法
            setSummaryPictureOption() {
                const optionData = this.getSummaryPictureOptionData()
                this.summaryPictureOption = {
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
                        data: optionData.legend
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: optionData.xAxis,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                        }
                    ],
                    series: optionData.series
                };
                if (this.qDefinition_Routing === 'Edge_Distance') {
                    this.setSpecialTableData(optionData);
                }

            },
            getSummaryPictureProcessData: function () {
                let processData
                if (this.qContent === 'Routing') {
                    if (this.qDefinition_Routing === 'Edge_Routing_Demands') {
                        processData = this.jsonData['DemandData']
                    } else {
                        processData = this.jsonData['DistanceData']
                    }
                } else {
                    processData = this.jsonData[this.qContent];
                }
                return processData;
            },
            getSummaryPictureLegendParam: function (processData) {
                let legendParam;
                if (this.qDefinition_Routing === 'Edge_Distance') {
                    legendParam = ['Edge_Distance', 'optical_first_distance', 'optical_second_distance']
                } else {
                    legendParam = Object.keys(processData[0]).filter(value =>
                        resultConstant.SUMMARY_PARAM_EXCLUDE.indexOf(value) <= -1)
                }
                return legendParam;
            },
            getSummaryPictureOptionData: function () {
                const that = this
                let processData = this.getSummaryPictureProcessData();
                let legendParam = this.getSummaryPictureLegendParam(processData);

                // console.log(summaryPictureParam)
                function getLegend(keys) {
                    const res = new Set()
                    keys.forEach((item) => {
                        if (legendParam.indexOf(item) > -1) {
                            res.add(item)
                        }
                    })
                    return Array.from(res);
                }

                function getXAxis() {
                    const res = new Set()
                    processData.forEach((item) => {
                        if (Object.keys(item).indexOf('date') > -1) {
                            res.add(item['date'])
                        } else {
                            res.add(item['Date'])
                        }

                    })
                    return Array.from(res);
                }

                //this.qDefinition_Routing !== 'Edge_Distance'
                function getRouteSpecialXAxis() {
                    const res = new Set()
                    processData.forEach((item) => {
                        const itemData = item['data']
                        console.log(itemData)
                        itemData.forEach((value) => {
                            console.log(value)
                            res.add(value['SourceNode'] + '=>' + value['TargetNode'])
                        })
                    })
                    return Array.from(res);
                }

                function getSeries() {
                    const res = new Array(0)
                    for (let legendElement of legend) {
                        const dic = {}
                        dic['name'] = legendElement;
                        dic['type'] = 'bar';
                        dic['data'] = []
                        if (that.qDefinition_Routing !== 'Edge_Distance') {
                            for (const processDatum of processData) {
                                dic['data'].push(processDatum[legendElement])
                            }
                        } else {
                            processData.forEach((item) => {
                                const itemData = item['data']
                                console.log(itemData)
                                itemData.forEach((value) => {
                                    if (legendElement === 'Edge_Distance') {
                                        legendElement = "geo_distance"
                                    }
                                    if (value[legendElement] !== undefined) {
                                        dic['data'].push(value[legendElement])
                                    }
                                })
                            })
                        }
                        res.push(dic)
                    }
                    return res;
                }

                const legend = this.qDefinition_Routing !== 'Edge_Distance' ? getLegend(Object.keys(processData[0])) : legendParam;
                const xAxis = this.qDefinition_Routing !== 'Edge_Distance' ? getXAxis() : getRouteSpecialXAxis();
                const series = getSeries();
                return {
                    'series': series,
                    'xAxis': xAxis,
                    'legend': legend
                }

            },
            // TODO 表格的方法
            /**
             * 表格导出的方法
             * @param value
             */
            handleExportSelectChange(value) {
                import("../../components/Export/Export2Excel").then(excel => {
                    const tHeader = [];
                    this.tableColumns.forEach((value) => {
                        tHeader.push(value['title'])
                    })

                    function formatJson(filterVal, jsonData) {
                        return jsonData.map(v => filterVal.map(j => v[j]));
                    }

                    const data = formatJson(tHeader, this.tableData);

                    function getBookType() {
                        if (value === 'excel') {
                            return 'xlsx';
                        } else if (value === 'csv') {
                            return 'csv';
                        } else {
                            return 'txt'
                        }
                    }

                    excel.export_json_to_excel({
                        header: tHeader, //表头 必填
                        data, //具体数据 必填
                        filename: 'excel-list', //非必填
                        autoWidth: true, //非必填
                        bookType: getBookType()//非必填
                    })
                })


            },
            /**
             * processData: {'Neighbor':[{date1,date2}]}
             * tableDataParam: 'neighbor'
             * @returns {{processData: *, tableDataParam: string}}
             */
            getTableSourceData() {
                let processData;
                let tableDataParam;
                if (Object.keys(this.jsonData).indexOf('Neighbor') > -1) {
                    processData = this.jsonData['Neighbor']
                    tableDataParam = resultConstant.NEIGHBOR;
                } else if (Object.keys(this.jsonData).indexOf('Link') > -1) {
                    processData = this.jsonData['Link']
                    tableDataParam = 'links'
                } else if (this.qDefinition_Routing === 'Edge_Resource_Distance') {
                    processData = this.jsonData['DistanceData']
                    tableDataParam = 'data'
                } else if (Object.keys(this.jsonData).indexOf('DemandData') > -1) {
                    processData = this.jsonData['DemandData']
                    tableDataParam = 'Demands'
                } else {
                    processData = this.jsonData[this.qContent];
                    tableDataParam = resultConstant.CIRCUITS;
                }
                return {
                    processData: processData,
                    tableDataParam: tableDataParam
                }
            },
            /**
             *
             * @param args 用于处理特殊情况 this.qDefinition_Routing === 'Edge_Distance'
             * @returns {any[]} 获取表格所有columns的集合
             */
            getTableColumnsParam: function (args) {
                let tableColumnsParam
                if (this.qDefinition_Routing !== 'Edge_Distance') {
                    const processData = this.getTableSourceData().processData;
                    const tableDataParam = this.getTableSourceData().tableDataParam
                    const tableSourceColumn = processData[0][tableDataParam]
                    tableColumnsParam = Object.keys(tableSourceColumn[0]).filter((value) =>
                        resultConstant.TABLE_DATA_COLUMNS_EXCLUDE.indexOf(value) <= -1)
                } else {
                    tableColumnsParam = args
                }
                return tableColumnsParam;
            },
            getTableColumns(args) {
                let tableColumnsParam = this.getTableColumnsParam(args);
                let tableColumns = []
                tableColumnsParam.forEach(value => {
                    const dic = {}
                    dic['title'] = value;
                    dic['dataIndex'] = value;
                    dic['key'] = value;
                    if (resultConstant.TABLE_SORT.indexOf(value) > -1) {
                        dic['sorter'] = (a, b) => a[value] - b[value]
                        dic['sortDirections'] = ['descend', 'ascend']

                    }
                    tableColumns.push(dic)
                })
                // console.log(tableColumns)
                return tableColumns
            },
            getTableData() {
                let processData = this.getTableSourceData().processData;
                //处理date和Date两种情况
                const date = this.getDateParam(processData)
                let tableDataParam = this.getTableSourceData().tableDataParam;
                const tableColumn = this.getTableColumns()
                const tableData = []
                for (let i = 0; i < processData.length; i++) {
                    const item = processData[i]
                    if (item[date] === this.date) {
                        for (let j = 0; j < item[tableDataParam].length; j++) {
                            const dic = {}
                            const circuitsItem = item[tableDataParam][j]
                            for (const tableColumnElement of tableColumn) {
                                if (typeof circuitsItem[tableColumnElement['title']] === 'number' &&
                                    circuitsItem[tableColumnElement['title']] % 1 !== 0) {
                                    //小数
                                    circuitsItem[tableColumnElement['title']] =
                                        parseFloat(circuitsItem[tableColumnElement['title']].toFixed(5))
                                }
                                if (typeof circuitsItem[tableColumnElement['title']] === 'boolean') {
                                    circuitsItem[tableColumnElement['title']] = circuitsItem[tableColumnElement['title']].toString()
                                }
                                dic[tableColumnElement['title']] = circuitsItem[tableColumnElement['title']]
                            }
                            dic['key'] = (j + 1).toString()
                            tableData.push(dic)
                        }
                    }
                }

                return {
                    tableColumn: tableColumn,
                    tableData: tableData
                }

            },
            /**
             * 处理后端date和 Date的问题
             * @param processData
             * @returns {string}
             */
            getDateParam(processData) {
                if (Object.keys(processData[0]).indexOf('date') > -1) {
                    return 'date'
                } else {
                    return 'Date'
                }

            },
            /** if this.qDefinition_Routing === 'Edge_Distance'
             * 直接设置表格数据，是一种特殊情况
             * @param {{xAxis, series: any[], legend}} optionData
             */
            setSpecialTableData: function (optionData) {
                this.tableColumns = this.getTableColumns(['citypair'].concat(optionData.legend))
                // this.tableData = optionData.series
                this.tableData = []
                for (let i = 0; i < optionData.series[0]['data'].length; i++) {
                    const dic = {}
                    optionData.series.forEach(value => {
                        dic[value['name']] = value['data'][i]
                    })
                    dic['citypair'] = optionData.xAxis[i]
                    dic['key'] = i + 1
                    this.tableData.push(dic)
                }
            },
            /**
             * 表格搜索
             * @param value
             */
            onSearchTable(value) {
                this.searchValue = value;
                this.tableData = this.getTableData().tableData;
                this.tableColumns = this.getTableData().tableColumn;

                if (this.searchValue !== '') {
                    const res = [];
                    // sourceNode need replace
                    for (const tableDatum of this.tableData) {
                        if (tableDatum['sourceNode'].search(this.searchValue) !== -1) {
                            res.push(tableDatum)
                        }
                    }
                    this.tableData = res
                }

            },
            //TODO 拓扑图的方法
            /**
             *
             * @returns {{seriesDataTypeParam: string[], processData: *, topoAimDataParam: string}}
             * seriesDataTypeParam:TOPO图所需要的参数集合
             * processData => topoAimDataParam:拓扑数据所在的位置
             */
            getTopoSourceData() {
                let topoAimDataParam;
                let processData;
                let seriesDataTypeParam;
                if (Object.keys(this.jsonData).indexOf('Neighbor') > -1) {
                    processData = this.jsonData['Neighbor']
                    topoAimDataParam = resultConstant.NEIGHBOR;
                    seriesDataTypeParam = ['sourceNode', 'sinkNode', 'capacity_G', 'traffic_in_G', 'traffic_out_G']

                } else if (Object.keys(this.jsonData).indexOf('Link') > -1) {
                    processData = this.jsonData['Link']
                    topoAimDataParam = 'links';
                    seriesDataTypeParam = ['sourceDevice', 'sinkDevice']

                } else if (Object.keys(this.jsonData).indexOf('DemandData') > -1) {
                    processData = this.jsonData['DemandData']
                    topoAimDataParam = 'Demands';
                    seriesDataTypeParam = ['SourceDemand', 'TargetDemand', 'Share', 'Traffic']
                } else {
                    processData = this.jsonData[this.qContent];
                    topoAimDataParam = resultConstant.CIRCUITS
                    seriesDataTypeParam = ['sourceNode', 'sinkNode', 'capacity_G', 'traffic_in_G', 'traffic_out_G']
                }

                return {
                    topoAimDataParam: topoAimDataParam,
                    processData: processData,
                    seriesDataTypeParam: seriesDataTypeParam
                }
            },
            setTopologyOption() {
                let aimItem = {}
                // 二级数据
                let topoAimDataParam = this.getTopoSourceData().topoAimDataParam;
                // 一级数据
                let processData = this.getTopoSourceData().processData;
                const date = this.getDateParam(processData)
                const seriesDataTypeParam = this.getTopoSourceData().seriesDataTypeParam
                processData.forEach((item) => {
                        if (item[date] === this.date) {
                            aimItem = item
                        }
                    }
                )

                // Traffic => China Node To Node aimItemCircuits:'circuits'
                const aimItemCircuits = aimItem[topoAimDataParam]
                const seriesDataType = new Set()
                const seriesData = []
                const seriesLink = []
                aimItemCircuits.forEach((value) => {
                    const seriesLinkDic = {}
                    seriesDataType.add(value[seriesDataTypeParam[0]])
                    seriesDataType.add(value[seriesDataTypeParam[1]])
                    seriesLinkDic['source'] = value[seriesDataTypeParam[0]]
                    seriesLinkDic['target'] = value[seriesDataTypeParam[1]]
                    if (this.qContent === 'Bandwidth') {
                        seriesLinkDic['name'] = value['value_G']
                    } else if (this.qDefinition_Routing === 'Edge_Routing_Demands') {
                        seriesLinkDic['name'] =
                            "Share:" + value['Share'] + " \n" + "Traffic:" +
                            value['Traffic']
                    } else {
                        seriesLinkDic['name'] =
                            "value_G:" + value[seriesDataTypeParam[2]] + " \n" + seriesDataTypeParam[3] + ":" +
                            value[seriesDataTypeParam[3]]
                            + " \n" + seriesDataTypeParam[4] + ":" + value[seriesDataTypeParam[4]]
                    }

                    seriesLink.push(seriesLinkDic)
                })
                seriesDataType.forEach((item) => {
                    const seriesDataDic = {};
                    seriesDataDic['id'] = item
                    seriesDataDic['name'] = item
                    seriesDataDic['label'] = item
                    seriesDataDic['flag'] = true
                    seriesData.push(seriesDataDic)
                })
                function getCategories() {
                    let categories = []
                    for (let i = 0; i < resultConstant.CAT.length; i++) {
                        const dic = {}
                        dic['name'] = resultConstant.CAT[i]
                        if (resultConstant.CAT[i] === 'IDC') {
                            dic['symbol'] = 'diamond'
                            dic['symbolSize'] = 30
                        } else {
                            dic['symbol'] = 'circle'
                            dic['symbolSize'] = 20
                        }
                        categories.push(dic)
                    }
                    return categories
                }
                function dealSeriesData() {
                    for (let i = 0; i < seriesData.length; i++) {
                        for (let j = 0; j < resultConstant.CAT_COMPARE.length; j++) {
                            for (let k = 0; k < resultConstant.CAT_COMPARE[j][Object.keys(resultConstant.CAT_COMPARE[j])].length; k++) {
                                if (seriesData[i]["id"] === resultConstant.CAT_COMPARE[j][Object.keys(resultConstant.CAT_COMPARE[j])][k]) {
                                    seriesData[i]["category"] = Object.keys(resultConstant.CAT_COMPARE[j])[0];
                                }
                            }
                        }
                    }
                }
                // 不需要：流量-省内 流量-A-D-A-D 流量-ChinaNet_C-E 流量-ChinaNet_Node_To_Node 带宽-ChinaNet_Node_To_Node
                // 需要：流量-全国 流量-省间 流量-出省 流量-ChinaNet_C-I 流量-ChinaNet_C-S 带宽-省内(全国) 带宽-省间 带宽-出省 带宽-ChinaNet_C-E 带宽-ChinaNet_C-I 带宽-ChinaNet_C-S
                getCategories();
                dealSeriesData();
                const categories = getCategories()
                this.topologyOption = {
                    title: {
                        text: '拓扑图',
                        top: 'bottom',
                        left: 'right'
                    },
                    tooltip: {
                        formatter: function (x) {
                            return x.data.source + "->" + x.data.target + "=" + x.data.name;//设置提示框的内容和格式 节点和边都显示name属性
                        }
                    },
                    legend: [{
                        data: categories.map(function (a) {
                            return a.name;
                        }),
                        orient: 'horizontal'
                    }],
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            type: 'graph',
                            layout: 'circular',
                            circular: {
                                rotateLabel: true  //每个点的label是往外倾斜的。
                            },
                            symbolSize: 20,
                            roam: true,
                            label: {
                                show: true
                            },
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            edgeLabel: {
                                fontSize: 20,
                                // normal: {
                                //     show: true,
                                //     //通过回调函数设置连线上的标签
                                //     formatter: function (x) {
                                //         return x.data.name;
                                //     }
                                // }
                            },
                            categories: categories,
                            data: seriesData,
                            // links: [],
                            links: seriesLink,
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            },
                            focusNodeAdjacency: true,
                            emphasis: {
                                lineStyle: {
                                    width: 10
                                }
                            }
                        }
                    ]
                };
            },

        },
        mounted() {
            this.queryContentKey = resultConstant.QUERY_CONTENT_KEY
            this.jsonData = JSON.parse(this.queryResult['json_data'])
            this.qContent = this.queryResult['myform_cleaned_data']['qContent']
            this.qDefinition_Routing = this.queryResult['myform_cleaned_data']['qDefinition_Routing']
            // 有一些没有数据
            if (resultConstant.NO_DATA_DEFINE.indexOf(this.qDefinition_Routing) <= -1) {
                this.setSummaryPictureOption()
                this.setMapOption()
                // console.log('asd')
            }

            // console.log(this.jsonData['Traffic'])
            // console.log(this.getTableColumns('sourceNode', 'sinkNode'))

        }
    }
</script>

<style scoped>
    .aim-tab {
        background: white;
        box-shadow: 2px 2px 2px 2px #e8e8e8;
    }

    .query-content-font-key {
        font-weight: bold;
    }

</style>
