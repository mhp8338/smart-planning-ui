<template>
    <div id="basic-form">
        <h1>流量现状分析与预测结果分析</h1>
        <a-form-model
                :rules="formRules"
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                ref="form"
                v-if="showForecastForm">
            <!--            历史数据-->
            <a-form-model-item label="历史数据">
                <!--                <input type="file" @change="getFile($event)"/>-->
                <a-upload :file-list="form.historyFileList"
                          :remove="removeHistoryFile"
                          :before-upload="beforeUploadHistoryFile">
                    <a-button>
                        <a-icon type="upload"/>
                        Select File
                    </a-button>
                </a-upload>
                <!--                <a-button-->
                <!--                        type="primary"-->
                <!--                        :disabled="form.historyFileList.length === 0"-->
                <!--                        :loading="uploadingHistoryFile"-->
                <!--                        style="margin-top: 16px"-->
                <!--                        @click="uploadHistoryFile"-->
                <!--                >-->
                <!--                    {{ uploadingHistoryFile ? 'Uploading' : 'Start Upload' }}-->
                <!--                </a-button>-->
            </a-form-model-item>
            <!--            分摊流量矩阵-->
            <a-form-model-item label="分摊流量矩阵">
                <a-upload :file-list="form.flowMatrixFileList"
                          :remove="removeFlowMatrixFile"
                          :before-upload="beforeUploadFlowMatrixFile">
                    <a-button>
                        <a-icon type="upload"/>
                        Select File
                    </a-button>
                </a-upload>
            </a-form-model-item>
            <a-form-model-item label="预测月份" prop="monthNum" has-feedback>
                <a-input v-model.number="form.monthNum" suffix="month"/>
            </a-form-model-item>
            <a-form-model-item label="省间矩阵存储文件夹" prop="filePath">
                <a-input v-model="form.filePath" placeholder="C:\Users\comeo\Desktop\流量预测\历史数据"></a-input>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">
                    预测分析
                </a-button>
                <a-button style="margin-left: 10px;" @click="resetForm('form')">
                    重置
                </a-button>
            </a-form-model-item>
        </a-form-model>
        <!--        加载中-->
        <a-spin tip="预测中。。。" size="large" class="loading" v-if="showLoading">
        </a-spin>
        <!--        结果展示-->
        <div v-if="showResult">
            <forecast-result :forecast-data="forecastResult"></forecast-result>
        </div>

    </div>
