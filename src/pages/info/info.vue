<template>
    <div class="info-wapper">
        <!-- head -->
        <van-nav-bar class="top-title" title="信息填写" fixed="true" placeholder="true">
            <!-- <template #right>
                <van-icon name="search" size="18" />
            </template> -->
        </van-nav-bar>
        <h2 class="van-doc-demo-block__title">个人信息</h2>
        
        <!-- 微信昵称 -->
        <van-field
            name="呢称"
            label="呢称"
            :disabled='nameDisa'
            v-model="nowData.WXName"
        />
        <!-- 性别 -->
        <van-field name="radio" label="性别">
            <template #input>
                <van-radio-group v-model="nowData.Gender" direction="horizontal">
                <van-radio name="0">男</van-radio>
                <van-radio name="1">女</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 年龄 -->
        <van-field name="stepper" label="年龄">
            <template #input>
                <van-stepper  min="1" max="150" v-model="nowData.Age" />
            </template>
        </van-field>
        <!-- 城市 -->
        <van-field
            v-model="nowData.City"
            name="城市"
            label="城市"
            @click="showPopup"
            disabled
            placeholder="请选择城市"
            :rules="[{ required: true, message: '请填城市名称' }]"
        />
        <!-- 职业 -->
        <van-field
            v-model="nowData.Profession"
            name="职业"
            label="职业"
            placeholder="请填写职业名称"
            :rules="[{ required: true, message: '请填写职业名称' }]"
        />
        <h2 class="van-doc-demo-block__title">皮肤状况</h2>
        <!-- 是否使用防晒 -->
        <van-field name="radio" label="是否使用防晒">
            <template #input>
                <van-radio-group v-model="nowData.Sunprotection" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否使用彩妆 -->
        <van-field name="radio" label="是否使用彩妆">
            <template #input>
                <van-radio-group v-model="nowData.Makeup" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field> 
        <!-- 是否发红 -->
        <van-field name="radio" label="是否发红">
            <template #input>
                <van-radio-group v-model="nowData.Redness" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否发热发烫 -->
        <van-field name="radio" label="是否发热发烫">
            <template #input>
                <van-radio-group v-model="nowData.Fever" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否会肿 -->
        <van-field name="radio" label="是否会肿">
            <template #input>
                <van-radio-group v-model="nowData.Swelling" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否会痒-->
        <van-field name="radio" label="是否会痒">
            <template #input>
                <van-radio-group v-model="nowData.Itch" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否会刺痛 -->
        <van-field name="radio" label="是否会刺痛">
            <template #input>
                <van-radio-group v-model="nowData.Tingling" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否会干燥 -->
        <van-field name="radio" label="是否会干燥">
            <template #input>
                <van-radio-group v-model="nowData.Dry" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否出油 -->
        <van-field name="radio" label="是否出油">
            <template #input>
                <van-radio-group v-model="nowData.Oil" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否长痘 -->
        <van-field name="radio" label="是否长痘">
            <template #input>
                <van-radio-group v-model="nowData.Acne" direction="horizontal">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 有无高血压，糖尿病，甲状腺，肿瘤，病史 -->
        <van-field name="radio" label="有无高血压，糖尿病，甲状腺，肿瘤，病史">
            <template #input>
                <van-radio-group v-model="nowData.Surgical" direction="horizontal">
                <van-radio name="0">有</van-radio>
                <van-radio name="1">无</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 有无焦虑，抑郁病史 -->
        <van-field name="radio" label="有无焦虑，抑郁病史">
            <template #input>
                <van-radio-group v-model="nowData.Psychiatry" direction="horizontal">
                <van-radio name="0">有</van-radio>
                <van-radio name="1">无</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <!-- 是否处在备孕，孕中，哺乳期 -->
        <van-field v-if="nowData.Gender==1" name="radio" label="是否处在备孕，孕中，哺乳期史">
            <template #input>
                <van-radio-group v-model="nowData.Gynecology" direction="horizontal">
                    <div class="mar-b">
                         <van-radio name="0">无</van-radio>
                    </div>
                    <div class="mar-b">
                        <van-radio name="1">备孕</van-radio>
                    </div>
                     <div class="mar-b">
                        <van-radio name="2">孕中</van-radio>
                    </div>
                     <div>
                        <van-radio name="3">哺乳期</van-radio>
                    </div> 
                </van-radio-group>
            </template>
        </van-field>

        <h2 class="van-doc-demo-block__title">自我评测</h2>
        <!-- 症状多久发作一次 -->
        <van-field
            v-model="nowData.Symptom"
            label="症状多久发作一次"
            autosize
            type="textarea"
            placeholder="请填写症状多久发作一次"
            :rules="[{ required: true, message: '请填写症状多久发作一次' }]"
        />
        <!-- 皮肤问题几年了 -->
        <van-field
            v-model="nowData.Skinproblems"
            label="皮肤问题几年了"
             autosize
            type="textarea"
            placeholder="请填写皮肤问题几年了"
            :rules="[{ required: true, message: '请填写皮肤问题几年了' }]"
        />
        <!-- 是否去医院诊断,诊断结论 -->
        <van-field
            v-model="nowData.Diagnosis"
            label="是否去医院诊断,诊断结论"
             autosize
            type="textarea"
            placeholder="请填写是否去医院诊断,诊断结论"
            :rules="[{ required: true, message: '请填写是否去医院诊断,诊断结论' }]"
        />
        <!-- 期间用过药物，使用多久，效果 -->
        <van-field
            v-model="nowData.Useddrug"
             autosize
            type="textarea"
            label="期间用过药物，使用多久，效果"
            placeholder="请填写期间用过药物，使用多久，效果"
            :rules="[{ required: true, message: '请填写期间用过药物，使用多久，效果' }]"
        />
        <!-- 对哪些药物和食物过敏 -->
        <van-field
            v-model="nowData.Allergen"
             autosize
            type="textarea"
            label="对哪些药物和食物过敏"
            placeholder="请填写对哪些药物和食物过敏"
            :rules="[{ required: true, message: '请填写对哪些药物和食物过敏' }]"
        />
        <!-- 用过哪些护肤品感觉挺好或还行 -->
        <van-field
            v-model="nowData.Feelgoode"
             autosize
            type="textarea"
            label="用过哪些护肤品感觉挺好或还行"
            placeholder="请填写用过哪些护肤品感觉挺好或还行"
            :rules="[{ required: true, message: '请填写用过哪些护肤品感觉挺好或还行' }]"
        />
        <!-- 用过哪些护用过哪些护肤品感觉不好肤品感觉挺好或还行 -->
        <van-field
            v-model="nowData.Feelbad"
             autosize
            type="textarea"
            label="用过哪些护肤品感觉不好"
            placeholder="请填写用过哪些护肤品感觉不好"
            :rules="[{ required: true, message: '请填写用过哪些护肤品感觉不好' }]"
        />
        <!-- 照片 -->
        <h2 class="van-doc-demo-block__title">当前状况</h2>
        <van-field name="uploader" label="脸部图片">
            <template #input>
                <van-uploader multiple='true'  v-model="Head"  accept="image/*"/>
            </template>
        </van-field>
        <!-- <van-field name="uploader" label="侧脸图片">
            <template #input>
                <van-uploader v-model="nowData.Profile" :after-read="afterRead"  accept="image/*"/>
            </template>
        </van-field>
        <van-field name="uploader" label="脸部局部图片">
            <template #input>
                <van-uploader preview-full-image='false' v-model="nowData.Partial" accept="image/*"/>
            </template>
        </van-field> -->
        <van-field name="uploader" label="当前产品图片">
            <template #input>
                <van-uploader  multiple='true'  v-model="Product"  accept="image/*" />
            </template>
        </van-field>
        <!-- <van-button round block type="info" @click="uploadImgs">上传图片</van-button> -->
        <!-- 备注其他 -->
        <h2 class="van-doc-demo-block__title">其他信息</h2>
        <div style="line-height:24px;">
            <van-field
                v-model="nowData.Remarks"
                type="textarea"
                autosize
                label="备注"
                placeholder="如您还有别的信息补充，请填写！"
            />
        </div>
        <!-- 地区弹窗 -->
        <van-popup round  v-model="show" position="bottom" >
            <van-area title="选择地区" :area-list="areaLists" :columns-num="2" @cancel='cancelArea' @confirm='chooseArea' @change='changeArea'/>
        </van-popup>
        <div class="btn-commit">
            <van-button round block type="info" @click="commit">提交</van-button>
        </div>
        <div class="load-wapper" v-if="loadShow">
            <van-loading size="24px" color="#fff" >加载中...</van-loading>
        </div>
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    import areaList from '@/api/area.js'
    export default{
        data(){
            return{ 
                uploader: [],
                nowData:{
                    "Id":'',
                    "Openid":'',
                    "Counselorid":null,
                    "Phone":'',
                    "Number":'',
                    "WXName":'',
                    "Gender":null,
                    "Age":null,
                    "City":'',
                    "Profession":'',
                    "Makeup":null,
                    "Sunprotection":null,
                    "Redness":null,
                    "Fever":null,
                    "Swelling":null,
                    "Itch":null,
                    "Tingling":null,
                    "Dry":null,
                    "Oil":null,
                    "Acne":null,
                    "Surgical":null,
                    "Psychiatry":null,
                    "Gynecology":null,
                    "Symptom":'',
                    "Skinproblems":'',
                    "Diagnosis":'',
                    "Useddrug":'',
                    "Allergen":'',
                    "Feelgoode":'',
                    "Feelbad":'',
                    "Head":'',
                    "Profile":'',
                    "Partial":'',
                    "Product":'',
                    "Remarks":''
                },
                show:false,
                areaLists:areaList,
                files:{},
                Product:[],
                Head:[],
                buyUrl:'',
                nameDisa:false,
                ProductList:[],
                HeadList:[],
                lbformData:new window.FormData(),
                cpformData:new window.FormData(),
                loadShow:false
            }
        },
        mounted(){
            this.nowData.Openid=this.$route.params.id
            this.nowData.Id=this.$route.params.index;
            this.getOpenIdUser()
            if(this.$api.is_weixn()){//微信端获取用户
                this.getCode();
                this.nameDisa=true
            }
           
        },
        methods:{
            //判断授权
            getOpenIdUser(){
                let that=this;
                let params={
                    "openId":this.nowData.Openid,
                    "phone":''
                }
                // //判断用户
                this.$api.getOpenIdUser(params).then(res=>{
                    if(res.data.Code==0){
                        // let nowD=res.data.Data;
                        let titleInfo=res.data.Data.Message;
                        if(titleInfo==0){
                            //需要填写信息
                            if(res.data.Data.user){//已填写过信息
                                Dialog.alert({
                                    message: "未付款",
                                    theme: 'round-button',
                                    confirmButtonText:'立即付款'
                                    }).then(() => {
                                        window.location.href=res.data.Data.url;
                                    //    that.getList() 
                                });
                            }else{//当前没填写信息
                                 
                            }
                            that.buyUrl=res.data.Data.url;
                        }else{
                            //跳转方案页面判断
                            that.$router.push({name:'scheme', params:{ id: that.nowData.Openid}})
                        }
                    }else{
                        //没有用户
                        that.$router.push({name:'scheme', params:{ id: that.nowData.Openid}})
                    }
                }).catch((error) => {
                    console.error(error);
                })
            },
            goUrl(){
                let url=encodeURIComponent(window.location.href)
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$api.WXcode.appid+'&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
            },
            getCode(){
                let that=this;
                var url = window.location.href;
                this.winUrl = url;
                var theRequest = new Object()
                if (url.indexOf("?") != -1) {
                    var str = url.substr(url.indexOf("?")+1)
                    var strs = str.split("&")
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
                    }
                }
                if(!theRequest.code){//没有code
                    this.goUrl()
                }else{
                    //获取微信授权信息
                    var _url = window.location.protocol + '//' + window.location.host + '/home/#/info/'+this.nowData.Openid+'/'+this.nowData.Id;
                    window.history.pushState({},0, _url)//地址重置不刷新
                    this.$axios.get(`${this.$api.serverUrl}/api/User/getWXUserInfo?code=${theRequest.code}&redirect_uri=${_url}`).then((res)=>{
                        that.nowData.WXName=res.data.Data.nickname;//微信名称
                        // Dialog.alert({
                        //         message: JSON.stringify(res),
                        //         theme: 'round-button',
                        //         }).then(() => {
                        //         // on close
                        // });
                    }); 
                }
            },
            getInfo(){
                console.log(this.$axios())
                
            },
            showPopup() {
                this.show = true;
            },
            //提交事件
            commit(){
                let that=this;
                //初始化照片
                this.ProductList=[]
                this.HeadList=[]
                this.lbformData=new window.FormData()
                this.cpformData=new window.FormData()
                
                // this.uploadFiles(this.nowData.Head[0].file)
                if(this.nowData.WXName==null){
                    this.$api.tip('请先填写称呼！')
                    return false;
                }
                if(this.nowData.Gender==null){
                    this.$api.tip('请选择性别！')
                    return false;
                } 
                if(this.nowData.City==''){
                    this.$api.tip('请先选择您的城市！')
                    return false;
                } 
                if(this.nowData.Profession==''){
                    this.$api.tip('请先填写您的职业！')
                    return false;
                } 
                if(this.nowData.Makeup==null||
                    this.nowData.Sunprotection==null||
                    this.nowData.Redness==null||
                    this.nowData.Swelling==null||
                    this.nowData.Itch==null||
                    this.nowData.Tingling==null||
                    this.nowData.Dry==null||this.nowData.Oil==null||
                    this.nowData.Acne==null||this.nowData.Surgical==null||this.nowData.Psychiatry==null){
                    this.$api.tip('请先选择完整皮肤状况！')
                    return false;
                } 
                if(this.nowData.Gynecology==null&&parseInt(this.nowData.Gender)==1){
                    this.$api.tip('请先选择完整皮肤状况！')
                    return false;
                }else{
                    this.nowData.Gynecology='0'
                }
                //上传图片
                this.lbImgU();
                this.cpImgU();
                this.loadShow=true
                this.$api.updateUser(this.nowData).then(res=>{
                    that.loadShow=false
                    if(res.data.Code==0){
                        Dialog.alert({
                            message: "信息填写成功！",
                            theme: 'round-button',
                            confirmButtonText:'立即付款'
                        }).then(() => {
                            window.location.href=that.buyUrl;
                        });
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
            //获取城市
            chooseArea(e){
                this.nowData.City=e[0].name+e[1].name
                this.show = false;
            },
            //取消
            cancelArea(e){
                this.show = false;
            },
            // 组件方法 获取 流
            afterRead(file) {
                this.files.name = file.name // 获取文件名
                this.files.type = file.type // 获取类型
                // this.imgPreview(file.file)
            },
            //多图上传
            uploadImgs(){
                let e=this.Head;
                let formData = new window.FormData()
                if(this.Head.length==0){
                    return false;
                }
                for(let i=0;i<this.Head.length;i++){
                    let img=this.imgPreview(this.Head[i].file)
                    console.log(this.Head[i].file)
                    // formData.append('files', this.Head[i].file)
                    console.log(img)
                }
                // this.uploadImg(formData,"lb")
                
            },
            // 处理图片
            imgPreview(file,photoType) {
                console.log(file)
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
                console.log(file)
                if(type=='lb'){//脸部图片
                    this.HeadList.push(file)
                    this.lbformData.append('files', file)
                    if(this.Head.length==this.HeadList.length){//上传
                        this.uploadImg(this.lbformData,'lb')
                    }      
                }else if(type=='cp'){//产品图片
                    this.ProductList.push(file)
                    this.cpformData.append('files', file)
                    if(this.Product.length==this.ProductList.length){//上传
                        this.uploadImg(this.cpformData,'cp')
                    }
                }
                // let formData = new window.FormData()
                // formData.append('files', file)
                // console.log(formData)
                // console.log(formData1)
                // // 提交图片
                // this.uploadImg(formData,'lb')
            },
            //脸部图片上传
            lbImgU(){
                let formData = new window.FormData()
                if(this.Head.length==0){
                    return false;
                }
                for(let i=0;i<this.Head.length;i++){
                    this.imgPreview(this.Head[i].file,"lb")
                    // formData.append('files', this.Head[i].file)
                }
                // this.uploadImg(formData,"lb")
            },
            //产品图片上传
            cpImgU(){
                let formData = new window.FormData()
                if(this.Product.length==0){
                    return false;
                }
                for(let i=0;i<this.Product.length;i++){
                    // formData.append('files', this.Product[i].file)
                    this.imgPreview(this.Product[i].file,"cp") 
                }
                // this.uploadImg(formData,"cp")
            },
            //确定上传图片
            uploadImg(data,type){
                let formData=data;
                let config={
                    headers:{"Content-Type":"multipart/form-data"}
                }
                this.$axios.post(this.$api.serverUrl+'/api/Img/UpLoadImg'+'?openid='+this.$route.params.id+'&type='+type,formData,config).then(res=>{
                    console.log(res)
                })
            }
        }
    }
</script>
<style lang="scss">
    @import '../../../static/scss/common.scss';
    .info-wapper{
        overflow: auto;
        height: 100%;
        .van-cell{
            align-items: center;
        }
        .mar-b{
            margin-bottom: 0.08rem;
        }
    }
</style>
