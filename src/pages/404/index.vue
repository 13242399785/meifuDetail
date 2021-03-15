<template>
    <div class="scheme-wapper">
        
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    export default{
        data(){
            return{ 
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                Dialog.alert({
                    message: '当前链接错误，请确认链接正确！',
                    theme: 'round-button',
                    }).then(() => {
                    // on close
                        // this.getList()
                });
            }
        }
    }
</script>
<style lang="scss">

</style>
