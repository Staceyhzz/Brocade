/**
 * 渠道弹窗选择组件
 */
<template>
	<div id="storeChoose" :style="_style">
        <Input v-model="_storeName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="show"></Input>
        <Modal
            :title="_placeHolder"
            width='700'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input :malength='20' v-model.trim="formSearch.name" placeholder="请输入名称" @on-enter="getStoreList"></Input>
                    <Input v-show='fixSub'></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getStoreList"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="350" stripe :columns="col" :data="storeList" @on-row-click='choose'></Table>
        </Modal>
    </div>
</template>
	
<script>
	export default {
		name: 'storeChoose',
        props: {
            _placeHolder: String,
            _storeName: String,
            _style: Object,
            _type: {
                default: 1
            }
        },
        data () {
            return {
                fixSub: false,
                once: false,
                modal: false,
                formSearch: {
                    name: ''
                },
                col: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '品牌',
                        key: 'categoryName'
                    },
                    {
                        title: '联系人',
                        key: 'linkman'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                ],
            }
        },
        computed: {
            storeList () {
                let _data
                if(this._type == 1) {
                    _data = this.$store.getters.getStoreList.hosp
                } else if(this._type == 2) {
                    _data = this.$store.getters.getStoreList.user
                } else if(this._type == 3) {
                    _data = this.$store.getters.getStoreList.all
                }
                if(_data[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return _data
                }
            },
        },
        methods: {
            getStoreList () {
                let _vm = this,
                    _url = ''
                console.log(_vm._type)
                if(_vm._type == 1) {
                    _url = 'guard-webManager/select/hospitalStoreList.jhtml'
                } else if(_vm._type == 2) {
                    _url = 'guard-webManager/select/userStoreList.jhtml'
                } else if(_vm._type == 3) {
                    _url = 'guard-webManager/select/storeList.jhtml'
                }
                _vm.$http.get({
                    url: _url,
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            let _data = res.data.content || []
                            _vm.$store.dispatch('setStoreList', {type: _vm._type, data: _data});
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            show () {
                if(this.once) {
                    this.getStoreList()
                    this.once = false
                }
                this.modal = true
            }, 
            choose (data) {
                let _data = {
                    id: data.id,
                    name: data.name,
                }
                this.$emit('setStoreName', _data)
                this.modal = false
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getStoreList()
            }
        }
    }
	
</script>
