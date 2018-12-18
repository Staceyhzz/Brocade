/**
 * 渠道快捷搜索组件
 * 类型 _type: 1 医院 
 *             2 用户
 *             3 集团
 */
<template>
    <div id="remoteFilterStore" :style="_style">
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
            <div v-for="(item, index) in realList" :key="index" class='store-item'>
                <Option :value="item.id" :key="index" :label='item.name'>
                    <p class='item-tit'>{{item.name}}</p>
                    <p>品牌：{{item.categoryName}}</p>
                    <p>联系人：{{item.linkman}}</p>
                    <p>地址：{{item.address}}</p>
                </Option>
            </div>
        </Select>
        <Icon type="ios-search" class='searchIcon' :size='18'></Icon>
        <div v-show='key'>{{storeList}}</div>
    </div>
</template>

<script>
    export default {
        name: 'remoteFilterStore',
        props: {
            _placeHolder: {
                default: '输入中文拼音码快捷搜索'
            },
            _style: Object,
            _storeName: String,
            _type: {
                default: 1
            }
        },
        data () {
            return {
                searchResult: '',
                loading: false,
                realList: [],    
                key: false,  
            }
        },
        watch: {
            _storeName (val) {
                this.$refs.remoteFilter.setQuery(val)
            },
        },
        computed: {
            _url () {
                if(this._type === 1) {
                    return 'guard-webManager/select/hospitalStoreList.jhtml'
                } else if(this._type === 2) {
                    return 'guard-webManager/select/userStoreList.jhtml'
                } else if(this._type === 3) {
                    return 'guard-webManager/select/storeList.jhtml'
                }
            },
            storeList () {
                let _data
                if(this._type === 1) {
                    _data = this.$store.getters.getStoreRemoteList.hosp
                } else if(this._type === 2) {
                    _data = this.$store.getters.getStoreRemoteList.user
                } else if(this._type === 3) {
                    _data = this.$store.getters.getStoreRemoteList.all
                }
                console.log(this._type)
                if(_data[0] === 1) {
                    this.getList()
                    return []
                } else {
                    return _data
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
                    url: _vm._url,
                    data: {name: ''},
                    success: function(res){
                        if(res.data.code === 0) {
                            console.log(66666666666)
                            _vm.$store.dispatch('setStoreRemoteList', {
                                type: _vm._type,
                                data: res.data.content
                            })
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
                        const list = _vm.storeList.map(item => {
                            return {
                                name: item.name,
                                pinYin: item.pinYin,
                                firstPinYin: item.firstPinYin,
                                id: item.id,
                                categoryName: item.categoryName,
                                linkman: item.linkman,
                                address: item.address
                            }
                        })
                        _vm.realList = list.filter(item => {
                            if(item.name.toLowerCase().includes(query.toLowerCase()) || item.pinYin.toLowerCase().includes(query.toLowerCase()) || item.firstPinYin.toLowerCase().includes(query.toLowerCase())) {
                                return item
                            }
                        })
                    }, 0)
                } else {
                    _vm.realList = _vm.storeList
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
                this.$emit('setStoreName', _data)
            },
            clean () {
                this.searchResult = ''
            },
        }
    }
</script>

<style scoped>
    #remoteFilterStore {
        position: relative;
    }
    #remoteFilterStore .searchIcon {
        position: absolute;
        right: 10px;
        top: 7px;
    }
    #remoteFilterStore .store-item {
        box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1);
    }
    #remoteFilterStore .store-item .item-tit {
        padding-left: 0;
        font-size: 13px;
        line-height: 20px;
        font-weight: bold;
        color: #666;
    }
    #remoteFilterStore .store-item p {
        padding-left: 10px;
        font-size: 12px;
    }
</style>