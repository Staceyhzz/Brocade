/**
 * 供应商弹窗选择组件
 */
<template>
    <div id="supplierChoose" :style="_style">
        <Input :disabled="disabled" v-model="_supplierName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="show"></Input>
        <!-- <Input v-model="_supplierName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="show"></Input> -->
        <Modal
            :title="_placeHolder"
            width='700'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <!-- <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input v-model.trim="formSearch.name" placeholder="请输入名称" @on-enter="getSupplierList"></Input>
                </Form-item>
                <Form-item label="序号" prop='id'>
                    <Input v-model.trim="formSearch.id" placeholder="请输入序号" @on-enter="getSupplierList">></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getSupplierList"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form> -->
            <Table height="350" stripe :columns="col" :data="supplierList" @on-row-click='choose'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'supplierChoose',
        props: {
            disabled: Boolean,
            _placeHolder: String,
            _supplierName: String,
            _style: Object,
        },
        data () {
            return {
                once: false,
                modal: false,
                formSearch: {
                    name: '',
                    id: '',
                },
                col: [
                    {
                        title: '序号',
                        key: 'id',
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                ],
            }
        },
        computed: {
            supplierList () {
                if(this.$store.getters.getSupplierList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getSupplierList
                }
            },
        },
        methods: {
            // 券类型
            getSupplierList () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/couponCategoryList.jhtml',
                    data: {},
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.$store.dispatch('setSupplierList', res.data.content);
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
                    this.getSupplierList()
                    this.once = false
                }
                this.modal = true
            }, 
            choose (data) {
                let _data = {
                    id: data.id,
                    name: data.name,
                }
                this.$emit('setSupplierName', _data)
                this.modal = false
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getSupplierList()
            }
        }
    }
</script>