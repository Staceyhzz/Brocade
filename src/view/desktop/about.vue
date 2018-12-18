/**
* 关于我们页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('otherRouter.about')}}</h2>
    </div>
    <div class="container-body">
      <Timeline>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.11.0</h2>
            <p>2018.11.08</p>
            <ul>
              <li>新增渠道分销</li>
              <li>修复部分Bug</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.10.0</h2>
            <p>2018.9.28</p>
            <ul>
              <li>新增微信分销</li>
              <li>修复部分Bug</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.9.0</h2>
            <p>2018.9.07</p>
            <ul>
              <li>重构电子病例系统</li>
              <li>新增医院维度券明细报表</li>
              <li>新增客户查询导出</li>
              <li>完善客户档案修改手机号码的体验</li>
              <li>修复系统设置中短信服务设置时，密码长度限制过短</li>
              <li>修复部分Bug</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.8.0</h2>
            <p>2018.8.16</p>
            <ul>
              <li>新增今日顾客体验版</li>
              <li>重构优化快捷搜索组件</li>
              <li>修复预约工作台切换用户时数据不正确</li>
              <li>修复客户档案修改手机号码的错误提示信息</li>
              <li>修复部分Bug</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.7.5</h2>
            <p>2018.08.01</p>
            <ul>
              <li>修复补划扣时间问题</li>
              <li>修复结算记录合计没有保留2位小数</li>
              <li>修复添加新用户时，输入手机号与字符串的区分</li>
              <li>修复渠道商佣金明细表无法显示佣金比例为0</li>
              <li>修复积分没有保留2位小数</li>
              <li>客户档案渠道来源取消限制</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.7.4</h2>
            <p>2018.07.02</p>
            <ul>
              <li>修复预收款项目中价格设置没有限制2位小数</li>
              <li>修复照片管理图片不能删除修改</li>
              <li>修复医院明细表的门诊状态错误</li>
              <li>修复科室中心划扣添加耗材样式错误</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.7.3</h2>
            <p>2018.06.26</p>
            <ul>
              <li>新增划扣出库单打印（治疗出库）</li>
              <li>客户选择器新增未设置回访查询</li>
              <li>客户选择器新增最后一次成交查询</li>
              <li>客户归属权新增客户结果集导入</li>
              <li>库存有效期预警新增360天查询</li>
              <li>重构快捷搜索组件，支持多数据滚动展示；包括：项目订单的新增与编辑、添加借用订单、添加入库单、添加领用单、添加耗材</li>
              <li>客户档案备注栏字数限制为200字</li>
              <li>客户档案渠道来源增加修改限制</li>
              <li>修复客户选择器查询超出范围</li>
              <li>修复客户选择器项目类型查询无法包括下级</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.7.2</h2>
            <p>2018.06.22</p>
            <ul>
              <li>修复医院到诊明细（前台）页面无法显示数据</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.7.1</h2>
            <p>2018.06.11</p>
            <ul>
              <li>完善照片管理，新增旋转下载功能</li>
              <li>修复多标签页的情况下，实时翻译功能没有共享</li>
              <li>修复当没有客户管理菜单时，无法访问有权限客户的档案</li>
              <li>修复只有接诊咨询师本人才能添加订单</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.7.0</h2>
            <p>2018.06.07</p>
            <ul>
              <li>新增客户档案模块翻译</li>
              <li>新增效果跟踪模块功能</li>
              <li>重构收费项目类型、药物品类型，更换为树型结构</li>
              <li>重构权限判断功能，新增404页面与错误页面</li>
              <li>重构登录页面和左侧菜单结构，优化体验</li>
              <li>重构客户档案页面，新增标签页打开客户档案，并在浏览器上显示客户名称</li>
              <li>优化客户档案中的照片管理列表</li>
              <li>优化添加短信群发的页面参数展示</li>
              <li>修复照片、对比照上传</li>
              <li>修复用户选择</li>
            </ul>
            <a href="https://mp.weixin.qq.com/s/TPA2YgNrh82UrR3uLos1Dw" target="_Blank">详细更新内容请点击<Icon type="share"></Icon></a>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.6.2</h2>
            <p>2018.05.21</p>
            <ul>
              <li>修复富文本编辑器资源路径错误导致无法使用</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.6.1</h2>
            <p>2018.05.14</p>
            <ul>
              <li>修复选择弹窗选择用户在分院权限下无法显示数据</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.6.0</h2>
            <p>2018.05.07</p>
            <ul>
              <li>新增多国语言同步翻译(测试版)，基于百度AI平台，支持的语种包括中，英，韩；目前模块包括：新版报表、系统设置、基础设置、医院设置4个模块</li>
              <li>新增报表模块。支持组织、人员权限设置，增加数据展示图表（拆线、饼图等）</li>
              <li>完善顾客运营模块功能，加入了客户选择器和客户组管理。</li>
              <li>完善收银金额判断，修复退项目单无法调整金额</li>
              <li>优化部分搜索操作，支持单个属性重置</li>
              <li>优化审核规则和编辑权限页面的展示与操作</li>
              <li>分页新增电梯功能，可快速跳转到指定页码</li>
              <li>优化部分页面结构</li>
              <li>修复佣金确认中无法查询渠道信息</li>
              <li>修复选择用户组件信息没有及时更新</li>
            </ul>
            <a href="https://mp.weixin.qq.com/s?__biz=MzI0NTgwMDk2MQ==&mid=2247483987&idx=1&sn=ed68ce90c5056f531e37b25964c23d9a&chksm=e9484b3dde3fc22b8c76889f489094b016a3e65e1b6bd0ef3c45632b10769fd0edca150a9242#rd" target="_Blank">详细更新内容请点击<Icon type="share"></Icon></a>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.5.2</h2>
            <p>2018.01.25</p>
            <ul>
              <li>修复意向识别当删除最后一条数据时，页面没有及时更新</li>
              <li>修复标签组管理提示语没有及时更新</li>
              <li>修复接诊工作台中，客户信息不正确</li>
              <li>修复集团在预约工作台中无法操作子机构</li>
              <li>完善预约工作台数据显示，增加预约码和病历号</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.5.1</h2>
            <p>2018.01.12</p>
            <ul>
              <li>修复医院划扣记录报表导出数据不正确</li>
              <li>修复当删除最后一个数据时，意向分类和消费意向没有重置</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.5.0</h2>
            <p>2018.01.05</p>
            <ul>
              <li>新增经营指标设置，替换一二级消费意向</li>
              <li>新增RFM顾客运营查询</li>
              <li>新增采购价格加密设置</li>
              <li>优化客户档案、接待工作台、回访工作台、科室中心部分表格在ipad下显示问题</li>
              <li>优化标签弹窗选择接口，支持单选、多选以及禁用和全部可选</li>
              <li>完善客户档案添加回访提醒时，没有默认绑定自己</li>
              <li>完善搜索后退保存结果，减少初次加载时重复请求</li>
              <li>项目单计入的成交金额新增（是否统计还款项）</li>
              <li>移除本地定价菜单、取消编辑权限里的查看定价</li>
              <li>修复医院科室领用明细中查询用户后，无法重置查询用户</li>
              <li>修复客户档案、接诊工作台添加咨询意向时，出现已禁用咨询项目</li>
              <li>修复预约工作台集团账户无法查看其它子机构</li>
              <li>修复消息不能标记为已读</li>
              <li>修复预约工作台资料面板距离过大</li>
              <li>修复收银记录点击打印出错</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.4.0</h2>
            <p>2017.12.11</p>
            <ul>
              <li>调整页面对比度，调整表格样式</li>
              <li>同步悦完美线上app治疗预约客户</li>
              <li>新增线上订单与线上订单划扣</li>
              <li>新增呼叫中心模块</li>
              <li>新增预约工作台，重构治疗、手术、咨询预约，限制时间段</li>
              <li>完善富文本编辑器，支持打印中表格样式可自己调整，同步页面中打印显示与富文本内容一致</li>
              <li>完善系统设置的预约时间限制</li>
              <li>完善客户档案添加咨询、手术预约时，必须选择医生</li>
              <li>完善批量排班操作，支持覆盖、添加、排序</li>
              <li>完善收银列表、收费项目、药物品、市场渠道，支持回退保存查询数据</li>
              <li>完善客户今日动态，新增实时动态和今日历史动态</li>
              <li>完善回访工作台，同步查看权限与客服档案一致</li>
              <li>完善收银明细表，增加结算维度，修复刷卡金额对应错误</li>
              <li>完善到诊明细表，增加初次上门、成交时间，修复医院报表可以选择其他医院用户</li>
              <li>完善收费项目，支持统一定价和区域定价</li>
              <li>调整账套功能地址栏只能输入地址和端口</li>
              <li>修复查看借用归还单合计没有显示2位小数</li>
              <li>修复科室中心本人用户初始没有展示数据</li>
              <li>修复知识库没有详情连接</li>
              <li>修复系统日志没有数据</li>
              <li>修复客户档案号和病历号会重复</li>
              <li>修复修改客户名称后，客户档案名称不同步</li>
              <li>修复客户选择器重条件查询时，积分与净收总额冲突</li>
              <li>修复成交明细类报表以开发人员和咨询人员作为查询条件无法查询</li>
            </ul>
            <a href="https://mp.weixin.qq.com/s?__biz=MzI0NTgwMDk2MQ==&mid=2247483781&idx=1&sn=50e69f9ca36dfb91f7e0f30652b91e76&chksm=e94848ebde3fc1fdc0b18c706156dd719010284543e3a0203e7939022a6c8e4a5a6ec0dfbf7b#rd" target="_Blank">详细更新内容请点击<Icon type="share"></Icon></a>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.7</h2>
            <p>2017.11.06</p>
            <ul>
              <li>完善回访工作台、客户管理，支持后退保存数据</li>
              <li>完善登录界面回车操作</li>
              <li>完善编辑权限的查询体验</li>
              <li>完善报表导出，增加导出权限</li>
              <li>完善查看借用单，新增已归还数量字段</li>
              <li>新增从价格手册添加项目时，当有重复项目时会有提示信息</li>
              <li>新增当用户添加进货单，失效日期早于进货日期的提示</li>
              <li>重新调整主结构样式</li>
              <li>修改套餐时间限制字段</li>
              <li>修复医生预约设置编辑报错时，初始验证无法通过</li>
              <li>修复编辑权限时，当删除出单用户权限改变时，页面没有更新</li>
              <li>修复用户没有权限查看联系方式时，在客户档案和接诊工作台依然可以看到</li>
              <li>修复当用户没有医护人员权限时，还能添加本人划扣</li>
              <li>修复批量设置排班人员可以添加没有权限的人员</li>
              <li>修复添加审核规则的多级审核时，无法正确清空不同级别审核</li>
              <li>修复审核申请中原因字段错误</li>
              <li>修复接诊工作台订单数量较多选择医生的时候医生显示不完整</li>
              <li>修复添加订单，当套餐含有项目时，先添加套餐之后，添加不了项目</li>
              <li>修复知识管理、公告管理长数字英文不换行</li>
              <li>修复接诊工作台中咨询意向在删除咨询项目时顺序错乱</li>
              <li>修复客户档案中客户间关系显示不正确</li>
              <li>修复集团到诊明细、医院到诊明细的查询提示</li>
            </ul>
            <a href="https://mp.weixin.qq.com/s?__biz=MzI0NTgwMDk2MQ==&mid=2247483727&idx=1&sn=f47a51c8896057af3a7c5c5de49e2685&chksm=e9484821de3fc137783dae829bceae49efd267c71bbf92c8cfc5f25036d4793bd87d3f589e9c#rd" target="_Blank">详细更新内容请点击<Icon type="share"></Icon></a>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.6</h2>
            <p>2017.10.24</p>
            <ul>
              <li>完善券活动提示信息</li>
              <li>完善审核规则回车搜索操作</li>
              <li>完善客户归属权回车搜索操作</li>
              <li>去除添加回访计划的弹窗底部按钮</li>
              <li>修复客户档案中添加回访计划时，当修改起始时间，计划时间没有更新</li>
              <li>修复预约项目提示信息错误</li>
              <li>修复库存有效期预警中，有效期天数显示不正确</li>
              <li>修复代金券编辑标题信息错误</li>
              <li>修复部分报表字段</li>
            </ul>
            <a href="https://mp.weixin.qq.com/s?__biz=MzI0NTgwMDk2MQ==&mid=2247483788&idx=1&sn=97338a8bd15cbafa1b223e1e8b15403a&chksm=e94848e2de3fc1f48829a8483edb9ff99ebf853d08fee80c748827af8caebe39592f4240b89b#rd" target="_Blank">详细更新内容请点击<Icon type="share"></Icon></a>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.5</h2>
            <p>2017.10.16</p>
            <ul>
              <li>软件菜单授权、账号使用数量、时间授权</li>
              <li>新增系统过期时常提示，当系统剩下一个月时，提示可关闭，一周时，不可关闭</li>
              <li>完善收银结算合计，新增未结算欠款合计、新增应收合计</li>
              <li>完善套餐设置，套餐项目价格可设置为0，项目不可重复添加</li>
              <li>优化客户组和活动设置的系统提示</li>
              <li>优化部分输入和查询限制</li>
              <li>优化客户组管理、活动设置里添加客户时，每个客户编号支持回车或英文逗号隔开</li>
              <li>上传的文件存储服务器改为七牛存储</li>
              <li>修复接待工作台中客户详细内容出现标签</li>
              <li>修复客户档案下拉菜单权限被关闭后还能显示</li>
              <li>修复套餐拼音码搜索字段错误</li>
              <li>修复通过价格手册添加套餐时报错</li>
              <li>修复医院入库和领用报表的时间字段显示错误</li>
              <li>系统日志按日期搜索有误的bug</li>
              <li>修复部分字段错误</li>
            </ul>
            <a href="https://mp.weixin.qq.com/s?__biz=MzI0NTgwMDk2MQ==&mid=2247483706&idx=1&sn=861008996a6990c7686f15ba43dc18ca&chksm=e9484854de3fc142c1085f7bd7ece2ff0fd179757555cadcb230e630a47c8983cf4994feb0b3#rd" target="_Blank">详细更新内容请点击<Icon type="share"></Icon></a>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.4</h2>
            <p>2017.09.30</p>
            <ul>
              <li>优化下拉过滤组件,减少重复请求,支持中文、拼音、首字母三种搜索</li>
              <li>优化渠道品牌信息选择，从弹窗替换成快捷搜索</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.3</h2>
            <p>2017.09.29</p>
            <ul>
              <li>优化客户档案中的照片查看，新增放大缩小拖拽</li>
              <li>优化渠道信息选择，从下拉框替换成快捷搜索</li>
              <li>优化来源信息选择，从下拉框替换成快捷搜索</li>
              <li>完善商品的编辑创建，限制拼音码格式，限制商品名称的编辑</li>
              <li>新增收费项目导出</li>
              <li>开放右侧滚动条</li>
              <li>图片上传大小提升为10M</li>
              <li>取消标签页切换动画，修复标签页高度互相影响</li>
              <li>修复价格手册当重置时，已选中的树型节点没有重置</li>
              <li>修复治疗预约当数据过少时，列表显示错位</li>
              <li>修复问卷编辑题目内容没有显示标签</li>
              <li>修复重新登录时没有清空数据缓存</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.2</h2>
            <p>2017.09.26</p>
            <ul>
              <li>完善套餐，新增套餐类型</li>
              <li>完善添加订单，支持百分比和金额输入</li>
              <li>完善出库明细，新增查看入口</li>
              <li>完善客户动态，区分未上门的预约类型</li>
              <li>优化客户档案显示备注内容</li>
              <li>修复仓库列表在部分字段下不显示</li>
              <li>修复部分字段错误</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.3.1</h2>
            <p>2017.09.25</p>
            <ul>
              <li>完善入库明细，新增查看接口</li>
              <li>完善退预收款操作，区分退金额和口预收款</li>
              <li>完善收费项目和药物品，禁止编辑名称和打印名称</li>
              <li>修复价格手册分页显示不正确</li>
              <li>修复部分错误字段</li>
              <li>修复仓库列表不能显示错误</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.3.0</h2>
            <p>2017.09.22</p>
            <ul>
              <li>完善接诊工作台，新增接诊时间，新增客户动态和价格手册</li>
              <li>完善权限验证操作，当登录操作超时时，直接登出</li>
              <li>完善入库管理，新增进货入库列表与打印</li>
              <li>新增短信功能</li>
              <li>新增前台接待离院操作</li>
              <li>新增多页操作，完善客户档案中跳转</li>
              <li>修复集团账号不能编辑权限的错误</li>
              <li>修复耗材设置中默认耗材设置字段错误</li>
              <li>修复前台接待和生日提醒部分字段错误</li>
              <li>修复登记新客户时备注字数限制</li>
              <li>修复结算刷卡方式金额统计不正确</li>
              <li>修复当只有一个输入框时，按下回车会自动刷新页面</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.2.3</h2>
            <p>2017.09.11</p>
            <ul>
              <li>完善结算，修复治疗预约，解决重复监听onresize带来的性能问题</li>
              <li>完善划扣耗材超出最大数量的体验</li>
              <li>修复Tag标签点击关闭无效，完善关闭体验</li>
              <li>修复划扣耗材中默认耗材最大数量不正确</li>
              <li>修复入库快捷搜索规格和类别显示错误</li>
              <li>快捷搜索限制最大显示50条</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.2.2</h2>
            <p>2017.09.04</p>
            <ul>
              <li>新增密码加密，只能在用户权限自定义中重置密码</li>
              <li>优化修改划扣耗材时，添加项目的字段显示</li>
              <li>优化结算显示字段</li>
              <li>优化治疗预约操作体验，固定医生列，固定高度，保存操作时间</li>
              <li>优化渠道佣金确认时间当天，佣金付款当月</li>
              <li>修复订单添加流程</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.2.1</h2>
            <p>2017.09.02</p>
            <ul>
              <li>完善添加订单流程</li>
              <li>修复添加券代码成功提示信息不正确</li>
              <li>修复治疗预约医生没有显示是否休息状态，没有区分顾客是否上门的颜色状态，优化浮层表现，去除滚动条</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.2.0</h2>
            <p>2017.09.01</p>
            <ul>
              <li>新增渠道商佣金</li>
              <li>完善渠道商功能</li>
              <li>修复治疗预约视图在时间段过多时，数据显示不全</li>
              <li>修复药物品向后兼容</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.1.3</h2>
            <p>2017.08.28</p>
            <ul>
              <li>修复部分报表字段显示错误</li>
              <li>修复收费项目编辑时数据丢失问题</li>
              <li>修复套餐编辑时项目不是必须项</li>
              <li>修复订单添加套餐项目时，套餐内容显示不正确</li>
              <li>优化打包文件体积</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.1.2</h2>
            <p>2017.08.25</p>
            <ul>
              <li>新增借用单状态--已用完</li>
              <li>完善微信搜索功能</li>
              <li>修复客户管理查看订单详情时没有显示审核信息，退项目订单审核状态显示错误</li>
              <li>修复集团成交明细表、查看借用单详情的订单类型显示错误</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>
          <div class="anchor">
            <h2>3.1.1</h2>
            <p>2017.08.23</p>
            <ul>
              <li>兼容订单老版添加方式</li>
              <li>完善报表搜索</li>
              <li>修复订单第一次无法添加套餐</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <div class="anchor">
            <h2>3.1.0</h2>
            <p>2017.08.23</p>
            <ul>
              <li>新增药物品</li>
              <li>新增借用功能</li>
              <li>完善库存功能</li>
            </ul>
          </div>
        </Timeline-item>
        <Timeline-item>换版迁移</Timeline-item>
      </Timeline>
    </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    created () {
      this.$store.dispatch('setPageLoading', 1)
    },
    methods: {
    }
  }
</script>

<style scoped>
  .anchor a {
    font-size: 14px;
  }
  .anchor a i {
    margin-left: 5px;
    font-size: 16px;
  }
  .anchor h2 {
    font-weight: normal;
  }
  .anchor h2 {
    padding-left: 10px;
  }
  .anchor p {
    display: inline-block;
    height: 26px;
    line-height: 24px;
    margin: 10px 0;
    padding: 0 8px;
    border: 1px solid #e3e8ee;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 14px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
  }
  .anchor ul {
    padding-left: 22px;
    list-style-type: circle;
  }
  .anchor li {
    margin-bottom: 5px;
    font-size: 14px;
  }
</style>
