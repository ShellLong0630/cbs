
/*
 * GET home page.
 */
function FormatNum(Source,Length){ 
				var strTemp=""; 
				for(i=1;i<=Length-Source.length;i++){ 
				strTemp+="0"; 
				} 
				return strTemp+Source; 
			} 
function Today(){
	 date = new Date()
	 strTemp=''
	 year = date.getFullYear();
	 month = date.getMonth()+1;
	 day = date.getDate()-1;
	if(2-day.toString().length==1){ 
		day = '0'+day; 
	} 
	if(2-month.toString().length==1){ 
		month = '0'+month; 
	} 
	today = year+"/"+month+"/"+day
	console.log(today)
};
module.exports = function(app){
	app.get('/',function (req,res){
		//Today();
		res.render('index', { title: '猜比赛' ,
											name:'统计'});
	});
	
	//比赛
	app.get('/match',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			for (var i=0;i<day;i++){
				client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',0\}",function (err,reply)
				{
					keys[count]='"'+year+'-'+month+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					//console.log(count);
					count+=1;
				});	
				client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',1\}",function (err,reply)
				{
					keys1[count1]='"'+year+'-'+month+'-'+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==day){
					res.render('match', {
								title: '比赛' ,
								tip:"Football",
								tip1:"Basketball",
								year:year,
								month:month,
								day:day,
								key: keys,
								event:'match',
								value: dic,
								key1: keys1,
								value1: dic1,
								//key2: keys2,
								//value2: dic2
								});								
						};		
					//console.log(keys);							
				});	
						
			};
			
		});
	});
	
	//比赛数量按月显示
	app.get('/match/:yyyy',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){
			
				for (var i=0;i<month;i++){
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',0\}",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',1\}",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					count1+=1;
					if (count1==month){
					res.render('match', {
								title: '比赛' ,
								tip:"Football",
								tip1:"Basketball",
								year:req.params.yyyy,
								month:0,
								day:month,
								key: keys,
								event:'match',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}else{
				for (var i=0;i<12;i++){
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',0\}",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',1\}",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==12){
					res.render('match', {
								title: '比赛' ,
								tip:"Football",
								tip1:"Basketball",
								year:req.params.yyyy,
								month:0,
								day:12,
								key: keys,
								event:'match',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}
			
			
		});
	});
	
	//比赛数量当月每日显示
	app.get('/match/:yyyy/:mm/:num',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){//if1
				if (req.params.mm==month)//if2
				{
					for (var i=0;i<day;i++){
						client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',0\}",function (err,reply)
						{
							keys[count]='"2014-06-'+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							count+=1;
						});	
						client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',1\}",function (err,reply)
						{
							keys1[count1]='"'+year+'-'+month+'-'+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==day){
							res.render('match', {
										title: '比赛' ,
										tip:"Football",
										tip1:"Basketball",
										year:req.params.yyyy,
										month:req.params.mm,
										day:day,
										key: keys,
										event:'match',
										value: dic,
										key1: keys1,
										value1: dic1,
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}else{
					for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',0\}",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',1\}",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('match', {
										title: '比赛' ,
										tip:"Football",
										tip1:"Basketball",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'match',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}//if2
			}else{
				for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',0\}",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'TYPE',1\}",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('match', {
										title: '比赛' ,
										tip:"Football",
										tip1:"Basketball",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'match',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
			}//if1										
		});
	});
	
	//竞猜
	app.get('/guess',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			for (var i=0;i<day;i++){
				client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_CONTENT",function (err,reply)
				{
					keys[count]='"'+year+'-'+month+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					//console.log(count);
					count+=1;
				});	
				client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_NOCONTENT",function (err,reply)
				{
					keys1[count1]='"'+year+'-'+month+'-'+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==day){
					res.render('guess', {
								title: '竞猜' ,
								tip:"CONTENT",
								tip1:"NOCONTENT",
								year:year,
								month:month,
								day:day,
								key: keys,
								event:'guess',
								value: dic,
								key1: keys1,
								value1: dic1,
								//key2: keys2,
								//value2: dic2
								});								
						};		
					//console.log(keys);							
				});	
						
			};
			
		});
	});
	
	//竞猜数量按月显示
	app.get('/guess/:yyyy',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){
			
				for (var i=0;i<month;i++){
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_CONTENT",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_NOCONTENT",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					count1+=1;
					if (count1==month){
					res.render('guess', {
								title: '竞猜' ,
								tip:"CONTENT",
								tip1:"NOCONTENT",
								year:req.params.yyyy,
								month:0,
								day:month,
								key: keys,
								event:'guess',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}else{
				for (var i=0;i<12;i++){
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_CONTENT",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_NOCONTENT",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==12){
					res.render('guess', {
								title: '竞猜' ,
								tip:"CONTENT",
								tip1:"NOCONTENT",
								year:req.params.yyyy,
								month:0,
								day:12,
								key: keys,
								event:'guess',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}
			
			
		});
	});
	
	//竞猜数量当月每日显示
	app.get('/guess/:yyyy/:mm/:num',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){//if1
				if (req.params.mm==month)//if2
				{
					for (var i=0;i<day;i++){
						client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_CONTENT",function (err,reply)
						{
							keys[count]='"2014-06-'+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							count+=1;
						});	
						client.get("CBS::A::match_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_NOCONTENT",function (err,reply)
						{
							keys1[count1]='"'+year+'-'+month+'-'+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==day){
							res.render('guess', {
										title: '竞猜' ,
										tip:"CONTENT",
										tip1:"NOCONTENT",
										year:req.params.yyyy,
										month:req.params.mm,
										day:day,
										key: keys,
										event:'guess',
										value: dic,
										key1: keys1,
										value1: dic1,
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}else{
					for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_CONTENT",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_NOCONTENT",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('guess', {
										title: '竞猜' ,
										tip:"CONTENT",
										tip1:"NOCONTENT",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'guess',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}//if2
			}else{
				for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_CONTENT",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CBS::A::match_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_NOCONTENT",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('guess', {
										title: '竞猜' ,
										tip:"CONTENT",
										tip1:"NOCONTENT",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'guess',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
			}//if1													
		});
	});
	
	//流水
	app.get('/flow',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			for (var i=0;i<day;i++){
				client.get("CBS::A::pay_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_IN",function (err,reply)
				{
					keys[count]='"'+year+'-'+month+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					//console.log(count);
					count+=1;
				});	
				client.get("CBS::A::pay_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_OUT",function (err,reply)
				{
					keys1[count1]='"'+year+'-'+month+'-'+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=0-reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==day){
					res.render('flow', {
								title: '流水' ,
								tip:"IN",
								tip1:"OUT",
								year:year,
								month:month,
								day:day,
								key: keys,
								event:'flow',
								value: dic,
								key1: keys1,
								value1: dic1,
								//key2: keys2,
								//value2: dic2
								});								
						};		
					//console.log(keys);							
				});	
						
			};
			
		});
	});
	
	//流水数量按月显示
	app.get('/flow/:yyyy',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){
			
				for (var i=0;i<month;i++){
				client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_IN",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_OUT",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=0-reply;}else{dic1[count1]=0;};
					count1+=1;
					if (count1==month){
					res.render('flow', {
								title: '流水' ,
								tip:"IN",
								tip1:"OUT",
								year:req.params.yyyy,
								month:0,
								day:month,
								key: keys,
								event:'flow',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}else{
				for (var i=0;i<12;i++){
				client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_IN",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_OUT",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=0-reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==12){
					res.render('flow', {
								title: '流水' ,
								tip:"IN",
								tip1:"OUT",
								year:req.params.yyyy,
								month:0,
								day:12,
								key: keys,
								event:'flow',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}
			
			
		});
	});
	
	//流水数量当月每日显示
	app.get('/flow/:yyyy/:mm/:num',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){//if1
				if (req.params.mm==month)//if2
				{
					for (var i=0;i<day;i++){
						client.get("CBS::A::pay_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_IN",function (err,reply)
						{
							keys[count]='"2014-06-'+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							count+=1;
						});	
						client.get("CBS::A::pay_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_OUT",function (err,reply)
						{
							keys1[count1]='"'+year+'-'+month+'-'+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=0-reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==day){
							res.render('flow', {
										title: '流水' ,
										tip:"IN",
										tip1:"OUT",
										year:req.params.yyyy,
										month:req.params.mm,
										day:day,
										key: keys,
										event:'flow',
										value: dic,
										key1: keys1,
										value1: dic1,
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}else{
					for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_IN",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_OUT",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=0-reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('flow', {
										title: '流水' ,
										tip:"IN",
										tip1:"OUT",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'flow',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}//if2
			}else{
				for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_IN",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CBS::A::pay_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_OUT",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=0-reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('flow', {
										title: '流水' ,
										tip:"IN",
										tip1:"OUT",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'flow',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
			}//if1													
		});
	});
	
	//用户
	app.get('/user',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var count=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			for (var i=0;i<day;i++){
				client.get("CBS::A::user_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2),function (err,reply)
				{
					keys[count]='"'+year+'-'+month+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					//console.log(count);
					count+=1;
					if (count==day){
					res.render('user', {
								title: '用户' ,
								tip:"Users",
								year:year,
								month:month,
								day:day,
								key: keys,
								event:'user',
								value: dic
								});								
						};		
					//console.log(keys);							
				});	
						
			};
			
		});
	});
	
	//用户数量按月显示
	app.get('/user/:yyyy',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var count=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){
			
				for (var i=0;i<month;i++){
				client.get("CBS::A::user_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2),function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
					if (count==month){
					res.render('user', {
								title: '用户' ,
								tip:"Users",
								year:req.params.yyyy,
								month:0,
								day:month,
								key: keys,
								event:'user',
								value: dic
								});								
						};		
				});	
						
			};
			}else{
				for (var i=0;i<12;i++){
				client.get("CBS::A::user_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2),function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
					if (count==12){
					res.render('user', {
								title: '用户' ,
								tip:"Users",
								year:req.params.yyyy,
								month:0,
								day:12,
								key: keys,
								event:'user',
								value: dic
								});								
						};		
				});	
						
			};
			}
			
			
		});
	});
	
	//用户数量当月每日显示
	app.get('/user/:yyyy/:mm/:num',function (req,res){	
		Today();
		var keys = new Array();
		var dic = new Array();
		var count=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){//if1
				if (req.params.mm==month)//if2
				{
					for (var i=0;i<day;i++){
						client.get("CBS::A::user_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2),function (err,reply)
						{
							keys[count]='"2014-06-'+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							count+=1;
							if (count==day){
							res.render('user', {
										title: '用户' ,
										tip:"Users",
										year:req.params.yyyy,
										month:req.params.mm,
										day:day,
										key: keys,
										event:'user',
										value: dic
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}else{
					for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::user_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2),function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
							if (count==req.params.num){
							res.render('user', {
										title: '用户' ,
										tip:"Users",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'user',
										value: dic
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}//if2
			}else{
				for (var i=0;i<req.params.num;i++){
						client.get("CBS::A::user_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2),function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
							if (count==req.params.num){
							res.render('user', {
										title: '用户' ,
										tip:"Users",
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'user',
										value: dic
										});								
								};		
							//console.log(keys);							
						});	
								
					};
			}//if1													
		});
	});
}