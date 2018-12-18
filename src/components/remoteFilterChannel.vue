/**
 * 来源快捷搜索组件
 * 类型 _type: all 所有 
 *             usable 可用
 */
<template>
    <div id="remoteFilterChannel" :style="_style">
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
            <Option v-for="(item, index) in realList" :value="item.id" :key="index" :label='item.name' :disabled="item.status === 0 && _type === 'usable'">{{item.name}}</Option>
        </Select>
        <Icon type="ios-search" class='searchIcon' :size='18'></Icon>
        <div v-show='key'>{{channelList}}</div>
    </div>
</template>

<script>
    export default {
        name: 'remoteFilterChannel',
        props: {
            _placeHolder: {
                default: '输入中文拼音码快捷搜索'
            },
            _style: Object,
            _channelName: String,
            _type: {
                default: 'all'
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
            _channelName (val) {
                this.$refs.remoteFilter.setQuery(val)
            },
        },
        computed: {
            channelList () {
                if(this.$store.getters.getChannelAllRemoteList[0] === 1) {
                    this.getList()
                    return []
                } else {
                    return this.$store.getters.getChannelAllRemoteList
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
                    url: 'guard-webManager/select/channelAvailableInfo.jhtml',
                    data: {name: ''},
                    success: function(res){
                        if(res.data.code === 0) {
                            console.log(7777777777)
                            _vm.$store.dispatch('setChannelAllRemoteList', res.data.content)
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
                        const list = _vm.channelList.map(item => {
                            return {
                                name: item.name,
                                pinYin: item.pinYin,
                                firstPinYin: item.firstPinYin,
                                id: item.id,
                                status: item.status
                            }
                        })
                        _vm.realList = list.filter(item => {
                            if(item.name.toLowerCase().includes(query.toLowerCase()) || item.pinYin.toLowerCase().includes(query.toLowerCase()) || item.firstPinYin.toLowerCase().includes(query.toLowerCase())) {
                                return item
                            }
                        })
                    }, 0)
                } else {
                    _vm.realList = _vm.channelList
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
                this.$emit('setChannelName', _data)
            },
            clean () {
                this.searchResult = ''
            },
        }
    }
</script>

<style scoped>
    #remoteFilterChannel {
        position: relative;
    }
    #remoteFilterChannel .searchIcon {
        position: absolute;
        right: 10px;
        top: 7px;
    }
</style>