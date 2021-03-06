﻿# guarderp

> guardErp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## update_log :
``` bash
# 3.11.5
修复部分Bug

# 3.11.4
修复部分Bug

# 3.11.3
修复部分Bug

# 3.11.2
完成渠道商模块

# 3.11.1
完成渠道商图谱

# 3.11.0
完成基础设置

# 3.10.2
修复入会状态错误

# 3.10.1
修复部分Bug

# 3.10.0
新增微信分销

# 3.9.9
取消客户档案联系方式失焦保存

# 3.9.8
修复电子病例模板排列显示错误

# 3.9.7
新增医院维度券明细报表
新增客户查询导出
修复系统设置中短信服务设置时，密码长度限制过短

# 3.9.6
取消部位模板管理

# 3.9.5
修复部分Bug

# 3.9.4
完成电子病例

# 3.9.3
新增crm表单

# 3.9.2
调试接口

# 3.9.1
新增病例模板元件设置

# 3.9.0
新增病例模板管理

# 3.8.3
修复客户档案修改手机号码的错误提示信息

# 3.8.2
完善快捷搜索组件

# 3.8.1
修复预约工作台切换用户时数据不正确

# 3.8.0
新增今日顾客入口

# 3.7.5.5
修复无法发送短信群发自定义信息

# 3.7.5.4
修复客户档案无法发送短信自定义信息

# 3.7.5.3
修复翻译错误导致客户档案无法拨打电话

# 3.7.5.2
修复补划扣时间问题
修复客户档案loading显示问题

# 3.7.5.1
修复积分没有保留2位小数
客户档案渠道来源取消限制
修复文字错误

# 3.7.5
修复结算记录合计没有保留2位小数
修复添加新用户时，输入手机号与字符串的区分
修复渠道商佣金明细表无法显示佣金比例为0

# 3.7.4
修复部分样式

# 3.7.3.6
完成迭代

# 3.7.3.5
完善无限滚动组件，由父组件控制数据列
修改部位模板为追踪模板

# 3.7.3.4
完成项目单无限滚动重构

# 3.7.3.3
完成无限滚动重构

# 3.7.3.2
完善无限滚动demo

# 3.7.3.1
搭建无限滚动demo

# 3.7.2
修复医院到诊明细（前台）页面无法显示数据

# 3.7.1.2
修复客户权限添加判断错误

# 3.7.1.1
修复照片查看时旋转和放大缩小不能同时改变

# 3.7.1
完善照片管理，新增旋转下载功能
修复多标签页的情况下，实时翻译功能没有共享
修复当没有客户管理菜单时，无法访问有权限客户的档案

# 3.7.0.28
完成3.7

# 3.7.0.27
修复部分Bug

# 3.7.0.26
完成翻译审核信息

# 3.7.0.25
完成翻译未成交

# 3.7.0.24
重构退项目

# 3.7.0.23
修复部分bug

# 3.7.0.22
完成翻译效果追踪

# 3.7.0.21
完成翻译预收款

# 3.7.0.20
完成翻译至手术预约

# 3.7.0.19
完成效果追踪模块

# 3.7.0.18
修复桌面信息提示框样式层级不够导致被隐藏
修复用户弹窗选择信息无法显示
优化菜单列表，新增a标签，可以右键打开新页面

# 3.7.0.17
修改部分报表字段
使用绝对路径管理静态编辑器

# 3.7.0.16
优化效果追踪
完成翻译至问卷管理
修改接诊报表

# 3.7.0.15
完成效果追踪模板逻辑页面处理
优化添加短信群发的编辑页面

# 3.7.0.14
完成客户档案翻译至添加回访

# 3.7.0.13
完成客户档案翻译至添加咨询

# 3.7.0.12
单独提取重构iview的数字输入框，修复数字输入框在表格中的双向绑定，等待官方更新

# 3.7.0.11
完成客户档案翻译至扣减积分

# 3.7.0.10
完成客户档案页面翻译
修复客户档案无法添加标签

# 3.7.0.9
重构客户档案页面
完成客户查询页面翻译

# 3.7.0.8
重构客户查询页面

# 3.7.0.7
优化照片管理列表

# 3.7.0.6
暂时用transfer解决日期选择器无法操作年月

# 3.7.0.5
修复部分bug

# 3.7.0.4
修复报表菜单权限bug

# 3.7.0.3
重构左侧菜单栏

# 3.7.0.2
完成重构错误页面

# 3.7.0.1
重构错误页面和404页面，分离2种不同情况
重构页面首次加载判断，增加错误信息展示

# 3.7.0.0
升级iview版本
优化收费项目类型、药物品类型操作，更改为树型结构
重构权限判断，改为前端控制路由生成

# 3.6.2
修复富文本编辑器资源路径错误导致无法使用

# 3.6.1
修复选择弹窗选择用户在分院权限下无法显示数据

# 3.6.0.76
更换获取帮助为阿里

# 3.6.0.75
修复接待工作台文字错误

# 3.6.0.74
修复佣金确认中无法查询渠道信息
修复选择用户组件信息没有及时更新
修复药物品文字信息错误

# 3.6.0.73
回退顾客接诊

# 3.6.0.72
修复顾客接诊bug

# 3.6.0.71
修复新版表格合并重复Key引发的假死
修复韩文翻译字段错误

# 3.6.0.70
重构登入界面

# 3.6.0.69
新增登录页面广告系统

# 3.6.0.68
修复用户管理编辑时无法显示部门

# 3.6.0.67
新增门诊接诊报表中每日统计图表

# 3.6.0.66
完善门诊接诊

# 3.6.0.65
修复添加新客户时，会多一次请求地区接口
完成门诊接诊

# 3.6.0.64
修复客户档案下拉样式适配
修复顾客接诊显示问题

# 3.6.0.63
完成客户档案下拉导航重构

# 3.6.0.62
修复部分Bug

# 3.6.0.61
完成医院业务翻译

# 3.6.0.60
完成活动管理翻译

# 3.6.0.59
完成至短信模板

# 3.6.0.58
完成借用工作台

# 3.6.0.57
完成科室中心翻译

# 3.6.0.56
完成收银台翻译
完成科室中心列表翻译

# 3.6.0.55
翻译预收款收银

# 3.6.0.54
修复部分bug
完成接诊工作台

# 3.6.0.53
翻译前台接待

# 3.6.0.52
翻译回访工作台

# 3.6.0.51
修复系统设置翻译bug

# 3.6.0.50
完成基础信息韩语文件导入

# 3.6.0.49
完成系统设置的翻译

# 3.6.0.48
翻译完成审核规则

# 3.6.0.47
翻译完成用户折扣

# 3.6.0.46
再次重构翻译方法
翻译完成药物品

# 3.6.0.45
重构翻译方法

# 3.6.0.44
重构翻译方法
翻译至药物品列表

# 3.6.0.43
重构收银台

# 3.6.0.42
修改部分bug

# 3.6.0.41
完成基础信息翻译

# 3.6.0.40
完成翻译接口调试

# 3.6.0.39
完成至套餐翻译

# 3.6.0.38
完成至收费项目管理翻译

# 3.6.0.37
完成顾客接诊报表及翻译

# 3.6.0.36
完成至预收款翻译
调试顾客接诊接口

# 3.6.0.35
完成系统设置翻译

# 3.6.0.34
完成系统设置优化
优化查询样式
修复部分新报表Bug

# 3.6.0.33
优化系统设置

# 3.6.0.32
调试接口

# 3.6.0.31
完善报表搜索样式

# 3.6.0.30
完善报表搜索权限，支持点击空白关闭

# 3.6.0.29
完成第五张表的翻译及调试
完善报表权限判断
修复微信添加新客户显示已禁用咨询项目
修复接诊工作台重复添加订单出错

# 3.6.0.28
完成第四张表的翻译及调试

# 3.6.0.27
修复还款记录字段错误

# 3.6.0.26
整理客户权限翻译

# 3.6.0.25
完成第三张报表调试及翻译

# 3.6.0.24
重新至用户管理

# 3.6.0.23
重新调整翻译结构

# 3.6.0.22
完成报表1翻译

# 3.6.0.21
完成报表1导出

# 3.6.0.20
完成基础信息翻译整理

# 3.6.0.19
调试第一张报表

# 3.6.0.18
整理翻译结构，分模块提取

# 3.6.0.17
完成未成交类型到支付方式管理的翻译整理

# 3.6.0.16
完成桌面、来源管理、症状管理、回访类型管理、回访组管理翻译整理

# 3.6.0.15
完成导航菜单翻译

# 3.6.0.14
引入国际化插件

# 3.6.0.13
完成登入与收藏报表接口调试

# 3.6.0.12
完成新版本报表权限设置
完成新版报表中心

# 3.6.0.11
完成20-25

# 3.6.0.10
完成到回访统计

# 3.6.0.9
完成到账号余额报表

# 3.6.0.8
完成1-6报表

# 3.6.0.7
优化单元格合并函数，封装复杂表格

# 3.6.0.6
优化收费项目弹窗组件

# 3.6.0.5
完善金额体验
增加mock插件自定义后台数据

# 3.6.0.4
搭建顾客还款界面页面

# 3.6.0.3
搭建接诊流失率分析页面
封装金额不换行方法

# 3.6.0.2
搭建接诊流失率分析页面

# 3.6.0.1
整理新版报表模块，封装公共部分
搭建接诊流失分析页面

# 3.5.2.2
修复意向识别当删除诸侯一条数据时，页面没有及时更新

# 3.5.2.1
修复标签组管理提示语没有及时更新
修复接诊工作台中，客户信息不正确

# 3.5.2.0
修复集团在预约工作台中无法操作子机构
完善预约工作台数据显示，增加预约码和病历号

# 3.5.1.0
修复医院划扣记录报表导出数据不正确
修复当删除最后一个数据时，意向分类和消费意向没有重置

# 3.5.0.32
修复导航栏展开缩小时，预约工作台自适应

# 3.5.0.31
修复导航栏展开缩小时，图表没有自适应

# 3.5.0.30
取消当首页隐藏模块时的模块编辑按钮，防止图表显示出错

# 3.5.0.29
修改首页样式，调整图表金额显示

# 3.5.0.28
修改首页样式，调整图表label设置

# 3.5.0.27
新增项目订单打印时可以选择不显示折扣

# 3.5.0.26
修改成交率的计算，最大值为100%

# 3.5.0.25
修复出库入库单金额合计不一致

# 3.5.0.24
修复客户档案中，登记日期和出诊日期显示错误
修复导航栏层级不够被部分组件挡住

# 3.5.0.23
修复收银记录点击打印出错

# 3.5.0.22
修复部分字段大小写bug
取消门诊指标中在消费的编辑

# 3.5.0.21
修复部分字段大小写bug

# 3.5.0.20
修复图表首次加载时，大小显示不正确

# 3.5.0.19
新增回访图表提示

# 3.5.0.18
修复部分bug
修复预约工作台集团账户无法查看其它子机构

# 3.5.0.17
修复部分bug

# 3.5.0.16
新增客户档案、前台接待、收银台的表格自适应

# 3.5.0.15
修复价格隐藏bug

# 3.5.0.14
新增燃尽线

# 3.5.0.13
新增RFM全选功能

# 3.5.0.12
线上订单新增退款中、退款成功2中支付状态
完成RFM

# 3.5.0.11
调试顾客运营接口
修复部分bug
优化标签弹窗选择接口，支持单选、多选以及禁用和全部可选

# 3.5.0.10
调试rfm接口
修复active复用时，部分字段需提前加载

# 3.5.0.9
修复消息不能标记为已读
完善项目消费类报表，新增未分类
修复当隐藏价格时，部分报表价格不显示
修复f值拖动不正确，f值改为1-100
修复预约工作台资料面板距离过大
完成rfm客户查询页面

# 3.5.0.8
修复部分bug

# 3.5.0.7
完成经营指标接口

# 3.5.0.6
调试经营指标接口

# 3.5.0.5
完成顾客运营

# 3.5.0.4
完成经营指标设置

# 3.5.0.3
封装拖拽排序组件

# 3.5.0.2
完成RMF指标和成交指标页面

# 3.5.0.1
RMF指标

# 3.5.0.0
新增角色和用户的价格查看权限设置

#3.4.1.0
完善客户档案添加回访提醒时，没有默认绑定自己
完善搜索后退保存结果，减少初次加载时重复请求
修复关于我们字段错误
修复医院科室领用明细中查询用户后，无法重置查询用户
修复客户档案、接诊工作台添加咨询意向时，出现已禁用咨询项目

# 3.4.0.31
修复添加入库和修改划扣耗材页面高度不够，导致显示不全

# 3.4.0.30
修复客户管理编辑地区为必填项

# 3.4.0.29
完善收银项目中，没有预收款和代金券的提示
完善表格没有数据的样式
修复无法添加入库

# 3.4.0.28
调整图标和去除圆角按钮

# 3.4.0.27
调整页面结构
修复表格中文字输入框在聚焦时判断错误

# 3.4.0.26
完善退药物品操作界面，新增已退次数
修复药物品、收费项目可售停售的中文显示

# 3.4.0.25
新增来电弹屏

# 3.4.0.24
修改字体样式
修复修改客户名称后，客户档案名称不同步
修复市场工作台、网店工作台表格中显示出html标签

# 3.4.0.23
修复部分Bug

# 3.4.0.22
修复部分Bug

# 3.4.0.21
完善收银列表、收费项目、药物品、市场渠道，支持回退保存查询数据
修复打开档案新窗口时，面包屑客户名字不一致

# 3.4.0.20
完善收费项目，支持统一定价和区域定价

# 3.4.0.19
调整左侧菜单栏
完善导诊明细表，增加初次上门、成交时间，修复医院报表可以选择其他医院用户
完善收银明细表，增加结算维度，修复刷卡金额对应错误
完善回访工作台，同步查看权限与客服档案一致

# 3.4.0.18
呼叫中心权限设置

# 3.4.0.17
新增通话记录

# 3.4.0.16
新增呼叫中心创建流程

# 3.4.0.15
新增客户档案小图标拨号

# 3.4.0.14
调试接口

# 3.4.0.13
新增呼叫中心前三步骤

# 3.4.0.12
新增呼叫中心主结构

# 3.4.0.11
修复预约划扣没有显示医生

# 3.4.0.10
修复预约工作台时间端范围超出1天
完善客户今日动态，新增实时动态和今日历史动态

# 3.4.0.9
完善富文本编辑器，支持打印中表格样式可自己调整，同步页面中打印显示与富文本内容一致
完成重构预约

# 3.4.0.8
修复客户选择器重条件查询时，积分与净收总额冲突
新增线上订单与线上订单划扣

# 3.4.0.7
修复预约工作台bug
修复系统日志没有数据
修复知识库没有详情连接

# 3.4.0.6
修复预约工作台bug
完善系统设置的预约时间限制

# 3.4.0.5
完成预约工作台
完善客户档案添加咨询、手术预约时，必须选择医生
完善批量排班操作，支持覆盖、添加、排序

# 3.4.0.4
修复查看借用归还单合计没有显示2位小数
修复科室中心本人用户初始没有展示数据

# 3.4.0.3
完成新版咨询预约、手术预约

# 3.4.0.2
完成新版治疗预约

# 3.4.0.1
新增治疗预约

# 3.3.0.41
调整主结构样式
完善查看借用单，新增已归还数量字段
完善报表导出，增加导出权限
完善客户档案，支持后退保存数据
修复回访工作台可以看见手机资料
修复集团到诊明细、医院到诊明细的查询提示
修复客户档案中客户间关系显示不正确
修复接诊工作台中咨询意向在删除咨询项目时顺序错乱
修复添加订单，当套餐含有项目时，先添加套餐之后，添加不了项目

# 3.3.0.40
修复药物品无法导出
完善回访工作台，支持后退保存数据

# 3.3.0.39
修复知识管理、公告管理长数字英文不换行

# 3.3.0.38
修复接诊工作台订单数量较多选择医生的时候医生显示不完整
修复审核申请中原因字段错误
修复添加审核规则的多级审核时，无法正确清空不同级别审核
修改套餐时间限制字段
重新调整主结构样式

# 3.3.0.37
修复批量设置排班人员可以添加没有权限的人员

# 3.3.0.36
新增当用户添加进货单，失效日期早于进货日期的提示
新增从价格手册添加项目时，当有重复项目时会有提示信息
完善编辑权限的查询体验
完善登录界面回车操作
修复当用户没有医护人员权限时，还能添加本人划扣
修复用户没有权限查看联系方式时，在客户档案和接诊工作台依然可以看到

# 3.3.0.35
修复医生预约设置编辑报错时，初始验证无法通过
修复编辑权限时，当删除出单用户权限改变时，页面没有更新

# 3.3.0.34
完善券活动提示信息
完善审核规则回车搜索操作
完善客户归属权回车搜索操作
去除添加回访计划的弹窗底部按钮
修复客户档案中添加回访计划时，当修改起始时间，计划时间没有更新
修复预约项目提示信息错误
修复库存有效期预警中，有效期天数显示不正确
修复代金卷编辑标题信息错误

# 3.3.0.33
修复库存有效期预警

# 3.3.0.32
修复部分报表字段

# 3.3.0.31
修复部分报表字段

# 3.3.0.30
完善套餐设置，套餐项目价格可设置为0，项目不可重复添加
修复客户档案查看项目订单详情时，项目编号显示错误
修复出入库明细、报表的出库明细中的时间字段显示错误
新增报表的出库明细中借用归还出库类型

# 3.3.0.29
修复部分搜索按回车无法搜索
修复通过价格手册添加套餐时报错
修复医院入库和领用报表的时间字段显示错误
优化客户组和活动设置的系统提示

# 3.3.0.28
完善收银结算合计
修复客户档案下拉菜单权限被关闭后还能显示

# 3.3.0.27
完善收银结算合计，新增未结算欠款合计
修复接待工作台中客户详细内容出现标签
修复套餐拼音码搜索字段错误

# 3.3.0.26
新增系统过期时长提示

# 3.3.0.25
优化部分输入和查询限制
修复部分字段错误

# 3.3.0.24
优化部分输入和查询限制
修复部分字段错误

# 3.3.0.23
优化下拉过滤组件,减少重复请求,支持中文、拼音、首字母三种搜索
优化渠道品牌信息选择，从弹窗替换成快捷搜索

# 3.3.0.22
优化渠道信息选择，从下拉框替换成快捷搜索
优化照片管理查看，新增放大缩小拖拽
新增收费项目导出

# 3.3.0.21
优化客户档案中的照片查看，新增原图预览
优化来源信息选择，从下拉框替换成快捷搜索
图片上传大小提升为10M
开放右侧滚动条
取消标签页切换动画，修复标签页高度互相影响
修复价格手册当重置时，已选中的树型节点没有重置
修复重新登录时没有清空数据缓存

# 3.3.0.20
完善商品的编辑创建，限制拼音码格式，限制商品名称的编辑
修复治疗预约当数据过少时，列表显示错位
修复问卷编辑题目内容没有显示标签

# 3.3.0.19
完善套餐，新增套餐类型
完善添加订单，支持百分比和金额输入
完善出库明细，新增查看入口
完善客户动态，区分未上门的预约类型
优化客户档案显示备注内容
修复仓库列表在部分字段下不显示
修复部分字段错误

# 3.3.0.18
修复部分错误字段
修复价格手册分页显示不正确
完善入库明细，新增查看接口
完善退预收款操作，区分退金额和口预收款
完善收费项目和药物品，禁止编辑名称和打印名称

# 3.3.0.17
修复收银结算刷卡金额统计不正确

# 3.3.0.16
新增进货入库与打印
修复部分字段
修复当只有一个输入框时，按下回车会自动刷新页面

# 3.3.0.15
修复登记新客户时备注字数限制
修复一二级消费意向的输入框体验
>>>>>>> prod

# 3.3.0.14
修复部分字段

# 3.3.0.13
新增价格手册
完善接诊添加订单

# 3.3.0.12
修复接诊工作台
新增价格手册
新增请求拦截器，当过期时，跳转到登入界面

# 3.3.0.11
完善接诊工作台
新增今日顾客动态

# 3.3.0.10
修复咨询没有及时更新

# 3.3.0.9
完善接诊工作台

# 3.3.0.8
新增接诊基本资料、跟随仿进

# 3.3.0.7
完善客户档案中客户关系和微信分销的新标签页查看客户详情
新增接诊排序

# 3.3.0.6
新增接诊工作台账号情况

# 3.3.0.5
新增接诊工作台治疗记录

# 3.3.0.4
新增短信功能

# 3.3.0.3
完成接诊工作台流失和消费记录
优化咨询和未成交的备注展示

# 3.3.0.2
完成接诊工作台咨询

# 3.3.0.1
完成接诊工作台结构

# 3.3.0.0
搭建接诊工作台结构

# 3.2.7
修复部分字段

# 3.2.6
更新iview
快捷搜索限制最大显示50条
修改客户档案微信样式

# 3.2.5
修复入库快捷搜索规格和类别显示错误

# 3.2.4
修复划扣耗材中默认耗材最大数量不正确
完善划扣耗材超出最大数量的体验
完善库存快捷搜索

# 3.2.3
修复Tag标签点击关闭无效，完善关闭体验

# 3.2.2.1
完善结算，修复治疗预约，解决重复监听onresize带来的性能问题

# 3.2.2
新增密码加密，只能在用户权限自定义中重置密码
优化修改划扣耗材时，添加项目的字段显示
优化结算显示字段
优化治疗预约操作体验，固定医生列，固定高度，保存操作时间
优化渠道佣金确认时间当天，佣金付款当月

# 3.2.1
完善添加订单流程
修复添加券代码成功提示信息不正确
修复治疗预约医生没有显示是否休息状态，没有区分顾客是否上门的颜色状态，优化浮层表现，去除滚动条

# 3.2.0.8
修复bug

# 3.2.0.7
修复审核记录无法调整客户详情
修复部分渠道Bug

# 3.2.0.6
新增佣金付款记录表、按项目、渠道、医院分析表
修复部分成交报表退项目和退预收款显示错误


# 3.2.0.5
新增佣金明细表、按时间分析表
完善渠道弹窗组件，合并个人医院集团
修复市场工作台不能调整客户详情
修复客户档案中渠道详情字段大小写

# 3.2.0.4
新增渠道档案的佣金余额
修复渠道负责人登记客户时可以选择不是自己负责的渠道

# 3.2.0.3
新增佣金付款
新增渠道档案的基本信息、图片上传、客户列表、渠道结构图

# 3.2.0.2
新增佣金确认

# 3.2.0.1
新增渠道管理、品牌管理
完善渠道负责人的2种添加方式

# 3.1.4
修复还款时自动计算功能错误

# 3.1.3
去除moment依赖语言包，减少一半打包文件体积
修复部分报表字段显示错误
修复收费项目编辑时数据丢失问题
修复套餐编辑时项目不是必须项
修复订单添加套餐项目时，套餐内容显示不正确

# 3.1.2
新增借用单状态--已用完
完善微信搜索功能
修复客户管理查看订单详情时没有显示审核信息，退项目订单审核状态显示错误
修复集团成交明细表、查看借用单详情的订单类型显示错误

# 3.1.0.1
完善报表搜索
修复订单不能添加套餐
兼容老版订单添加方式

# 3.0.0.19
新增借用库结余表
修复报表Bug

# 3.0.0.18
新增借用归还明细报表
新增关于软件
新增治疗预约已取消状态
合并预收款变动日统计表(集团和医院)
修改微信验证码显示格式
修复日常办公的包含空格输入框空格处理和查询处理
修复系统设置的包含空格输入框空格处理和查询处理
修复菜单栏为空时，还能继续显示
修复咨询、开发成交明细表

# 3.0.0.17
新增借用申请单、借用归还单、处方单打印、领用单打印、调拨单打印、退药入库单
新增借用明细表
修改部门借用查看接口
修复若干报表下拉没有数据

# 3.0.0.16
新增借用记录
新增借用归还状态
新增处方单
修复了基础信息的bug包含空格输入框空格处理和查询处理
修复bug若干


# 3.0.0.15
****所有的前台接待改为前台工作台
修改借用归还流程——科室借用不显示价格
修改借用归还的回扣耗材流程
修复咨询医生设置
修复所有收费项目接口的改动
修复预约项目设置
修复项目折扣
修复本地定价

# 3.0.0.14
新增部门借用弹窗提醒
新增划扣耗材
修复退药入库状态显示已经退药入库库存成本为0
修复账户情况中预收款执行人显示错误
修复无法删除科室发料记录
修复销售回款添加成功时提示信息错误
修复报表BUG: 1174,1178,1181
修复Bug: 1325、1329、1234、1282、1326、1256、1355、1341、1324、1253、1333、1332、1331、1335、1338、1323

# 3.0.0.13
****所有指定医生替换成主诊医生
新增出入库明细
修复消费项目下的消息记录换页无效，同时默认的消费日期
修复更换开发人员和咨询人员的提示
修复医院到诊每日统计，提交时间修改后查询无效
修复退药时预收款显示错误
修复项目赔款样式错误
修复库存查询中成本单价不显示
修复部门借用出库后，库存不会减少
修复添加咨询预约、编辑咨询预约的项目选择和医生必选
修复分诊显示高度不够
修复收费项目和药物品类型不能选择第一级分类

# 3.0.0.12
新增客户默认头像
新增盘点全部流程
新增出入库明细
修复退项目超出金额提示
修复添加借用单快捷搜索以及只能选择一次出库仓库
修复添加进货信息快捷搜索及清空失效日期
修复添加盘点信息快捷搜索
修复采购发票流程
修复bug：1240 876 1231 1245 1246 1257 1262 1264 1235 1263 1259

# 3.0.0.11
新增库存有效期预警
新增库存盘点
修复药物品编辑空格和拼音码自动生成
修复当部门借用仓库关闭时，还可以操作部门借用
修复借用归还不同批次价格问题

# 3.0.0.10
新增借用归还全部流程
修复订单添加时成交金额不同步变化
修复收银时没有提示选择收银方式
修复bug若干

# 3.0.0.9

# 3.0.0.8 :
新增客户管理联系方式修改
新增系统设置的佣金设置
新增帐套模块

# 3.0.0.7 :
借用归还流程

# 3.0.0.6 :
修复报表BUG:
1109,11475,0093,1192,1194,1195,1196,1197

# 3.0.0.5 :
****所有渠道替换成来源
****所有店家替换成渠道
****渠道组替换成客户来源归类、报表项目组和报表项目替换成消费意向归类，统一迁移到报表中心
新增添加店家佣金
新增用户渠道列表
新增未读消息
新增客户二维码展示
新增出库管理的销售出库
修复市场工作台添加新客户没有推荐店家字段

# 3.0.0.4 :
新增一般添加入库
修复不同渠道组可以添加相同的渠道
修复一般入库、退药入库、退项目审核、退药物品审核、退预收款审核、退项目订单、添加预收款、补划扣、添加订单、修改订单、修改物品、退预收款、添加发票、退项目订单收银、预收款订单收银、退预收款单收银、收银台、收费项目、项目订单收银、的数值取整或者保留2位小数DOM不能及时更新
修复报表BUG：
1114,1118,1122,1125,1127,1133,1050,1051,1052,1053,1054,1057,1060,1061,1062,1063,1069,1070,1071,1073,1080，1082,1087,1088,1090,1091,1092,1093,1093,1097,1104,1106,1107,1109,1110,1111,1117,1119,1120,1128,1130,1131,1138,1140,1145,1148,1149,1150,1152,1153,1159,1164,1167,1173,1175,1185,1187,1081,1098

# 3.0.0.3 : 
药物品属性编辑排版
退药物品订单审核流程
修复渠道组能重复添加渠道
修复收费项目在输入名称时能自动添加拼音码
修复预收款项目和代金券类型在显示时最后多出'、'
修复套餐和项目折扣在添加项目时显示成项目分类
修复客户管理当编辑自定义表格后，刷新后仍需要再次编辑

# 3.0.0.2 : 
修复面包削导航点击事件没有同步更新
仓库管理
供应商
进货入库的退药入库流程

# 3.0.0.1 : 
药物品属性设置、添加订单修改、项目赔款、退项目、退药物品

``` 

