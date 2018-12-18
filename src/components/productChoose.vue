/**
 * 物品药物品弹窗选择组件
 */
<template>
    <div id="productChoose" :style="_style">
        <Input v-model="_productName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="show"></Input>
        <Modal
            :title="_placeHolder"
            width='700'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Table height="350" stripe :columns="col" :data="productList" @on-row-click='choose'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'productChoose',
        props: {
            _placeHolder: String,
            _productName: String,
            _style: Object,
        },
        data () {
            return {
                once: false,
                modal: false,
                col: [
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
                    },
                ],
            }
        },
        computed: {
            productList () {
                if(this.$store.getters.getProductCategoryList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getProductCategoryList
                }
            },
        },
        methods: {
            //获取物品药物品
            getProductList () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/productCategoryList.jhtml',
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.$store.dispatch('setProductCategoryList', res.data.content);
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
                    this.getProductList()
                    this.once = false
                }
                this.modal = true
            }, 
            choose (data) {
                let _data = {
                    id: data.id,
                    name: data.name,
                }
                this.$emit('setProductName', _data)
                this.modal = false
            },
        }
    }
</script>