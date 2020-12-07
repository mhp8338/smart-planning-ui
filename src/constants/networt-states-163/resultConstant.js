/* eslint-disable */
export const NEIGHBOR = 'neighbors'
export const CIRCUITS = 'circuits'
export const TABLE_DATA_COLUMNS_EXCLUDE = ['sinkASN', 'sourceASN']
export const SUMMARY_PARAM_EXCLUDE = ['date', 'circuits', 'Date', 'data', 'DistanceType', 'Demands', 'Order']
export const TABLE_SORT = ['capacity_G', 'traffic_in_G', 'traffic_out_G', 'circuitNumber', 'Share', 'Traffic', 'value_G','resource_distance']

export const CAT = ["IDC", "上海", "浙江", "江苏", "广东", "北京", "四川", "河北", "山西", "吉林", "辽宁", "黑龙江 ", "陕西", "甘肃", "青海", "山东", "福建", "河南", "湖北", "湖南", "江西", "安徽", "海南", "贵州", "云南", "广西", "天津", "重庆", "内蒙古 ", "新疆", "宁夏", "西藏"];
export const CAT_COMPARE = [{"IDC": ["北京IDC", "天津IDC", "石家庄IDC", "廊坊IDC", "重庆IDC", "成都IDC", "中卫IDC", "呼和浩特云", "贵阳云", "贵州云IDC", "呼和浩特IDC", "内蒙古IDC", "东莞IDC"]},
    {"广东": ["广州C", "广州C2", "广州I", "广州E-低速", "广州E", "广州S", "深圳C", "深圳D", "深圳S"]},
    {"北京": ["北京E-低速", "北京E", "北京S", "北京I", "北京C"]},
    {"上海": ["上海C", "上海E-低速", "上海E", "上海S", "上海I", "上海MAN"]},
    {"江苏": ["南京C", "南京E", "南京S", "无锡C", "无锡D", "南通MAN"]},
    {"湖北": ["武汉C", "武汉E", "武汉C2", "武汉S"]},
    {"浙江": ["金华C", "金华D", "杭州C", "杭州E", "杭州S"]},
    {"陕西": ["西安C", "西安E", "西安S"]},
    {"四川": ["成都C", "成都E", "成都C2"]},
    {"重庆": ["重庆C", "重庆E", "重庆D"]},
    {"河北": ["石家庄C", "雄安MAN", "唐山D"]},
    {"河南": ["河南D", "郑州E", "三门峡MAN"]},
    {"贵州": ["贵州D", "贵阳E"]},
    {"福建": ["福建D", "福州E"]},
    {"宁夏": ["宁夏MAN", "宁夏MAN2", "银川MAN"]},
    {"辽宁": ["辽宁D", "沈阳E"]},
    {"湖南": ["湖南D"]},
    {"江西": ["江西D"]},
    {"安徽": ["安徽D", "蚌埠MAN"]},
    {"广西": ["广西D"]},
    {"天津": ["天津C"]},
    {"甘肃": ["甘肃D"]},
    {"云南": ["云南D"]},
    {"山东": ["山东D"]},
    {"山西": ["山西D"]},
    {"海南": ["海南MAN"]},
    {"内蒙古": ["内蒙古D"]},
    {"黑龙江": ["黑龙江D"]},
    {"吉林": ["吉林D"]},
    {"辽宁": ["辽宁D"]},
    {"青海": ["青海MAN", "西宁MAN"]},
    {"西藏": ["西藏D"]},
    {"新疆": ["新疆D"]},
];

//没有数据
export const NO_DATA_DEFINE = ['Demand_Routing_Path']
// 没有TOPO
export const NO_TOPO_DEFINE = ['Edge_Resource_Distance', 'Edge_Distance', 'Demand_Routing_Path_Distance']
//没有Table
export const NO_TABLE_DEFINE = ['Edge_Distance', 'Demand_Routing_Path_Distance']
export const QUERY_CONTENT_KEY = ['查询类型', '状态', '查询定义-流量', '查询定义-带宽', '查询定义-路由', '节点类型', '起始时间', '结束时间',
    '省份', '起始省份', '终止省份', '省份(包括全国)', '起始节点', '终止节点', '距离类型', '总结方法']

//流量省间-全国
