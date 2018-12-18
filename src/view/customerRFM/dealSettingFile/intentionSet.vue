/**
 *  意向设置
 */

<template>
	<div class="container-box intention-set">
		<div class="container-header">
			<h2>经营指标设置</h2>
		</div>
		<div class="container-body">
            <Menu mode="horizontal" active-name="/intentionSet" @on-select='toMenu'>
                <Menu-item name="/dealBusiness">成交指标</Menu-item>
                <Menu-item name="/outpatientBusiness">门诊指标</Menu-item>
                <Menu-item name="/performanceSet">绩效设置</Menu-item>
                <Menu-item name="/intentionSet">意向类型</Menu-item>
                <Menu-item name="/intentionDistinguish">意向识别</Menu-item>
            </Menu>
            <div class="intention-left">
                <h3 class="tit">意向分类</h3>
                <div class="add-btn">
                    <Button type="primary" icon="plus-round" long @click='add'>新建意向分类</Button>
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
                <h3 class="tit">{{formShow.name}}</h3>
                <p>描述：{{formShow.remark}}</p>
                <h3 class="tit">消费意向</h3>
                <ul>
                    <li v-for='item in formShow.data' :key='item.id'>{{item.name}}</li>
                </ul>
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
                <Form-item label="描述" prop="remark">
                    <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
            </Form>
        </Modal>
	</div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        components: {draggable},
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'))
                } else {
                    callback()
                }
            }
            return {
                dragKey: false,
                chooseId: null,
                formShow: {
                    name: '',
                    remark: '',
                    data: []
                },
                list: [],
                modalTit: '',
                modal: false,
                loading: true,
                key: true,
                formValidate: {
                    id: '',
                    name: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/itemGroup/list.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            let _data = res.data.content || []
                            _vm.list = _data.sort((x, y) => x.sortno - y.sortno)
                            if(_vm.list.length) {
                                _vm.chooseId = _vm.list[0].id
                                _vm.showInfo(_vm.list[0])
                            }
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
                const _data = this.list.filter(item => item.id === id)
                this.showInfo(_data[0])
            },
            showInfo (data) {
                this.formShow = {
                    name: data.name || '',
                    remark: data.remark || '',
                    data: data.detailList || []
                }
            },
            dragChange (evt) {
                let _vm = this
                const _newIndex = evt.newIndex + 1
                const _id = _vm.list[evt.newIndex].id
                _vm.dragKey = true
                _vm.$http.post({
                    url: 'guard-webManager/itemGroup/updateSortNo.jhtml',
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
                            url: 'guard-webManager/itemGroup/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.data.code === 0){
                                    _vm.list.splice(index, 1)
                                    if(_vm.chooseId === data.id) {
                                        if(_vm.list.length) {
                                            _vm.chooseId = _vm.list[0].id
                                            _vm.showInfo(_vm.list[0])
                                        } else {
                                            _vm.formShow = {
                                                name: '',
                                                remark: '',
                                                data: []
                                            }
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
            edit (data) {
                this.modalTit = '修改意向分类'
                this.$refs.formValidate.resetFields()
                this.formValidate = {
                    id: data.id,
                    name: data.name,
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
                            url = 'guard-webManager/itemGroup/update.jhtml'
                        } else {
                            url = 'guard-webManager/itemGroup/add.jhtml'
                        }
                        _vm.$http.post({
                            url: url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.data.code === 0){
                                    if(_vm.key) {
                                        const _index = _vm.list.findIndex(item => item.id === _vm.formValidate.id)
                                        _vm.list[_index].name = _vm.formValidate.name
                                        _vm.list[_index].remark = _vm.formValidate.remark
                                        _vm.chooseId = _vm.formValidate.id
                                        _vm.showInfo(_vm.list[_index])
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
        }
    }
</script>

<style scoped lang='less'>
    .intention-set {
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
        .intention-left {
            float: left;
            width: 200px;
            border: 1px solid #dedede;
            margin: 20px 20px 0 0;
            border-radius: 4px;
            .add-btn {
                margin: 15px 20px;
            }
        }
        .intention-right {
            float: left;
            width: ~'calc(100% - 220px)';
            margin-top: 20px;
            border: 1px solid #dedede;
            border-radius: 4px;
            p, ul {
                padding: 0 30px;
            }
            li {
                padding: 9px 0;
                font-size: 12px;
                line-height: 17px;
            }
            p {
                word-wrap: break-word;
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