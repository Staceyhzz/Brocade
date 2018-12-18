const state = {
    navLinks: [
        {
            name: "桌面",
            url: "/desktop",
            imgClass: "desktop",
            child: []
        },
        {
            name: "报表中心",
            url: "",
            imgClass: "report-form",
            child: [
                {
                    name: "数据报表",
                    url: "/reportCenter",
                    imgClass: "",
                    child: []
                },
                {
                    name: "客户来源归类",
                    url: "/channelGroup",
                    imgClass: "",
                    child: []
                },
                {
                    name: "二级消费意向归类",
                    url: "/item",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "一级消费意向归类",
                    url: "/itemGroup",
                    imgClass: "",
                    child: []
                },
            ]
        },
        //基础信息
        {
            name: "基础信息",
            url: "",
            imgClass: "basis-info",
            child: [
                {
                    name: "来源管理",
                    url: "/channel",
                    imgClass: "",
                    child: []
                },
                {
                    name: "症状管理",
                    url: "/symptom",
                    imgClass: "",
                    child: []
                },
                {
                    name: "回访类型管理",
                    url: "/callbackCategory",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "回访组管理",
                    url: "/callbackSet",
                    imgClass: "",
                    child: []
                },
                {
                    name: "未成交类型管理",
                    url: "/failtureCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "投诉类型管理",
                    url: "/complainCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "标签管理",
                    url: "/tag",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "标签组管理",
                    url: "/tagGroup",
                    imgClass: "",
                    child: []
                },
                {
                    name: "单位管理",
                    url: "/unit",
                    imgClass: "",
                    child: []
                },
                {
                    name: "支付方式管理",
                    url: "/cardCategory",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "工具管理",
                    url: "/tool",
                    imgClass: "",
                    child: []
                },
                {
                    name: "关系管理",
                    url: "/relation",
                    imgClass: "",
                    child: []
                },
                {
                    name: "问卷模板管理",
                    url: "/survey",
                    imgClass: "",
                    child: []
                },
                {
                    name: "病历模板管理",
                    url: "/medicalRecord",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "岗位分工管理",
                    url: "/position",
                    imgClass: "",
                    child: []
                }
            ]
        },
        //系统设置
        {
            name: "系统设置",
            url: "",
            imgClass: "system-setting",
            child: [
                {
                    name: "医院管理",
                    url: "/hospital",
                    imgClass: "",
                    child: []
                },
                {
                    name: "部门管理",
                    url: "/dept",
                    imgClass: "",
                    child: []
                },
                {
                    name: "用户管理",
                    url: "/user",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "用户权限自定义",
                    url: "/userAuthCustom",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "角色管理",
                    url: "/role",
                    imgClass: "",
                    child: []
                },
                {
                    name: "系统设置",
                    url: "/option",
                    imgClass: "",
                    child: []
                },
                {
                    name: "系统日志",
                    url: "/log",
                    imgClass: "",
                    child: []
                },
                {
                    name: "账套管理",
                    url: "/setBooks",
                    imgClass: "",
                    child: []
                },
                {
                    name: "预收款项目",
                    url: "/depositCharge",
                    imgClass: "",
                    child: []
                },
                {
                    name: "代金券类型",
                    url: "/couponCategory",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "收费项目类型",
                    url: "/chargeCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "收费项目",
                    url: "/charge",
                    imgClass: "",
                    child: []
                },
                {
                    name: "套餐",
                    url: "/chargeSet",
                    imgClass: "",
                    child: []
                },
                {
                    name: "药物品属性",
                    url: "/productQuality",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "药物品类型",
                    url: "/productCategory",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "药物品",
                    url: "/product",
                    imgClass: "",
                    child: []
                },
                {
                    name: "权益管理",
                    url: "/equity",
                    imgClass: "",
                    child: []
                },
                {
                    name: "会员类型管理",
                    url: "/memberCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "项目折扣",
                    url: "/chargeDiscount",
                    imgClass: "",
                    child: []
                },
                {
                    name: "用户折扣",
                    url: "/userDiscount",
                    imgClass: "",
                    child: []
                },
                {
                    name: "打印设置",
                    url: "/print",
                    imgClass: "",
                    child: []
                },
                {
                    name: "审核规则设置",
                    url: "/auditRule",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "编辑权限",
                    url: "/manager",
                    imgClass: "",
                    child: []
                },
                {
                    name: "医生预约设置",
                    url: "/treatDoctor",
                    imgClass: "",
                    child: []
                },
                {
                    name: "咨询医生设置",
                    url: "/consultDoctor",
                    imgClass: "",
                    child: []
                },
                {
                    name: "仪器设备管理",
                    url: "/instrument",
                    imgClass: "",
                    child: []
                },
                {
                    name: "预约项目设置",
                    url: "/appointmentCharge",
                    imgClass: "",
                    child: []
                },
                {
                    name: "本地定价",
                    url: "/chargeLocal",
                    imgClass: "",
                    child: []
                },
            ]
        },
        //客户管理
        {
            name: "客户管理",
            url: "",
            imgClass: "customer",
            child: [
            {
                name: "客户管理",
                url: "/customer",
                imgClass: "",
                child: []
            },
            {
                name: "投诉记录",
                url: "/complain",
                imgClass: "",
                child: []
            },
            {
                name: "客户组管理",
                url: "/customerGroup",
                imgClass: "",
                child: [] 
            },
            {
                name: "客户选择器",
                url: "/customerFilter",
                imgClass: "",
                child: []
            },
            {
                name: "客户归属权变更",
                url: "/ownership",
                imgClass: "",
                child: []
            },
            {
                name: "生日提醒",
                url: "/birthday",
                imgClass: "",
                child: []
            }]
        },
        //顾客运营
        {
            name: "顾客运营",
            url: "",
            imgClass: "cusrfm",
            child: [
                {
                    name: "顾客运营",
                    url: "/customerRFM",
                    imgClass: "",
                    child: []
                },
                {
                    name: "RFM指标设置",
                    url: "/sliderRFM",
                    imgClass: "",
                    child: []
                },
                {
                    name: "经营指标设置",
                    url: "/dealBusiness",
                    imgClass: "",
                    child: []
                }
            ]
        },
        //医院业务
        {
            name: "医院业务",
            url: "",
            imgClass: "hospital",
            child: [
                {
                    name: "网电工作台",
                    url: "/onlineDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "回访工作台",
                    url: "/callbackDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "接待工作台",
                    url: "/frontDesk",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "接诊工作台",
                    url: "/liveDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "预约工作台",
                    url: "/appointmentToday",
                    imgClass: "",
                    child: []
                },
                {
                    name: "今日顾客动态",
                    url: "/customerDirection",
                    imgClass: "",
                    child: []
                },
                {
                    name: "价格手册",
                    url: "/chargePriceList",
                    imgClass: "",
                    child: []
                },
                {
                    name: "收银台",
                    url: "/cashierDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "科室中心",
                    url: "/deptDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "借用工作台",
                    url: "/deptBorrow",
                    imgClass: "",
                    child: []
                },
                {
                    name: "床位管理",
                    url: "/bed",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "住院工作台",
                    url: "/inpatientDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "手术工作台",
                    url: "/surgeryDesk",
                    imgClass: "",
                    child: []
                },
                // {
                //     name: "手术排班",
                //     url: "/surgeryScheduler",
                //     imgClass: "",
                //     child: [] 
                // },
                // {
                //     name: "治疗预约",
                //     url: "/treatScheduler",
                //     imgClass: "",
                //     child: []
                // },
                {
                    name: "活动设置",
                    url: "/activity",
                    imgClass: "",
                    child: []
                },
                {
                    name: "短信模板",
                    url: "/smsTemplate",
                    imgClass: "",
                    child: []
                },
                {
                    name: "短信群发",
                    url: "/smsGroup",
                    imgClass: "",
                    child: []
                },
            ]
        },
        //市场渠道
        {
            name: "市场渠道",
            url: "",
            imgClass: "market",
            child: [
            {
                name: "品牌管理",
                url: "/storeCategory",
                imgClass: "",
                child: []
            },
            {
                name: "渠道管理",
                url: "/store",
                imgClass: "",
                child: []
            },
            {
                name: "渠道负责人",
                url: "/storeManager",
                imgClass: "",
                child: []
            },
            {
                name: "佣金确认",
                url: "/commissionDesk",
                imgClass: "",
                child: [] 
            },
            {
                name: "佣金付款",
                url: "/commissionCashier",
                imgClass: "",
                child: [] 
            },
            {
                name: "市场工作台",
                url: "/marketDesk",
                imgClass: "",
                child: [] 
            },
            {
                name: "券活动",
                url: "/couponActivity",
                imgClass: "",
                child: []
            },
            {
                name: "销售回款",
                url: "/saleBack",
                imgClass: "",
                child: []
            }]
        },
        //库存管理
        {
            name: "库存管理",
            url: "",
            imgClass: "stock",
            child: [
                {
                    name: "仓库管理",
                    url: "/warehouse",
                    imgClass: "",
                    child: []
                },
                {
                    name: "供应商",
                    url: "/supplier",
                    imgClass: "",
                    child: []
                },
                {
                    name: "入库管理",
                    url: "/purchase",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "出库管理",
                    url: "/stockOut",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "采购发票",
                    url: "/invoice",
                    imgClass: "",
                    child: []
                },
                {
                    name: "退货出库",
                    url: "/return",
                    imgClass: "",
                    child: []
                },
                {
                    name: "仓库调拨",
                    url: "/allocate",
                    imgClass: "",
                    child: []
                },
                {
                    name: "库存盘点",
                    url: "/check",
                    imgClass: "",
                    child: []
                },
                {
                    name: "科室领用",
                    url: "/use",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "库存查询",
                    url: "/stock",
                    imgClass: "",
                    child: []
                },
                {
                    name: "科室发料",
                    url: "/deptStockOutDesk",
                    imgClass: "",
                    child: []
                },
                {
                    name: "库存有效期预警",
                    url: "/expiration",
                    imgClass: "",
                    child: []
                }
            ]
        },
        //日常办公
        {
            name: "日常办公",
            url: "",
            imgClass: "work",
            child: [
                {
                    name: "通讯录",
                    url: "/addressBook",
                    imgClass: "",
                    child: []
                },
                {
                    name: "班次管理",
                    url: "/shiftCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "排班录入",
                    url: "/myShift",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "全院排班表",
                    url: "/shift",
                    imgClass: "",
                    child: []
                },
                {
                    name: "发布公告",
                    url: "/notice",
                    imgClass: "",
                    child: []
                },
                {
                    name: "知识分类管理",
                    url: "/knowledgeCategory",
                    imgClass: "",
                    child: []
                },
                {
                    name: "知识管理",
                    url: "/knowledge",
                    imgClass: "",
                    child: []
                },
                {
                    name: "知识库",
                    url: "/knowledgeCenter",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "我的审核申请",
                    url: "/auditOrder",
                    imgClass: "",
                    child: []
                },
                {
                    name: "审核工作台",
                    url: "/auditOrderDesk",
                    imgClass: "",
                    child: []
                }
            ]
        },
        //微信
        {
            name: "微信",
            url: "",
            imgClass: "weixin",
            child: [
                {
                    name: "推荐人管理",
                    url: "/promoter",
                    imgClass: "",
                    child: []
                },
                {
                    name: "推荐顾客列表",
                    url: "/promoteCustomer",
                    imgClass: "",
                    child: []
                },
                {
                    name: "推荐佣金记录",
                    url: "/promoteRecord",
                    imgClass: "",
                    child: [] 
                },
                {
                    name: "佣金结算记录",
                    url: "/promoteRebate",
                    imgClass: "",
                    child: []
                },
                {
                    name: "验证码",
                    url: "/verifyMessage",
                    imgClass: "",
                    child: []
                }
            ]
        },
        {
            name: "呼叫中心",
            url: "",
            imgClass: "callCenter",
            child: [
                {
                    name: "总机管理",
                    url: "/callHospChoose",
                    imgClass: "",
                    child: []
                },
                {
                    name: "通话记录",
                    url: "/callCenterLog",
                    imgClass: "",
                    child: []
                }
            ]
        },
        
    ]
}
const getters = {
    navLink: function (state) {
        return state.navLinks;
    }
};


export default {
    state,
    getters
}
