<template>
  <div id="app">
    	<router-view></router-view>
		
    <!-- <div class="footer">
    	Copyright©2019 yada.com/gaopu.com ALL Right Reserved.
    </div> -->
  </div>
</template>
<script>

export default {
	name: 'App',
	
	data(){
		return{
			footerShow:false,
			nowOpenid:null
		}
	},
	created(){
		var url=window.location.href,
			indexNow=url.indexOf('=');
			this.nowOpenid=url.slice(indexNow+1,url.length)
		let params={
			"openId":this.nowOpenid,
			// "key":'' 
		}
		//判断用户
		// localStorage.removeItem("nowUserDt")
		// this.$api.getOpenIdUser(params).then(res=>{
		// 	let _this=this;
		// 	if(res.data.Code==0){
		// 		let nowD=res.data.Data;
		// 		let titleInfo=res.data.Data.Message;
		// 		console.log(titleInfo)
		// 		if(titleInfo==0){
		// 			// 填写信息

		// 		}else if(titleInfo==-1){
		// 			//不存在
					
		// 		}else if(titleInfo==1){
		// 			//制定
					
		// 		}else if(titleInfo==2){
		// 			//
		// 			_this.footerShow=true;
		// 			localStorage.setItem("nowUserDt",JSON.stringify(nowD))
		// 		}
		// 	}else{
		// 		//错误

		// 	}
		// }).catch((error) => {
		// 	console.error(error);
		// })
	},
	mounted(){
		
		document.getElementById('appLoading').style.display = 'none';
		function find(str,cha,num){
			var x=str.indexOf(cha);
			for(let i=0;i<num;i++){
				x=str.indexOf(cha,x+1);
			}
			return x;
		}
		
	}
}
</script>
<style lang="scss">
	 @import "../static/scss/common";
</style>
<style>
#app{height:100%;min-height: 100%;overflow: hidden;max-width: 750px;margin: auto;}
.footer{
	text-align: center;
	font-size: 12px;
	color: #adadad;
	/*position: absolute;
	bottom: 30px;*/
	margin-top: -30px;
	width: 100%;
	bottom: 0;
}
</style>
