/**
 *  意向识别
 */

<template>
	<div class="container-box intention-distinguish">
		<div class="container-header">
			<h2>经营指标设置</h2>
		</div>
		<div class="container-body">
            <Menu mode="horizontal" active-name="/intentionDistinguish" @on-select='toMenu' ref='menu' v-if='menuKey'>
                <Menu-item name="/dealBusiness">成交指标</Menu-item>
                <Menu-item name="/outpatientBusiness">门诊指标</Menu-item>
                <Menu-item name="/performanceSet">绩效设置</Menu-item>
                <Menu-item name="/intentionSet">意向类型</Menu-item>
                <Menu-item name="/intentionDistinguish">意向识别</Menu-item>
            </Menu>
            <div class="intention-left">
                <h3 class="tit">消费意向</h3>
                <div class="add-btn">
                    <Button type="primary" icon="plus-round" long @click='add'>新建消费意向</Button>
                </div>
                <draggable v-model="list" :options="{animation: 150, disabled: dragKey}" @update="dragChange">
                   <div v-for="(item, index) in list" :class="['drag-item', chooseId === item.id ? 'active' : '']" :key='index' @click='choose(item.id)'>
                       <p>{{item.name}}</p>
                        <div class="icon" @click.stop='remove(item, index)'>
                            <Icon type="trash-a"></Icon>
                        </div>
                        <div class="icon" @click.stop='edit(item)'>
                            <Icon type="edit"></Icon>
                        </div>
                   </div>
                </draggable>
            </div>
            <div class="intention-right">
                <Row :gutter="24">
                    <Col span='24'>
                        <div class="item">
                            <h3 class="tit">{{formShow.name}}</h3>
                            <p>消费意向：{{formShow.groupName}}</p>
                            <p>描述：{{formShow.remark}}</p>
                        </div>
                    </Col>
                    <Col :lg="12">
                        <div class="item">
                            <h3 class="tit">首次主咨询项目</h3>
                            <div class="btn">
                                <Button type="primary" @click='addConsult'>增加咨询项目</Button>
                                <Button type="ghost" class='check'  @click='toCheck(2)'>未配置检测</Button>
                                <Button type="ghost" class='check'  @click="cleanAll('consultData')">清空</Button>
                            </div>
                            <Table stripe :columns="consultCol" :data="consultData"></Table>
                        </div>
                    </Col>
                    <Col :lg="12">
                        <div class="item">
                            <h3 class="tit">消费项目</h3>
                            <div class="btn">
                                <Button type="primary" @click='addCharge'>增加收费项目</Button>
                                <Button type="ghost" class='check' @click='toCheck(1)'>未配置检测</Button>
                                <Button type="ghost" class='check'  @click="cleanAll('chargeData')">清空</Button>
                            </div>
                            <Table stripe :columns="chargeCol" :data="chargeData"></Table>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Modal
            :title="modalTit"
            v-model="modal"
            :closable="false"
            @on-ok="ok"
            :loading="loading"
            class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                <Form-item label="名称" prop="name" required>
                    <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="消费意向" prop="groupId" required>
                    <Select v-model="formValidate.groupId">
                        <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="描述" prop="remark">
                    <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
            </Form>
        </Modal>
        <Modal
            title="选择咨询项目"
            v-model="modalConsult"
            :width = '700'
            :closable="false"
            @on-ok="okConsult"
            :loading="loading"
            class-name="vertical-center-modal">
            <Table height="350" stripe :columns="consultChangeCol" :data="consultChangeData" @on-selection-change='changeConsult'></Table>
        </Modal>
        <Modal
            title="消费项目"
            v-model="modalCharge"
            :width = '700'
            :closable="false"
            @on-ok="okCharge"
            :loading="loading"
            class-name="vertical-center-modal">
            <Form  :label-width="50" inline ref="formSearch" :model="formSearch">
                <Form-item label="名称" prop="name">
                    <Input v-model.trim="formSearch.name" placeholder="请输入名称" :maxlength='20' @on-enter='getCharge'></Input>
                </Form-item>
                <Form-item label="拼音码" prop="pinyin">
                    <Input v-model.trim="formSearch.pinyin" placeholder="请输入拼音码" :maxlength='20' @on-enter='getCharge'></Input>
                </Form-item>
                <Form-item label="类型" prop="categoryId">
                    <Input v-model="categoryName" readonly icon="ios-search" placeholder="请选择收费项目" @on-focus='showCharge'></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click='getCharge'><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="350" stripe :columns="chargeChangeCol" :data="chargeChangeData" @on-selection-change='changeCharge'></Table>
        </Modal>
        <Modal
            title="选择消费项目类型"
            width='700'
            v-model="modalCategory"
            :closable="false"
            class-name="vertical-center-modal">
            <Table height="350" stripe :columns="categoryCol" :data="categoryData" @on-row-click='chooseCategory'></Table>
        </Modal>
	</div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'view_intentionDistinguish',
        components: {draggable},
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'))
                } else {
                    callback()
                }
            }
            const validateGroup = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择消费意向'))
                } else {
                    callback()
                }
            }
            return {
                menuKey: false,
                dragKey: false,
                chooseId: null,
                formShow: {
                    name: '',
                    groupName: '',
                    remark: ''
                },
                chargeCol: [
                    {
                        title: '编号',
                        key: 'chargeID'
                    },
                    {
                        title: '收费项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 70,
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.cleanSingle(params.row.chargeID, params.index, 'chargeData')
                                            }
                                        }
                                    }, '删除')
                                ])
                        }
                    }
                ],
                chargeData: [],
                consultCol: [
                    {
                        title: '编号',
                        key: 'symptomID'
                    },
                    {
                        title: '咨询项目名称',
                        key: 'symptomName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 70,
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.cleanSingle(params.row.symptomID ,params.index, 'consultData')
                                            }
                                        }
                                    }, '删除')
                                ])
                        }
                    }
                ],
                consultData: [],
                list: [],
                groupList: [],
                modalTit: '',
                modal: false,
                loading: true,
                key: true,
                formValidate: {
                    id: '',
                    name: '',
                    groupId: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    groupId: [
                        { validator: validateGroup, trigger: 'change' }
                    ]
                },


                modalConsult: false,
                consultChangeCol: [
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const _text = params.row.status === 1 ? '使用' : '禁用'
                            const _color = params.row.status === 1 ? 'blue' : 'red'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    }
                ],
                consultChangeData: [],
                selectConsult: [],


                modalCharge: false,
                modalCategory: false,
                formSearch: {
                    name: '',
                    pinyin: '',
                    categoryId: ''
                },
                categoryName: '',
                chargeChangeCol: [
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'categoryName'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const _text = params.row.status === 1 ? '使用' : '禁用'
                            const _color = params.row.status === 1 ? 'blue' : 'red'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    }
                ],
                chargeChangeData: [],
                categoryCol: [
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            const level = params.row.level * 20 + 'px'
                            return h('span', {
                                style: {
                                    paddingLeft: level
                                }
                            }, params.row.name)
                        }
                    }
                ],
                categoryData: [],
                selectCharge: [],
            }
        },
        activated () {
            console.log(111111111)
            this.getList()
            this.getGroupList()
            this.getCategory()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.menuKey = false
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/item/list.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            let _data = res.data.content || []
                            _vm.list = _data.sort((x, y) => x.sortno - y.sortno)
                            if(_vm.list.length && !_vm.chooseId) {
                                _vm.chooseId = _vm.list[0].id
                                _vm.showInfo(_vm.list[0].id)
                            }
                            _vm.menuKey = true
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            getGroupList () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/itemGroupInfoState.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.groupList = res.data.content || []
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            getConsultList () {
               let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/item/getUnUseSymptoms.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            console.log(res)
                            _vm.consultChangeData = res.data.content || []
                            _vm.modalConsult = true
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            getCharge () {
               let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/item/getUnUseCharges.jhtml',
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code === 0){
                            console.log(res)
                            _vm.chargeChangeData = res.data.content || []
                            _vm.modalCharge = true
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            getCategory () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeCategoryList.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            console.log(res)
                            _vm.categoryData = res.data.content || []
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            toMenu (val) {
                const breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: val,
                        text: '经营指标设置'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push(val)
            },
            choose (id) {
                this.chooseId = id
                this.showInfo(id)
            },
            showInfo (id) {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/item/get.jhtml',
                    data: {
                        id: id
                    },
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.chargeData = res.data.content.chargeDetailList || []
                            _vm.consultData = res.data.content.symptomDetailList || []
                            _vm.formShow = {
                                name: res.data.content.name || '',
                                groupName: res.data.content.groupName || '',
                                remark: res.data.content.remark || ''
                            }
                            console.log(res.data.content)
                        } else {
                            console.log(res)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            dragChange (evt) {
                let _vm = this
                const _newIndex = evt.newIndex + 1
                const _id = _vm.list[evt.newIndex].id
                _vm.dragKey = true
                _vm.$http.post({
                    url: 'guard-webManager/item/updateSortNo.jhtml',
                    data: {
                        id: _id,
                        sortNo: _newIndex
                    },
                    success: function(res){
                        _vm.dragKey = false
                        if(res.data.code === 0){
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '排序成功！'
                            })
                        } else {
                            _vm.getList()
                            _vm.$Notice.error({
                                title: '系统提示！',
                                desc: res.data.desc
                            })
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            remove (data, index) {
                let _vm = this
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/item/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.data.code === 0){
                                    _vm.list.splice(index, 1)
                                    if(_vm.chooseId === data.id) {
                                        if(_vm.list.length) {
                                            _vm.chooseId = _vm.list[0].id
                                            _vm.showInfo(_vm.list[0].id)
                                        } else {
                                            _vm.formShow = {
                                                name: '',
                                                groupName: '',
                                                remark: ''
                                            };
                                            _vm.chargeData.splice(0);
                                            _vm.consultData.splice(0);
                                        }
                                    }
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    },
                })
            },
            add () {
                this.modalTit = '添加意向分类'
                this.$refs.formValidate.resetFields()
                this.key = false
                this.modal = true
            },
            edit (data, index) {
                this.modalTit = '修改意向分类'
                this.$refs.formValidate.resetFields()
                this.formValidate = {
                    id: data.id,
                    name: data.name,
                    groupId: data.groupid,
                    remark: data.remark
                }
                this.key = true
                this.modal = true
            },
            ok () {
                let _vm = this
                _vm.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        let url = ''
                        if(_vm.key) {
                            url = 'guard-webManager/item/update.jhtml'
                        } else {
                            url = 'guard-webManager/item/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.data.code === 0){
                                    if(_vm.key) {
                                        const _index = _vm.list.findIndex(item => item.id === _vm.formValidate.id)
                                        _vm.list[_index].name = _vm.formValidate.name
                                        _vm.chooseId = _vm.formValidate.id
                                        _vm.showInfo(_vm.formValidate.id)
                                    } else {
                                        _vm.getList()
                                    }
                                    _vm.$refs.formValidate.resetFields()
                                    _vm.modal = false
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '保存成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                    _vm.loading = false
                                    _vm.$nextTick(() => {
                                        _vm.loading = true
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    } else {
                        _vm.loading = false
                        _vm.$nextTick(() => {
                            _vm.loading = true
                        })
                    }
                })
            },
            toCheck (type) {
                let _url = '',
                    _text = ''
                if(type === 2) {
                    _url = '/itemCheckSymptom'
                    _text = '检测咨询项目匹配'
                } else {
                    _url = '/itemCheckCharge'
                    _text = '检测收费项目匹配'
                }
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/intentionDistinguish',
                        text: '经营指标设置'
                    },
                    {
                        url: _url,
                        text: _text
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push(_url)
            },
            addCharge () {
                this.selectCharge = []
                this.getCharge()
            },
            showCharge () {
                this.modalCategory = true
            },
            chooseCategory (data) {
                this.categoryName= data.name
                this.formSearch.categoryId = data.id
                this.modalCategory = false
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.categoryName = ''
                this.getCharge()
            },
            changeCharge (data) {
                this.selectCharge = data
            },
            okCharge () {
                let _vm = this
                if(_vm.selectCharge.length) {
                    _vm.$http.post({
                        url: 'guard-webManager/item/addChargeList.jhtml',
                        data: {
                            id: _vm.chooseId,
                            chargeList: _vm.selectCharge.map(item => item.id).join(',')
                        },
                        success: function(res){
                            if(res.data.code === 0){
                                _vm.selectCharge.map(item => {
                                    _vm.chargeData.push({
                                        chargeID: item.id,
                                        chargeName: item.name
                                    })
                                })
                                _vm.modalCharge = false
                                _vm.$Notice.success({
                                    title: '系统提示！',
                                    desc: '添加成功！'
                                })
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.data.desc
                                })
                                _vm.loading = false
                                _vm.$nextTick(() => {
                                    _vm.loading = true
                                })
                            }
                        },
                        error: function(res){
                            console.log(res)
                        }
                    })
                } else {
                    _vm.modalCharge = false
                }
            },
            addConsult () {
                this.selectConsult = []
                this.getConsultList()
            },
            changeConsult (data) {
                this.selectConsult = data
            },
            okConsult () {
                let _vm = this
                if(_vm.selectConsult.length) {
                    _vm.$http.post({
                        url: 'guard-webManager/item/addSymptomList.jhtml',
                        data: {
                            id: _vm.chooseId,
                            symptomList: _vm.selectConsult.map(item => item.id).join(',')
                        },
                        success: function(res){
                            if(res.data.code === 0){
                                _vm.selectConsult.map(item => {
                                    _vm.consultData.push({
                                        symptomID: item.id,
                                        symptomName: item.name
                                    })
                                })
                                _vm.modalConsult = false
                                _vm.$Notice.success({
                                    title: '系统提示！',
                                    desc: '添加成功！'
                                })
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.data.desc
                                })
                                _vm.loading = false
                                _vm.$nextTick(() => {
                                    _vm.loading = true
                                })
                            }
                        },
                        error: function(res){
                            console.log(res)
                        }
                    })
                } else {
                    _vm.modalConsult = false
                }
            },
            cleanSingle (id, index, type) {
                let _vm = this,
                    _url = ''
                if(type === 'chargeData') {
                    _url = 'guard-webManager/item/delCharge.jhtml'
                } else {
                    _url = 'guard-webManager/item/delSymptom.jhtml'
                }
                _vm.$http.post({
                    url: _url,
                    data: {id: id},
                    success: function(res){
                        if(res.data.code === 0){
                            _vm[type].splice(index, 1)
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '删除成功！'
                            })
                        } else {
                            _vm.$Notice.error({
                                title: '系统提示！',
                                desc: res.data.desc
                            })
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            cleanAll (type) {
                let _vm = this,
                    _url = ''
                if(type === 'chargeData') {
                    _url = 'guard-webManager/item/clearCharge.jhtml'
                } else {
                    _url = 'guard-webManager/item/clearSymptom.jhtml'
                }
                _vm.$http.post({
                    url: _url,
                    data: {id: _vm.chooseId},
                    success: function(res){
                        if(res.data.code === 0){
                            _vm[type].splice(0)
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '删除成功！'
                            })
                        } else {
                            _vm.$Notice.error({
                                title: '系统提示！',
                                desc: res.data.desc
                            })
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
        }
    }
</script>

<style scoped lang='less'>
    .intention-distinguish {
        .container-body {
            padding-top: 0;
            overflow: hidden;
        }
        .tit {
            font-size: 12px;
            line-height: 40px;
            text-align: center;
            color: #181818;
            box-shadow: inset 0 -1px 0 0 #DEDEDE;
        }
        .btn {
            margin: 15px 20px 0;
            button {
                min-width: 110px;
                margin: 0 10px 15px 0;
            }
            .check {
                border-color: #4172F6;
                color: #4172F6;
            }
        }
        .intention-left {
            float: left;
            width: 200px;
            border: 1px solid #dedede;
            margin: 20px 24px 0 0;
            border-radius: 4px;
            .add-btn {
                margin: 15px 20px;
            }
        }
        .intention-right {
            float: left;
            width: ~'calc(100% - 224px)';
            margin-top: 20px;
            .item {
                overflow: hidden;
                border: 1px solid #dedede;
                border-radius: 4px;
                margin-bottom: 20px;
                p {
                    margin: 5px 20px;
                    word-wrap: break-word;
                }
            }
        }
        .drag-item {
            overflow: hidden;
            padding: 9px 10px;
            font-size: 12px;
            line-height: 17px;
            cursor: move;
            p {
                float: left;
                width: 90px;
            }
            .icon {
                float: right;
                padding: 0 4px;
                cursor: pointer;
                display: none;
            }
            &:hover .icon {
                display: block;
            }
            &:hover p {
                color: #4172F6;
            }
            &:hover {
                background-color: rgba(65, 114, 246, 0.07);
            }
        }
        .active {
            background-color: rgba(65, 114, 246, 0.07);
            .icon {
                display: block;
            }
            p {
                color: #4172F6;
            }
        }

    }
</style>