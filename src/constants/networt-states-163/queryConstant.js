export const QUERY_TYPE = ['带宽', '流量', '路由']
export const PROVINCE = ['全国', '安徽', '北京', '福建', '甘肃', '广东', '广西',
    '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西',
    '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '天津', '西藏', '新疆',
    '云南', '浙江', '重庆', '台湾']
export const STATE = ['运行态', '规划态']
export const DEFINE = ['省内', '省间(全国)', '省间', '出省', 'A-D', 'ChinaNet_C-E', 'ChinaNet_Node_To_Node', 'ChinaNet_C-I',
    'ChinaNet_C-S', 'Demand_Routing_Path', 'Edge_Routing_Demands', 'Edge_Distance', 'Edge_Resource_Distance', 'Demand_Routing_Path_Distance']
export const DEFINE_BANDWIDTH = ['省内', '省间(全国)', '省间', '出省', 'ChinaNet_C-E', 'ChinaNet_Node_To_Node', 'ChinaNet_C-I',
    'ChinaNet_C-S']
export const DEFINE_FLOW = ['省内', '省间(全国)', '省间', '出省', 'A-D', 'ChinaNet_C-E', 'ChinaNet_Node_To_Node', 'ChinaNet_C-I',
    'ChinaNet_C-S']
export const DEFINE_ROUTE = ['Demand_Routing_Path', 'Edge_Routing_Demands', 'Demand_Routing_Path_Distance', 'Edge_Distance', 'Edge_Resource_Distance']

export const PROVINCE_NODE = ['成都C', '广州C']
export const NODE_TYPE = ['A_D', 'MAN-D', 'IDC-D']
export const DISTANCE_TYPE = ['Fiber', 'Geo', 'Resource']
export const SUMMARY_METHOD = ['最大值', '平均值']


// map映射
export const Content_Map = {'带宽': 'Bandwidth', '流量': 'Traffic', '路由': 'Routing'}

export const Status_Map = {'运行态': 'Running', '规划态': 'Modeling'}

export const Definition_Map = {
    '省内': 'ChinaNet_IntraProvince',
    '省间(全国)': 'ChinaNet_InterProvince',
    '省间': 'ChinaNet_Province_To_Province',
    '出省': 'Province_Out',
    'A-D': 'ChinaNet_Province_AD',
    'ChinaNet_C-E': 'ChinaNet_C-E',
    'ChinaNet_Node_To_Node': 'ChinaNet_Node_To_Node',
    'ChinaNet_C-I': 'ChinaNet_C-I',
    'ChinaNet_C-S': 'ChinaNet_C-S',
    'Demand_Routing_Path': 'Demand_Routing_Path',
    'Edge_Routing_Demands': 'Edge_Routing_Demands',
    'Edge_Distance': 'Edge_Distance',
    'Edge_Resource_Distance': 'Edge_Resource_Distance',
    'Demand_Routing_Path_Distance': 'Demand_Routing_Path_Distance'
}


export const Type_Map = {'A_D': 'A_D', 'MAN-D': 'MAN-D', 'IDC-D': 'IDC-D'}


export const PROVINCES_OF_CHINA_Map = {
    '请选择': '',
    '全国': 'CN',
    '安徽': 'AH',
    '北京': 'BJ',
    '福建': 'FJ',
    '甘肃': 'GS',
    '广东': 'GD',
    '广西': 'GX',
    '贵州': 'GZ',
    '海南': 'HI',
    '河北': 'HE',
    '河南': 'HA',
    '黑龙江': 'HL',
    '湖北': 'HB',
    '湖南': 'HN',
    '吉林': 'JL',
    '江苏': 'JS',
    '江西': 'JX',
    '辽宁': 'LN',
    '内蒙古': 'NM',
    '宁夏': 'NX',
    '青海': 'QH',
    '山东': 'SD',
    '山西': 'SX',
    '陕西': 'SN',
    '上海': 'SH',
    '四川': 'SC',
    '天津': 'TJ',
    '西藏': 'XZ',
    '新疆': 'XJ',
    '云南': 'YN',
    '浙江': 'ZJ',
    '重庆': 'CQ',
    '台湾': 'TW'
}

export const DistanceType_Map = {'Fiber': 'Fiber', 'Geo': 'Geo', 'Resource': 'Resource'}

export const Summarized_Method_Map = {'最大值': 'Max', '平均值': 'Average'}





