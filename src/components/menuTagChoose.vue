<template>
    <Modal
        :title="$t('menuTagChoose.tit')"
        width='700'
        v-model="modal"
        :closable="false"
        @on-ok="ok"
        class-name="menu-tag-choose">
        <div class="menu-box">
            <div class="item" v-for='(item, index) in menuData' :key='index' v-show='item.child.length'>
                <h3 class="tit">{{$t('layoutNav.' + item.id)}}</h3>
                <ul>
                    <li v-for='(child, index1) in item.child' :key='child.id' :class="[child.choose ? 'active' : '']" @click='choose(index, index1)'>{{$t('layoutNav.' + child.id)}}</li>
                </ul>
            </div>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: 'menuTagChoose',
        props: {
            openKey: Boolean,
            value: Array
        },
        data() {
            return {
                modal: false,
                name: '',
                menuData: []
            }
        },
        computed: {
            searchList () {
                let _data = []
                if(this.tagType === 'all') {
                    _data = this.tagData
                } else if(this.tagType === 'use') {
                    _data = this.tagData.filter(item => item.status === 1)
                }
                if(this.name === '') {
                    return _data
                } else {
                    return _data.filter(item => {
                        if(item.name.indexOf(this.name) >= 0) {
                            return item
                        }
                    })
                }
            },
            chooseResult () {
                return this.tagData.filter(item => item.choose)
            },
        },
        watch: {
            openKey (val) {
                this.modal = true
                this.upDate()
            }
        },
        methods: {
            upDate () {
                this.menuData = JSON.parse(localStorage.getItem('navLink')) || []
                this.menuData.map(item => {
                    item.child.map(child => {
                        const _index = this.value.findIndex(val => val.id === child.id)
                        if(_index >= 0) {
                            child.choose = true
                        } else {
                            child.choose = false
                        }
                    })
                })
            },
            choose (index, index1) {
                if(this.menuData[index].child[index1].choose) {
                    this.menuData[index].child[index1].choose = false
                } else {
                    this.menuData[index].child[index1].choose = true
                }
                this.menuData.splice(index, 1, this.menuData[index])
                console.log(this.menuData)
            },
            ok () {
                let data = []
                this.menuData.map(item => {
                    item.child.map(child => {
                        if(child.choose) {
                            data.push(child)
                        }
                    })
                })
                this.$emit('on-change', data)
            },
        }
    }
</script>
<style lang="less" scoped>
    .menu-tag-choose {
        .menu-box {
            height: 500px;
            overflow: auto;
        }
        .tit {
            font-size: 16px;
            font-weight: normal;
            line-height: 32px;
            color: #181818;
            margin-bottom: 7px;
        }
        ul {
            overflow: hidden;
            padding-left: 40px;
        }
        li {
            float: left;
            min-width: 60px;
            padding: 7px;
            border: 1px solid #dedede;
            margin: 0px 15px 15px 0;
            line-height: 16px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
            &:hover {
                color: #fff;
                border-color: #4172F6;
                background-color: #4172F6;
            }
        }
        .active {
            color: #fff;
            border-color: #4172F6;
            background-color: #4172F6;
        }
    }
</style>