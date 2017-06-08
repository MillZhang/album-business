<template>
  <div class="index">
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      appId: this.$router.currentRoute.query.appid,
      flag: this.$router.currentRoute.query.flag.toLowerCase(),
      temporaryId: this.$router.currentRoute.query.temporaryId,
      pid: this.$router.currentRoute.query.pid,
      cfrom: this.$router.currentRoute.query.cfrom,
      albumId: this.$router.currentRoute.query.albumId
    }
  },
  created() {
    console.log(this.flag)
    switch (this.flag) {
      case 'team':
        this.$router.push('/team/list?appid=' + this.appId);
        break;
      case 'share':
        this.$router.push('/team/share?appid=' + this.appId + '&temporaryId=' + this.temporaryId);
        break;
      case 'modern':
        this.$router.push('/modern/list?appid=' + this.appId);
        break;
      case 'base':
        this.$router.push('/base/list?appid=' + this.appId);
        break;
      case 'detail':
        this.$router.push('/base/detail?appid=' + this.appId + '&id=' + this.pid);
        break;
      case 'w_share':
        this.$router.push('/common/previewer?appid=' + this.appId +
          '&albumId=' + this.albumId +
          '&cfrom=' + this.cfrom + '&flag=share');
        break;
      case 'paint':
        this.$router.push('/paint/detail?appid=' + this.appId + '&id=' + this.pid);
        break;
      case 'paint_order':
        this.$router.push('/paint/oList?appid=' + this.appId);
        break;
      case 'paint_eval':
        this.$router.push('/paint/eval?appid=' + this.appId);
        break;
      case 'show':
        this.$router.push('/show/index?appid=' + this.appId);
        break;
      case 'base-orderlist':
        this.$router.push('/base/worklib?appid=' + this.appId);
        break;
      case 'team-orderlist':
        this.$router.push('/team/worklib?appid=' + this.appId);
        break;
      default:
        break;
    }
  }
}
</script>
