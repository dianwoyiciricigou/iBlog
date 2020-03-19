<template>
      <div @mousewheel="showBar($event)" class="main">
        <transition name="fade">
          <navHeader v-show="show" class="header"></navHeader>
        </transition>
        <router-view class="mt-6 router"></router-view>
      </div>
</template>

<script>
  import navHeader from '../components/header'
  export default {
    data() {
      return {
        show:true
      };
    },
    components:{
        navHeader
    },
    methods:{
      showBar (e) {
        e.wheelDelta < 0 ? this.show = false :this.show = true
        e.wheelDelta > 0 ? this.show = true :this.show = false
      }
    }
  }
</script>

<style>
  .header {
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .fade-leave-active {
    transition: all .5s;
  }
  .fade-leave-to {
    opacity: 0;
    height:0
  }
  .router {
    position: relative;
    top: 0;
  }
</style>