<template>
  <div class="pretreat">
  </div>
</template>
<script>
  export default{
    data(){
      return {
        flag: this.$router.currentRoute.query.flag,
        ticket: this.$router.currentRoute.query.ticket,
        appId: this.$router.currentRoute.query.appid,
        temporaryId: this.$router.currentRoute.query.temporaryId
      }
    },
    created(){
      if (undefined == this.flag) {
        this.$router.push('/template?appid=' + this.appId);
      } else if ('g' == this.flag) {
        this.$router.push('/global?appid=' + this.appId+'&temporaryId='+this.temporaryId);
      }
    },
    methods: {}
  }
</script>