</template>
<script>
    import request from "../../utils/request";
    import form from "../../store/modules/form";
    import ForecastResult from "./ForecastResult";

    export default {
        components: {ForecastResult},
        data() {
            // 验证月份数
            const checkMonthNum = (rule, value, cb) => {
                if (!value) {
                    return cb(new Error('Please input the age'));
                }
                if (!Number.isInteger(value)) {
                    return cb(new Error('Please input digits'));
                } else {
                    if (value > 60 || value <= 0) {
                        return cb(new Error('请输入大于0小于60的合法数据'))
                    } else {
                        return cb()
                    }
                }

            };
            return {
                labelCol: {span: 4},
                wrapperCol: {span: 14},
                form: {
                    monthNum: 56,
                    filePath: '',
                    // 历史数据
                    historyFileList: [],
                    //分摊流量矩阵
                    flowMatrixFileList: [],
                },
                formRules: {
                    monthNum: [
                        {required: true, validator: checkMonthNum, trigger: 'blur'}
                    ],
                    filePath: [
                        {required: true, message: '请输入省间矩阵存储文件夹', trigger: 'blur'}
                    ]
                },
                uploadingHistoryFile: false,
                uploadingFlowMatrixFile: false,
                //展示控制变量
                showForecastForm: true,
                showLoading: false,
                showResult: false,
                // 预测结果数据
                forecastResult: undefined
            };
        },
        methods: {
            // 历史数据
            removeHistoryFile(file) {
                const index = this.form.historyFileList.indexOf(file);
                const newFileList = this.form.historyFileList.slice();
                newFileList.splice(index, 1);
                this.form.historyFileList = newFileList;
            },
            beforeUploadHistoryFile(file) {
                this.form.historyFileList = [...this.form.historyFileList, file];
                // console.log(this.form.historyFileList)
                return false;
            },
            // uploadHistoryFile() {
            //
            //     const formData = new FormData();
            //     this.form.historyFileList.forEach(file => {
            //         formData.append('files[]', file);
            //     });
            //     this.uploadingHistoryFile = true;
            //     console.log(formData.values().next())
            //     // You can use any AJAX library you like
            //     reqwest({
            //         url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            //         method: 'post',
            //         processData: false,
            //         data: formData,
            //         success: () => {
            //             this.form.historyFileList = [];
            //             this.uploadingHistoryFile = false;
            //             this.$message.success('upload successfully.');
            //         },
            //         error: () => {
            //             this.uploadingHistoryFile = false;
            //             this.$message.error('upload failed.');
            //         },
            //     });
            // },

            // 分摊流量矩阵
            removeFlowMatrixFile(file) {
                const index = this.form.flowMatrixFileList.indexOf(file);
                const newFileList = this.form.flowMatrixFileList.slice();
                newFileList.splice(index, 1);
                this.form.flowMatrixFileList = newFileList;
                // console.log(this.form.flowMatrixFileList)
            },
            beforeUploadFlowMatrixFile(file) {
                this.form.flowMatrixFileList = [...this.form.flowMatrixFileList, file];
                // console.log(this.form.flowMatrixFileList)
                return false;
            },
            // uploadFlowMatrixFile() {
            //     const formData = new FormData();
            //     this.form.flowMatrixFileList.forEach(file => {
            //         formData.append('files[]', file);
            //     });
            //     this.uploadingFlowMatrixFile = true;
            //     console.log(formData.values().next())
            //     // You can use any AJAX library you like
            //     reqwest({
            //         url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            //         method: 'post',
            //         processData: false,
            //         data: formData,
            //         success: () => {
            //             this.form.flowMatrixFileList = [];
            //             this.uploadingFlowMatrixFile = false;
            //             this.$message.success('upload successfully.');
            //         },
            //         error: () => {
            //             this.form.uploadingFlowMatrixFile = false;
            //             this.$message.error('upload failed.');
            //         },
            //     });
            // },
            //重置表单
            resetForm(formName) {
                this.removeHistoryFile()
                this.removeFlowMatrixFile()
                this.$refs[formName].resetFields();
            },
            //打包发送
            package: function () {
                const formData = new FormData();
                this.form.historyFileList.forEach(file => {
                    formData.append('historyFileList[]', file);
                });
                this.form.flowMatrixFileList.forEach(file => {
                    formData.append('flowMatrixFileList[]', file);
                });
                formData.append('monthNum', this.form.monthNum)
                formData.append('filePath', this.form.filePath)
                return formData;
            },
            //提交表单
            onSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (!valid) return this.$message.error('请完成所需项填写');
                    // const {data: res} = await this.$http.post('as/', this.form);
                    const formData = this.package();
                    // 更改页面状态
                    this.resetForm('form')
                    this.showForecastForm = false
                    this.showLoading = true
                    const res = await request({
                        url: "/api/forecast/result3_1/",
                        method: "POST",
                        data: formData
                    });
                    this.showLoading = false
                    this.showResult = true

                    //模拟延迟
                    // clearTimeout(this.timer);  //清除延迟执行
                    // this.timer = setTimeout(()=>{   //设置延迟执行
                    //     this.showLoading = false
                    // },1000);
                    // this.timer = setTimeout(()=>{   //设置延迟执行
                    //     this.showResult = true
                    // },1000);
                    if (res.status !== 200) return this.$message.error('预测失败')
                    this.$message.success('预测成功')
                    this.forecastResult = res.data

                    this.$parent.$emit('change-collapse')


                    // console.log(formData)


                });
            }

        }
    };
</script>
<style>
    #basic-form {
        position: relative;
        width: 100%;
        height: 100%;

    }

    #basic-form h1 {
        text-align: center;
        font-size: 25px;
        color: #8392A5;
    }

    .loading {
        position: absolute;
        bottom: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
    }


</style>
