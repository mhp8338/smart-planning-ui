<template>
    <div id="network-states-163">
        <h1>ChinaNet信息查询</h1>
        <!--        表单-->
        <a-form-model
                :rules="formRules"
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                ref="form"
                v-if="showNetworkStatesForm">
            <!--            查询类型-->
            <a-form-model-item label="查询类型" prop="qContent">
                <a-radio-group v-model="form.qContent" button-style="solid" v-for="type in queryType"
                               v-bind:key="type.index" @change="queryTypeOnChange">
                    <a-radio-button :value="type" style="margin-right: 10px">
                        {{type}}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>

            <!--            状态-->
            <a-form-model-item label="状态" prop="qStatus">
                <a-radio-group v-model="form.qStatus" button-style="solid" v-for="sta in status" v-bind:key="sta.index"
                               @change="statusOnChange">
                    <a-radio-button :value="sta" style="margin-right: 10px" :disabled="statusDisabled(sta)">
                        {{sta}}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>

            <!--            定义-->
            <a-form-model-item label="定义" prop="qDefine">
                <a-radio-group v-model="form.qDefine" button-style="solid" v-for="def in define" v-bind:key="def.index"
                               @change="defineOnChange">
                    <a-radio-button :value="def"
                                    style="margin-right: 10px;margin-bottom: 10px" :disabled="defineDisabled(def)">
                        {{def}}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>

            <!--            省份-->
            <a-form-model-item label="省份" prop="province" v-if="needProvince">
                <a-select style="width: 120px;margin-right: 10px" @change="handleProvinceChange"
                          v-model="form.province">
                    <a-icon slot="suffixIcon" type="control"/>
                    <a-select-option v-for="prov in provinces" v-bind:key="prov.index"
                                     :disabled="provinceDisabled(prov)" :value="prov">
                        {{prov}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <!--            起始终止省份-->
            <div v-if="needStartAndEndProvince">
                <a-form-model-item label="起始省份" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qStartProvince">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="prov in provinces" :value="prov" v-bind:key="prov.index"
                                         :disabled="startAndEndProvinceDisabled(prov)">
                            {{prov}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="终止省份" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qEndProvince">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="prov in provinces" :value="prov" v-bind:key="prov.index"
                                         :disabled="startAndEndProvinceDisabled(prov)">
                            {{prov}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>


            <!--            起始终止节点-->
            <div v-if="needStartAndEndNode">
                <a-form-model-item label="起始节点" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qStartNode">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="node in provinceNode" :value="node" v-bind:key="node.index">
                            {{node}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="终止节点" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qEndNode">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="node in provinceNode" :value="node" v-bind:key="node.index">
                            {{node}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>

            <!--            节点类型-->
            <div v-if="needNodeType">
                <a-form-model-item label="节点类型" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qType">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="nodeType in nodeTypes" :value="nodeType" v-bind:key="nodeTypes.index">
                            {{nodeType}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>

            <!--            距离类型-->
            <div v-if="needDistanceType">
                <a-form-model-item label="距离类型" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qDistanceType">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="distanceType in distanceTypes" :value="distanceType"
                                         v-bind:key="distanceType.index">
                            {{distanceType}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>

            <!--            总结方法-->
            <div v-if="needSummaryMethod">
                <a-form-model-item label="总结方法" prop="province">
                    <a-select style="width: 120px" @change="handleProvinceChange" v-model="form.qSummarized_Method">
                        <a-icon slot="suffixIcon" type="control"/>
                        <a-select-option v-for="summaryMethod in summaryMethods" :value="summaryMethod"
                                         v-bind:key="summaryMethod.index">
                            {{summaryMethod}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>

            <!--            时间-->
            <div>
                <a-form-model-item label="时间" prop="date">
                    <a-range-picker @change="onChange" v-model="form.date">
                        <a-icon slot="suffixIcon" type="control"/>
                    </a-range-picker>
                </a-form-model-item>
            </div>

            <!--            提交-->
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">
                    信息查询
                </a-button>
                <a-button style="margin-left: 10px;" @click="resetForm('form')">
                    重置
                </a-button>
            </a-form-model-item>


        </a-form-model>
        <!--        结果-->
        <network-states163-query-result v-if="showResult" :query-result="queryResult"></network-states163-query-result>


    </div>
</template>

<script>
    import request from "../../utils/request";
    import * as queryConstant from "../../constants/networt-states-163/queryConstant"
    import moment from 'moment';
    import NetworkStates163QueryResult from "./NetworkStates163QueryResult";


    export default {
        name: "NetworkStates",
        components: {NetworkStates163QueryResult},
        data() {

            return {
                labelCol: {span: 4},
                wrapperCol: {span: 14},
                form: {
                    qContent: '',
                    qStatus: '',
                    qDefine: '',
                    province: '请选择',
                    qStartProvince: '请选择',
                    qEndProvince: '请选择',
                    qStartNode: '请选择',
                    qEndNode: '请选择',
                    qType: '请选择',
                    qDistanceType: '请选择',
                    qSummarized_Method: '请选择',
                    date: [moment('2018-12-01', this.dateFormat), moment('2018-12-01',
                        this.dateFormat)]

                },
                formRules: {
                    qContent: [
                        {required: true, message: '请输入查询类型', trigger: 'blur'}
                    ],
                    qStatus: [
                        {required: true, message: '请输入状态类型', trigger: 'blur'}
                    ],
                    qDefine: [
                        {required: true, message: '请输入定义类型', trigger: 'blur'}
                    ],
                    province: [
                        {required: true, message: '请输入省份', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '请输入时间', trigger: 'blur'}
                    ]
                },
                showNetworkStatesForm: true,
                // 查询类型
                queryType: [],
                isBandwidth: false,
                isFlow: false,
                isRouting: false,

                status: [],
                isRunningState: false,
                isPlanningState: false,


                provinces: [],
                define: [],
                provinceNode: [],
                nodeTypes: [],
                distanceTypes: [],
                summaryMethods: [],
                // 省份
                needProvince: false,
                needStartAndEndProvince: false,
                needStartAndEndNode: false,
                needNodeType: false,
                needDistanceType: false,
                needSummaryMethod: false,
                //日期
                dateFormat: 'YYYY-MM-DD',

                //查询返回数据
                queryResult: undefined,
                showResult: false
            }
        },
        methods: {
            constructFormData: function () {
                const formData = new FormData();
                formData.append('qContent', queryConstant.Content_Map[this.form.qContent])
                formData.append('qStatus', queryConstant.Status_Map[this.form.qStatus])
                formData.append('qStartDate', this.form.date[0].format('YYYY-MM-DD'))
                formData.append('qEndDate', this.form.date[1].format('YYYY-MM-DD'))
                if (this.needProvince) {
                    if (['省间(全国)', 'ChinaNet_C-E', 'ChinaNet_C-I', 'ChinaNet_C-S'].indexOf(this.form.qDefine) !==
                        -1) {
                        formData.append('qCountry_only', queryConstant.PROVINCES_OF_CHINA_Map[this.form.province])
                    } else {
                        formData.append('qProvince_Country', queryConstant.PROVINCES_OF_CHINA_Map[this.form.province])
                    }
                }
                if (this.needNodeType) {
                    formData.append('qType', queryConstant.Type_Map[this.form.qType])
                }
                if (this.needStartAndEndNode) {
                    formData.append('qStartNode', this.form.qStartNode)
                    formData.append('qEndNode', this.form.qEndNode)
                }
                if (this.needDistanceType) {
                    formData.append('qDistanceType', queryConstant.DistanceType_Map[this.form.qDistanceType])
                }
                if (this.needStartAndEndProvince) {
                    if (this.form.qDefine === 'Demand_Routing_Path_Distance') {
                        formData.append('qStartProvince_zh', this.form.qStartProvince)
                        formData.append('qEndProvince_zh', this.form.qEndProvince)
                    } else {
                        formData.append('qStartProvince', queryConstant.PROVINCES_OF_CHINA_Map[this.form.qStartProvince])
                        formData.append('qEndProvince', queryConstant.PROVINCES_OF_CHINA_Map[this.form.qEndProvince])
                    }
                }
                if (this.needSummaryMethod) {
                    formData.append('qSummarized_Method', queryConstant.Summarized_Method_Map[this.form.qSummarized_Method])
                }

                // 定义传值
                if (this.form.qContent === '带宽') {
                    formData.append('qDefinition_Bandwidth', queryConstant.Definition_Map[this.form.qDefine])
                } else if (this.form.qContent === '流量') {
                    formData.append('qDefinition_Traffic', queryConstant.Definition_Map[this.form.qDefine])
                } else {
                    formData.append('qDefinition_Routing', queryConstant.Definition_Map[this.form.qDefine])
                }


                return formData
            },
            //提交表单
            onSubmit() {

                this.$refs.form.validate(async (valid) => {
                    if (!valid) return this.$message.error('请完成所需项填写');
                    const formData = this.constructFormData()
                    // formData.forEach(value => console.log(value))


                    // 更改页面状态
                    this.resetForm('form')
                    this.showNetworkStatesForm = false
                    const res = await request({
                        url: "/api/network_states/query_confirm2/",
                        method: "POST",
                        data: formData
                    });


                    //模拟延迟
                    // clearTimeout(this.timer);  //清除延迟执行
                    // this.timer = setTimeout(()=>{   //设置延迟执行
                    //     this.showLoading = false
                    // },1000);
                    // this.timer = setTimeout(()=>{   //设置延迟执行
                    //     this.showResult = true
                    // },1000);
                    if (res.status !== 200) return this.$message.error('查询失败')
                    this.$message.success('查询成功')
                    this.queryResult = res.data
                    this.showResult = true
                    this.$parent.$emit('change-collapse')

                    // formData.forEach(value => {
                    //     console.log(value)
                    // })


                    // console.log(this.form)


                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleProvinceChange(value) {

            },
            onChange(date, dateString) {
                // console.log(date, dateString);
            },
            resetQueryType: function () {
                this.isBandwidth = false
                this.isFlow = false
                this.isRouting = false
            },
            queryTypeOnChange(value) {
                this.resetQueryType();
                this.form.qStatus = ''
                this.form.qDefine = ''
                switch (value.target.value) {
                    case '带宽':
                        this.isBandwidth = true
                        break;
                    case '流量':
                        this.isFlow = true
                        break;
                    case '路由':
                        this.isRouting = true
                }
                // console.log('routing:' + this.isRouting + '\n flow:' + this.isFlow + '\n bandwith:' + this.isBandwidth)
                // console.log(`checked=${value.target.value}`)
            },
            statusDisabled(value) {
                if (this.isBandwidth && value === '运行态') {
                    return true
                } else return this.isFlow && value === '规划态';
            },
            statusOnChange(value) {
                this.isRunningState = false
                this.isPlanningState = false
                this.form.qDefine = ''
                switch (value.target.value) {
                    case '规划态':
                        this.isPlanningState = true
                        break;
                    case '运行态':
                        this.isRunningState = true
                        break;
                }
                // console.log('plan:' + this.isPlanningState + ' ' + this.isRunningState)
            },

            defineDisabled(value) {
                const edge_resource_distance = queryConstant.DEFINE_ROUTE[4]
                const temp = queryConstant.DEFINE_ROUTE.slice(0, 4)
                if (this.isBandwidth && queryConstant.DEFINE_BANDWIDTH.indexOf(value) > -1) {
                    return false
                } else if (this.isFlow && queryConstant.DEFINE_FLOW.indexOf(value) > -1) {
                    return false
                } else return !(this.isRouting && ((this.isPlanningState && temp.indexOf(value) > -1) || (this.isRunningState
                    && value === edge_resource_distance)));
            },

            provinceDisabled(value) {
                // '省内', 'A-D' 有全国
                if (['省内', 'A-D'].indexOf(this.form.qDefine) > -1) {
                    return false
                    //出省没有全国
                } else if (this.form.qDefine === '出省' && value !== '全国') {
                    return false
                    // '省间(全国)', 'ChinaNet_C-E', 'ChinaNet_C-I', 'ChinaNet_C-S'只有全国
                } else return !(['省间(全国)', 'ChinaNet_C-E', 'ChinaNet_C-I', 'ChinaNet_C-S'].indexOf(this.form.qDefine)
                    > -1 && value === '全国');
            },
            resetProvince: function () {
                this.needStartAndEndProvince = false
                this.needProvince = false
                this.needStartAndEndNode = false
                this.needSummaryMethod = false
                this.needNodeType = false
                this.needDistanceType = false
            },
            defineOnChange() {
                this.resetProvince();
                if (['省内', '省间(全国)', '出省', 'ChinaNet_C-E', 'ChinaNet_C-I',
                    'ChinaNet_C-S', 'A-D'].indexOf(this.form.qDefine) > -1) {
                    this.needProvince = true
                } else if (['省间', 'Demand_Routing_Path', 'Demand_Routing_Path_Distance'].indexOf(this.form.qDefine) > -1) {
                    this.needStartAndEndProvince = true
                } else if (['Edge_Routing_Demands', 'Edge_Distance', 'Edge_Resource_Distance', 'ChinaNet_Node_To_Node']) {
                    this.needStartAndEndNode = true
                }

                if (this.form.qDefine === 'A-D') {
                    this.needNodeType = true
                }
                if (this.form.qDefine === 'Demand_Routing_Path_Distance') {
                    this.needDistanceType = true
                    this.needSummaryMethod = true
                }

                // console.log(constant.Definition_Traffic[this.form.qDefine])


            },
            moment,
            startAndEndProvinceDisabled(value) {
                return value === '全国';
            }

        },
        created() {
            this.provinces = queryConstant.PROVINCE
            this.queryType = queryConstant.QUERY_TYPE
            this.status = queryConstant.STATE
            this.define = queryConstant.DEFINE

            this.provinceNode = queryConstant.PROVINCE_NODE
            // this.form.startNode = PROVINCE_NODE[0]
            // this.form.endNode = PROVINCE_NODE[1]

            this.nodeTypes = queryConstant.NODE_TYPE
            // this.form.nodeType = NODE_TYPE[0]
            // console.log(this.provinceData[0])

            this.distanceTypes = queryConstant.DISTANCE_TYPE
            // this.form.distanceType = DISTANCE_TYPE[0]

            this.summaryMethods = queryConstant.SUMMARY_METHOD
            // this.form.summaryMethod = SUMMARY_METHOD[0]


        }
    }
</script>

<style scoped>
    #network-states-163 {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #network-states-163 h1 {
        text-align: center;
        font-size: 25px;
        color: #8392A5;
    }

</style>
