<template>
    <div class="list-drag-sort">
        <ul>
            <!-- <li v-for='(item, index) in data' :key='index' @mousedown='drag($event, index)' :class="[eee === index ? 'move' : '']">{{item.name}}</li> -->
            <li v-for='(item, index) in data' :key='index' draggable="true" @dragover='drag($event, index)' @drop='dragEnd($event, index)' @dragstart='dragStart($event, index)' :class="[moveIndex === index ? 'move' : '', startIndex === index ? 'start' : '', activeIndex === index ? 'active' : '']" @dragend='fixBug' @click='showInfo(item, index)'>
                <p>{{item.name}}</p>
                <div class="icon" @click.stop='remove(item, index)'>
                    <Icon type="trash-a"></Icon>
                </div>
                <div class="icon"  @click.stop='edit(item, index)'>
                    <Icon type="edit"></Icon>
                </div>
            </li>
            <li v-if='dragKey' @dragover='dragFix($event)' :class="[fixKey ? 'move' : '']"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'listDragSort',
        props: {
            data: Array,
            index: Number
        },
        data() {
            return {
                // dragKey: false,
                // startY: 0,
                // currentY: 0,
                // index: 0,
                // eee: null,
                
                dragKey: false,
                startIndex: null,
                activeIndex: null,
                endIndex: 0,
                moveIndex: null,
                fixKey: false,
            }
        },
        watch: {
            index (val) {
                console.log(val + ']]]]]]]')
                this.activeIndex = val
            }
        },
        methods: {
            dragStart (event, index) {
                console.log('++')
                console.log(index)
                this.startIndex = index
                this.dragKey = false
                this.fixKey = false
            },
            drag (event, index) {
                console.log('正常移动')
                event.preventDefault()
                this.dragKey = true
                if(this.dragKey) {
                    this.moveIndex = index
                    this.fixKey = false
                }
                console.log(index)
            },
            dragFix (event) {
                console.log('bug移动')
                this.fixKey = true
                this.moveIndex = null
            },
            dragEnd (event, index) {
                console.log('正常要放下')
                event.preventDefault()
                if(this.dragKey) {
                    this.dragKey = false
                    this.moveIndex = null
                    this.endIndex = index
                    this.changeSort()
                }
                console.log('--')
                console.log(index)
            },
            fixBug () {
                if(this.fixKey) {
                    console.log('Bug要放下')
                    this.dragKey = false
                    this.moveIndex = null
                    this.changeFix()
                }
            },
            // dragEndFix (event) {
            //     console.log('Bug要放下')
            //     event.preventDefault()
            //     if(this.dragKey) {
            //         this.dragKey = false
            //         this.moveIndex = null
            //         this.changeFix()
            //     }
            // },
            changeSort () {
                console.log('正常放下了')
                if(this.endIndex !== this.startIndex) {
                    const _start = this.data[this.startIndex]
                    this.data.splice(this.endIndex, 0, _start)
                    if(this.endIndex > this.startIndex) {
                        this.data.splice(this.startIndex, 1)
                        this.activeIndex = this.endIndex - 1
                    } else {
                        this.data.splice(this.startIndex + 1, 1)
                        this.activeIndex = this.endIndex
                    }
                    this.$emit('on-change', _start, this.data)
                }
                this.startIndex = null
                this.fixKey = false
            },
            changeFix () {
                console.log('Bug放下')
                if(this.startIndex !== this.data.length - 1) {
                    const _start = this.data[this.startIndex]
                    this.data.push(_start)
                    this.data.splice(this.startIndex, 1)
                    this.activeIndex = this.data.length - 1
                    this.$emit('on-change', _start, this.data)
                }
                this.startIndex = null
                this.fixKey = false
            },
            showInfo (data, index) {
                console.log('------')
                this.activeIndex = index
                this.$emit('on-choose', data)
            },
            remove (data, index) {
                console.log('======')
                this.$emit('on-del', data, index)
            },
            edit (data, index) {
                console.log('======')
                this.$emit('on-edit', data, index)
            },










            // drag (event, index) {
            //     console.log(event)
            //     console.log(index)
            //     event.preventDefault()
            //     this.dragStart(event, index)
            //     document.addEventListener('mousemove', this.dragging)
            //     document.addEventListener('mouseup', this.dragEnd)
            // },
            // dragStart (event, index) {
            //     this.index = index
            //     this.dragKey = false
            //     this.startY = event.clientY
            // },
            // dragging () {
            //     this.dragKey = true
            //     if (this.dragKey) {
            //         this.currentY = event.clientY
            //         this.diff = this.currentY - this.startY
            //         this.showSort(this.diff)
            //     }
            // },
            // dragEnd () {
            //     if (this.dragKey) {
            //         this.dragKey = false
            //         this.changeSort(this.diff)
            //     }
            //     document.removeEventListener('mousemove', this.dragging)
            //     document.removeEventListener('mouseup', this.dragEnd)
            // },
            // changeSort (val) {
            //     let bool = true
            //     const indexNum = Math.round(val / 40)
            //     let _index = this.index + indexNum
            //     if(_index <= 0) {
            //         _index = 0
            //     } else if(_index >= this.data.length - 1) {
            //         _index = this.data.length - 1
            //     }
            //     if(_index < this.index) {
            //         bool = false
            //     }
            //     console.log(_index + '----------')
            //     const _start = this.data[this.index]
            //     this.data.splice(this.index, 1, {name: 6666, id: 1})
            //     if(bool) {
            //         _index  = _index + 1
            //     }
            //     this.data.splice(_index, 0, _start)
            //     const id = this.data.findIndex(item => item.id === 1)
            //     this.data.splice(id, 1)
            //     this.eee = null
            // },
            // showSort (val) {..
            //     const indexNum = Math.round(val / 40)
            //     let _index = this.index + indexNum
            //     if(_index <= 0) {
            //         _index = 0
            //     } else if(_index >= this.data.length - 1) {
            //         _index = this.data.length - 1
            //     }
            //     this.eee = _index
            // }

        }
    }
</script>
<style lang="less" scoped>
    .list-drag-sort {
        ul {
            width: 200px;
            padding: 0 20px;
        }
        li {
            overflow: hidden;
            padding: 9px 10px;
            font-size: 12px;
            line-height: 17px;
            cursor: move;
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
        .move {
            box-shadow: 0px 1px 0 #4172F6 inset;
        }
        ul .start {
            box-shadow: none;
            background-color: rgba(65, 114, 246, 0.07);
        }
        .fix {
            opacity: 0;
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