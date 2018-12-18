/**
 * 渠道品牌快捷过滤组件
 */
<template>
	<div id="storeChoose" :style="_style">
        <Select
            v-model="searchResult"
            filterable
            remote
            ref='remoteFilter'
            :placeholder='_placeHolder'
            :remote-method="searchRemote"
            @on-change='changeSearchList'
            :label-in-value='true'
            :loading="loading">
                <Option v-for="(item, index) in realList" :value="item.id" :key="index" :label='item.name' >
                    {{item.name}}
                </Option>
        </Select>
        <Icon type="ios-search" class='searchIcon' :size='18'></Icon>
        <div v-show='key'>{{storeCategoryList}}</div>
    </div>
</template>
	
<script>
	export default {
		name: 'storeChoose',
        props: {
            _placeHolder: {
                default: '输入中文拼音码快捷搜索'
            },
            _storeCategoryName: String,
            _style: Object,
        },
        data () {
            return {
                key: false,
                searchResult: '',
                loading: false,
                realList: [],
            }
        },
        computed: {
            storeCategoryList () {
                if(this.$store.getters.getStoreCategoryList[0] === 1) {
                    this.getList()
                    return []
                } else {
                    return this.$store.getters.getStoreCategoryList
                }
            },
        },
        mounted () {
            this.searchRemote('')
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/storeCategoryList.jhtml',
                    data: {name: ''},
                    success: function(res){
                        if(res.data.code === 0) {
                            console.log(123456)
                            _vm.$store.dispatch('setStoreCategoryList', res.data.content)
                            _vm.searchRemote('')
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            searchRemote (query) {
                let _vm = this
                _vm.loading = true
                if(query) {
                    setTimeout(() => {
                        _vm.loading = false
                        const list = _vm.storeCategoryList.map(item => {
                            return {
                                name: item.name,
                                pinYin: item.pinYin,
                                firstPinYin: item.firstPinYin,
                                id: item.id
                            }
                        })
                        _vm.realList = list.filter(item => {
                            if(item.name.toLowerCase().includes(query.toLowerCase()) || item.pinYin.toLowerCase().includes(query.toLowerCase()) || item.firstPinYin.toLowerCase().includes(query.toLowerCase())) {
                                return item
                            }
                        })
                    }, 0)
                } else {
                    _vm.realList = _vm.storeCategoryList
                    _vm.$nextTick(() => {
                        _vm.searchResult = ''
                        _vm.loading = false
                    })
                }
            },
            changeSearchList (data) {
                let _data = {
                    id: data.value,
                    name: data.label,
                }
                this.$emit('setStoreCategory', _data)
            },
            clean () {
                this.searchResult = ''
            },
        }
    }
	
</script>
<style scoped>
    #storeChoose {
        position: relative;
    }
    #storeChoose .searchIcon {
        position: absolute;
        right: 10px;
        top: 7px;
    }
</style>
