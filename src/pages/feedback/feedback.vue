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
        <div class="load-wapper" v-if="loadShow">
            <van-loading size="24px" color="#fff" >加载中...</van-loading>
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
                    "Feedbackstate":'',
                    "Head":[]
                },
                proList:[],
                HeadList:[],
                lbformData:new window.FormData(),
                loadShow:false

            }
        },
        mounted(){
             this.getFeedback()
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
            // 处理图片
            imgPreview(file,photoType) {
                // console.log(file)
                let self = this
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader()
                    // 将图片2将转成 base64 格式
                    reader.readAsDataURL(file)
                    // 读取成功后的回调
                    reader.onloadend = function() {
                    let result = this.result
                    let img = new Image()
                    img.src = result
                    //判断图片是否大于1000K,不是就直接上传，反之压缩图片
                    if (this.result.length <= 1000 * 1024) {
                        // 上传图片
                        self.postImg(this.result,photoType,file.name);
                    } else {
                        img.onload = function() {
                            let data = self.compress(img)
                            // 上传图片
                           self.postImg(data,photoType,file.name);
                        }
                    }
                    }
                }
            },
            // 压缩图片
            compress(img, Orientation) {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                //瓦片canvas
                let tCanvas = document.createElement('canvas')
                let tctx = tCanvas.getContext('2d')
                // let initSize = img.src.length;
                let width = img.width
                let height = img.height
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio
                if ((ratio = (width * height) / 4000000) > 1) {
                    ratio = Math.sqrt(ratio)
                    width /= ratio
                    height /= ratio
                } else {
                    ratio = 1
                }
                canvas.width = width
                canvas.height = height
                // 铺底色
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                //如果图片像素大于100万则使用瓦片绘制
                let count
                if ((count = (width * height) / 1000000) > 1) {
                    // console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
                    //      计算每块瓦片的宽和高
                    let nw = ~~(width / count)
                    let nh = ~~(height / count)
                    tCanvas.width = nw
                    tCanvas.height = nh
                    for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                    }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height)
                }
                //进行压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.8)
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata
            },
            //将base64转换为文件
            dataURLtoFile(dataurl,fileName) {
                var arr = dataurl.split(','),
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], fileName, {
                    type:"image/jpeg"
                })
            },
            // 提交图片到后端
            postImg(base64,type,fileName) {
                let file = this.dataURLtoFile(base64,fileName)
                let formData = new window.FormData();
                // console.log(file)
                if(type=='fk'){//反馈图片
                    this.HeadList.push(file)
                    this.lbformData.append('files', file)
                    if(this.nowData.Head.length==this.HeadList.length){//上传
                        this.uploadImg(this.lbformData,'fk')
                    }      
                }
            },
            lbImgU(){
                let formData = new window.FormData()
                if(this.nowData.Head.length==0){
                    return false;
                }
                for(let i=0;i<this.nowData.Head.length;i++){
                    this.imgPreview(this.nowData.Head[i].file,"fk")
                    // formData.append('files', this.nowData.Head[i].file)
                }
                // this.uploadImg(formData,"fk")
            },
            //确定上传图片
            uploadImg(data,type){
                let formData=data;
                let config={
                    headers:{"Content-Type":"multipart/form-data"}
                }
                this.$axios.post(this.$api.serverUrl+'/api/Img/UpLoadImg'+'?openid='+this.$route.params.index+'&type='+type+'&Programid='+this.$route.params.id,formData,config).then(res=>{
                    console.log(res)
                })
            },
            //提交反馈
            commit(){
                // this.lbImgU();
                //初始化图片
                this.HeadList=[];
                this.lbformData=new window.FormData();
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
                }
                if(parsem.Feedbackstate==''){
                    this.$api.tip('请先选择反馈感受！')
                    return false;
                }
                if(parsem.Feedbacktxt==''){
                    this.$api.tip('请先填写反馈内容！')
                    return false;
                }
                this.lbImgU();
                this.loadShow=true;
                this.$api.addFeedback(parsem).then(res=>{
                     that.loadShow=false
                     if(res.data.Code==0){
                        
                        that.$api.tip('反馈成功！') 
                        setTimeout(function(){
                            that.$router.go(-1);
                        },1500)
                    }else{
                        //错误
                        Dialog.alert({
                            message: res.data.Msg,
                            theme: 'round-button',
                            }).then(() => {
                                // on close
                        });
                    }
                }).catch((error) => {
                    that.loadShow=false
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
