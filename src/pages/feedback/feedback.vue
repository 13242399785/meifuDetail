<template>
    <div class="feedback-wapper">
        <van-nav-bar left-arrow
  @click-left="onClickLeft" class="top-title" title="反馈信息" fixed="true" placeholder="true"></van-nav-bar>
        
        <!-- <h2 class="van-doc-demo-block__title">当前产品使用状况</h2> -->
        <van-field name="uploader" label="脸部图片">
            <template #input>
                <van-uploader multiple='true' :after-read="afterRead"  v-model="nowData.Head"  accept="image/*" />
            </template>
        </van-field>
        <!-- <h2 class="van-doc-demo-block__title">反馈内容</h2> -->
        <van-field name="radio" label="反馈感受">
            <template #input>
                <van-radio-group v-model="nowData.Feedbackstate" direction="horizontal">
                    <van-radio class="margin-b" name="偏干">偏干</van-radio>
                    <van-radio class="margin-b" name="偏油">偏油</van-radio>
                    <van-radio class="margin-b" name="又干又油">又干又油</van-radio>
                    <van-radio class="margin-b" name="不干不油">不干不油</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <div>
            <van-field
                v-model="nowData.Feedbacktxt"
                type="textarea"
                autosize
                max-height='200'
                label="反馈内容"
                placeholder="请填写您的反馈内容！"
            />
        </div>
         <h2 class="van-doc-demo-block__title" v-if="proList.length>0">产品是否使用完</h2>
        <!-- 是否使用彩妆 -->
        <van-field name="radio" :label="item.Productname" v-for="(item,index) in proList" :key="index">
            <template #input>
                <van-radio-group v-model="item.Usage" direction="horizontal">
                <van-radio name="0">已用完</van-radio>
                <van-radio name="1">未用完</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <div class="btn-commit">
            <van-button round block type="info" @click="commit">确认反馈</van-button>
        </div>
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    import { Toast } from 'vant';//引入ui提示
    export default{
        
        name:'home',
        props:['pid'],
        data(){
            return{
                nowData:{
                    "Feedbacktxt":'',
                    "Feedbackstate":''
                },
                proList:[],

            }
        },
        mounted(){
             this.getFeedback()
            // Toast.loading({
            //     message: '加载中...',
            //     forbidClick: false,
            // });
            // setTimeout(function(){
            //     Toast.loading({
            //         message: '加载中...',
            //         forbidClick: false,
            //         duration:1
            //     });
            // },3000)
        },
        methods:{
            //获取反馈信息
            getFeedback(){
                let that=this;
                this.$api.getFeedback(this.$route.params.id).then(res=>{
                    let nowd=res.data.Data
                    that.proList=res.data.Data.productlist
                    if(nowd.Massage=='填写反馈'){
                       that.$api.tip('请填写反馈！')
                    }else{
                        Dialog.alert({
                            message: nowd.Massage,
                            theme: 'round-button',
                        }).then(() => {
                            that.$router.go(-1);
                            // on close
                            // that.getFeedback()   
                        });
                    }
                    // console.log(nowd)
                }).catch((error) => {
                    console.error(error);
                })   
            },
            onClickLeft(){
                 this.$router.go(-1);
            },
            lbImgU(){
                let formData = new window.FormData()
                if(this.nowData.Head.length==0){
                    return false;
                }
                for(let i=0;i<this.nowData.Head.length;i++){
                    formData.append('files', this.nowData.Head[i].file)
                }
                this.uploadImg(formData,"fk")
            },
            //确定上传图片
            uploadImg(data,type){
                let formData=data;
                let config={
                    headers:{"Content-Type":"multipart/form-data"}
                }
                this.$axios.post(this.$api.serverUrl+'/api/Img/UpLoadImg'+'?openid=JUN_3_MI&type='+type+'&Programid='+this.$route.params.id,formData,config).then(res=>{
                    console.log(res)
                })
            },
            //提交反馈
            commit(){
                this.lbImgU();
                let that=this;
                let parsem={
                    "Id": 0,
                    "Programid": this.$route.params.id,
                    "Feedbacktime":'',
                    "Feedbacktxt": this.nowData.Feedbacktxt,
                    "Feedbackstate":this.nowData.Feedbackstate,
                    "Head": "",
                    "Profile": "",
                    "Partial": "",
                    "FbpList": []
                }
                
                for(let i=0;i<this.proList.length;i++){
                     parsem.FbpList.push({"Id":0,"Feedbackid":0,"Productid":this.proList[i].Id,"Finished":this.proList[i].Usage})
                    // parsem.FbpList[i].Id=0
                    // parsem.FbpList[i].Feedbackid=0
                    // parsem.FbpList[i].Productid=this.proList[i].Id
                    // parsem.FbpList[i].Finished=this.proList[i].Usage
                }
                if(parsem.Feedbackstate==''){
                    this.$api.tip('请先选择反馈感受！')
                    return false;
                }
                if(parsem.Feedbacktxt==''){
                    this.$api.tip('请先填写反馈内容！')
                    return false;
                }
                this.$api.addFeedback(parsem).then(res=>{
                     if(res.data.Code==0){
                        that.$api.tip('反馈成功！') 
                        setTimeout(function(){
                            that.$router.go(-1);
                        },1000)
                    }else{
                        //错误
                        Dialog.alert({
                            message: res.data.Msg,
                            theme: 'round-button',
                            }).then(() => {
                                // on close
                        });
                    }
                    console.log(res)
                }).catch((error) => {
                    console.error(error);
                }) 
            },
        }
    }
</script>
<style lang="scss">
     @import '../../../static/scss/common.scss';
     .feedback-wapper{
         height: 100%;
         overflow:auto;
         .van-nav-bar .van-icon{
             color: #fff
         }
         .margin-b{
             margin-bottom: 10px
         }
     }
</style>
