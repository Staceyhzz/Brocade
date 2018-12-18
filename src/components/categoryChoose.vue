/**
 * 收费项目类型弹窗选择组件
 */
<template>
    <div id="categoryChoose" :style="_style">
        <Input v-model="_categoryName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="show"></Input>
        <Modal
            :title="_placeHolder"
            width='500'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Table height="350" stripe :columns="col" :data="categoryList" @on-row-click='choose'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'categoryChoose',
        props: {
            _placeHolder: String,
            _categoryName: String,
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
            categoryList () {
                if(this.$store.getters.getChargeCategoryList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getChargeCategoryList
                }
            },
        },
        methods: {
            //获取物品药物品
            getCategoryList () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/chargeCategoryList.jhtml',
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.$store.dispatch('setChargeCategoryList', res.data.content);
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
                    this.getCategoryList()
                    this.once = false
                }
                this.modal = true
            }, 
            choose (data) {
                let _data = {
                    id: data.id,
                    name: data.name,
                }
                this.$emit('setCategoryName', _data)
                this.modal = false
            },
        }
    }
</script>