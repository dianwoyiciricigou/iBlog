<template>
<div class="block">
  <el-timeline style="width:50vw;margin-left: 48vw">
    <el-timeline-item 
    :timestamp="i.updateT | date" 
    placement="top" 
    v-for="(i,j) in articles"  
    :key="j"
    >
      <el-card class="hover" shadow="hover" @click.native="toArticle(articles[j]._id)">
        <img :src="i.cover" class="img">
        <h4>{{i.title}}</h4>
        <p class="text-ellipsis">{{i.content}}</p>
        <p>By: {{i.author.username}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    filters:{
        date (val) {
          return dayjs(val).format('YYYY年 MM月 DD日')
        }
    },
    data () {
        return {
            timer:{},
            articles:[]
        }
    },
    methods: {
        toArticle (aid) {
            this.$router.push(`/article/${aid}`)
        },
        lORr () {
            let items = document.querySelectorAll('.el-timeline-item');
            Array.from(items).forEach((el,index) => {
                if(index % 2 !== 0) {
                    el.children[0].style.left = '104.5%'
                    el.children[1].style.left = '103.9%'
                    el.style.left = '-104%'
                    el.style.textAlign = 'right'
                }
            })
        }
    },
    async mounted () {
        const res = await this.$http.get('/articles');
        localStorage.logined = res.data.pop()
        this.articles = res.data
        this.timer = setTimeout(this.lORr,0)
    },
    beforeDestory () {
        clearTimeout(this.timer)
    }
}
</script>

<style lang="scss">
    .timeline {
        width:auto;
        margin-left: 48vw !important;
    }
    .hover {
        &:hover {
            transform: scale(1.01);
        }
        .img {
            width: 100%;
        }
    }
</style>