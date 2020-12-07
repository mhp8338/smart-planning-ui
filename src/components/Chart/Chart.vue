<template>
    <div ref="chartDom"></div>
</template>

<script>
    import echarts from "echarts/lib/echarts";
    // import "echarts/lib/chart/bar";
    // import "echarts/lib/chart/line";
    // import "echarts/lib/component/title";
    import "echarts"
    import 'echarts/map/js/china'

    import debounce from "lodash/debounce";
    import {addListener, removeListener} from "resize-detector";

    export default {
        props: {
            option: {
                type: Object,
                // default: () => {}
            }
        },
        // 监听option
        watch: {
            option(val) {
                this.chart.setOption(val);
            }
            // option: {
            //   handler(val) {
            //     this.chart.setOption(val);
            //   },
            //   deep: true
            // }
        },
        created() {
            this.resize = debounce(this.resize, 300);
        },
        mounted() {
            // 绘制图表
            this.renderChart();
            // 监听添加事件
            addListener(this.$refs.chartDom, this.resize);
        },
        beforeDestroy() {
            // 销毁组件，防止内存泄漏
            removeListener(this.$refs.chartDom, this.resize);
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            resize() {
                console.log("resize");
                this.chart.resize();
            },
            renderChart() {
                // 基于准备好的dom，初始化echarts实例
                this.chart = echarts.init(this.$refs.chartDom);
                this.chart.setOption(this.option, true);
                this.chart.on('click', (params) => {
                    this.$emit('click-data',params.name)
                    // console.log(params.name)

                })
            }
        }
    };
</script>

<style></style>
