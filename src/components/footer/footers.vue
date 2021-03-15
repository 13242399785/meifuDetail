<template>
    <div class="footer-wapper">
        <van-tabbar v-model="active" safe-area-inset-bottom="true">
            <van-tabbar-item icon="todo-list-o" :to="{name:'scheme', params: {id:openId}}">我的方案</van-tabbar-item>
            <van-tabbar-item icon="comment-o" :to="{name:'feedback', params: {id:pid}}">每周反馈</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    export default{
        props:['pid','openId'],
        data(){
            return{
                active: 0,
                scheme:'/scheme',
                feedback:"/feedback/"
            }
        },
        watch:{
            "pid":function(){
                console.log(this.pid)
            },
            'openId':function(){
                this.scheme='/scheme?jm='+this.openId
            }
        },
        mounted(){
            
            let url=window.location.href;
            if(url.indexOf('scheme')>-1){
                this.active=0
            }else if(url.indexOf('feedback')>-1){
                 this.active=1
            }
            // this.p
            // this.feedback=this.feedback+this.pid
            console.log(this.pid)
        }
    }
</script>
<style lang="scss">
.van-tabbar{
    height: 0.54rem;
    left: 50%;
    max-width: 750px;
    transform: translateX(-50%);
}
.footer-wapper{
    max-width: 750px;
    margin: auto;
}
.van-tabbar-item{
    font-size: 0.14rem;
}
.van-tabbar-item:first-child{
    border-right: 1px solid #ccc;
}
.van-tabbar-item__icon{
    font-size:0.2rem
}
</style>
