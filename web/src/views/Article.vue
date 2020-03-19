<template>
    <div>
        <el-card class="card">
            <h4 class="text-center">{{this.model.title}}</h4>
            <div v-html="this.model.content"></div>
            <p class="text-right"><i class="iconfont iconpen pr-2"></i>By: {{this.model.author.username}}</p>
            <p class="text-right"><i class="iconfont iconshijian pr-2"></i>In{{this.model.updateT}}</p>
        </el-card>
        <p></p>
        <el-card class="card">
            <div v-if='logined'>
                <h4>评论列表</h4>
                <ul class="commentUL">
                    <li v-for="(i,j) in comments" :key="j" class="commentLI mb-3">
                        <h5 class="pl-2">{{i.uid.username}} ta说:</h5>
                        <p class="pl-2">{{i.content}}</p>
                        <p class="pl-2"><i class="iconfont icontime"></i> {{i.time | date}}</p>
                    </li>
                </ul>
                <el-form>
                    <el-form-item>
                        <el-input v-model='comment' type="input" placeholder="你说："></el-input>
                        <el-button class="mt-3" type="info" @click="submitComment">发送</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>这钵啊，这钵是没有登录！</div>
        </el-card>
        <p></p>
    </div>
</template>


<script>
import dayjs from 'dayjs'
export default {
    filters: {
        date (val) {
            return dayjs(val).format('YYYY年MM月DD日 HH：mm：ss')
        }
    },
    data () {
        return {
            model:{
                author:{}
            },
            comment:'',
            comments:[],
            timer:{},
            logined:''
        }
    },
    methods : {
        autoW () {
            let imgs = document.getElementsByTagName('img');
            let card = document.querySelectorAll('.el-card')
            if (imgs.length) {
                let biggist = Array.from(imgs).reduce((pre,now) => {
                    return pre.width = pre.width > now.width? pre.width : now.width
                })
                Array.from(card).forEach(el => {
                    el.style.width = biggist + 40 + 'px'
                })
                
            }
        },
        async submitComment () {
            if (this.comment && localStorage.logined != 'false') {
                const comment = {
                    aid:this.model._id,
                    uid:localStorage.logined,
                    time:Date.now(),
                    content:this.comment
                }

                const res =await this.$http.post('/comments',comment);
                if (res.data.success) {
                    this.$message.success('评论成功！')
                    this.userInfo = await this.$http.get(`/article/userInfo?uid=${localStorage.logined}`)

                    this.comments.push({
                        aid:this.model._id,
                        uid:this.userInfo,
                        time:Date.now(),
                        content:this.comment
                    })
                    this.comment = ''
                }
            } else {
                this.$message.success('请先登录 ')
            }
        }
    },
    async created () {
        this.logined = localStorage.logined
        const res =await this.$http.get(`/article?_id=${this.$route.params.aid}`)
        const comments = await this.$http.get(`/article/comments?aid=${this.$route.params.aid}`)
        this.model = res.data[0]
        this.comments = comments.data
        this.autoW()
        this.timer = setTimeout (this.autoW,300)
    },
    async mounted () {
        
    },
    beforeDestory () {
        clearTimeout(this.timer)
    }
}
</script>

<style lang="scss">
    .card {
        width: 50vw;
        margin: 0 auto;
    }
    .commentUL {
        padding:0;
        margin: 0;
        list-style: none;
        .commentLI {
            border: 1px solid lightblue;
            border-radius: 5px;
            transition: .7s;
        }
        .commentLI:hover {
            transform: scale(1.01);
            box-shadow: 5px 5px 10px;
        }
    }
</style>