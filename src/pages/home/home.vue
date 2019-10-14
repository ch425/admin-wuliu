<template>
    <div>
        home页面
    </div>
</template>

<script>
    export default {
        methods:{
            changeLangEvent() {
                if (this.lang === "zh-CN") {
                    this.lang = "en-US";
                    this.$i18n.locale = this.lang; //关键语句
                } else {
                    this.lang = "zh-CN";
                    this.$i18n.locale = this.lang; //关键语句
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>