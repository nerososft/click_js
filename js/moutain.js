var moutain = new Object({
    URL:{
        BASE_URL: function(){
            return "http://localhost:8080/data/";
        },
        MOUTAIN: function(chromosome,datatype){
            return moutain.URL.BASE_URL()+chromosome+"/"+datatype+"/moutain";
        }
    },
    Operate:{
        MOUTAIN: function(chromosome,datatype){
            $("#bt_draw").attr("disabled","true");
            $("#echarts").html('<div class="spinner">'+
                                  '<div class="rect1"></div>'+
                                  '<div class="rect2"></div>'+
                                  '<div class="rect3"></div>'+
                                  '<div class="rect4"></div>'+
                                  '<div class="rect5"></div>'+
                                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Loading~~~</p>');
            //此处判断本地stronge缓存
            //if(cache.init){
            //    var cacheFile =  cache.get(genename);
            //    if(cacheFile){
            //        beesworm.View.draw(genename,cancertype,dataAll);
            //    }else{
                    $.get(moutain.URL.MOUTAIN(chromosome,datatype),{},function(data,status){
                        if(status){
                            if(data.state){
                                var dataAll = new Array();
                                    

                                var fuckdata = [];
                                for(var element in data.data){
                                    //console.log(element);
                                    var tmp = [];
                                    for(var d in data.data[element]){
                                        tmp.push(data.data[element][d]);
                                    }
                                    fuckdata.push(tmp);
                                }
                                dataAll.push(fuckdata);

                                //console.log(dataAll);

                                dataAll.forEach(function(element) {
                                    element.forEach(function(v){
                                        var tmp = v[2];
                                        v[2] = v[1];
                                        v[1] = v[0];
                                        v[0] = tmp;
                                    },this);
                                }, this);

                                var datatag = new Array();
                                moutain.View.draw(chromosome,datatype,dataAll,datatag);
                            }else{
                                $.get(data.msg,{},function(data,status){
                                    var dataAll = [data]; 
                                    var datatag = [];
                                    moutain.View.draw(chromosome,datatype,dataAll,datatag);
                                });
                            }
                        }else{
                              $("#echarts").html('<p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">There is something wrong with server~~~</p>');
           
                        }

                    //    cache.save(genename,data);
                    });
            //    }
            //}else{
            //    console.log("当前浏览器不支持缓存！");
            //    $.get(beesworm.URL.BEESWORM(genename,cancertype),{},function(data,status){
            //            var dataAll = [];
            //            beesworm.View.draw(genename,cancertype,dataAll);
            //    });
            //}
        }
    },
    View:{
        draw: function(chromosome,datatype,data,datatag){

            $("#echarts").html('<div class="spinner">'+
                                  '<div class="rect1"></div>'+
                                  '<div class="rect2"></div>'+
                                  '<div class="rect3"></div>'+
                                  '<div class="rect4"></div>'+
                                  '<div class="rect5"></div>'+
                                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Rendering~~~</p>');

            //此处调用echarts绘制数据图形

            //标注点数据
            //var dataTag = [[13.9565,2.0258,'TCGA-DB-A64X-01'],[12.9226,1.976,'TCGA-TM-A84F-10']];

            //计算xsize
            var Xmin = 20;
            var Xmax = 0;
            var Ymax = 0;
            var Ymin = 20;

            data.forEach(function(element) {
                element.forEach(function(e){
                    if(e[1]>Ymax){
                        Ymax = e[1];
                    }
                    if(e[1]<Ymin){
                        Ymin = e[1];
                    }
                    if(e[0]>Xmax){
                        Xmax = e[0];
                    }
                    if(e[0]<Xmin){
                        Xmin = e[0];
                    }
                });
            }, this);

            var markLineOpt = {
                animation: false
            };

            option = {
                title: {
                    text: "Chromosome " +chromosome,
                    x: 'left',
                    y: 0
                },
                grid: [
                    {x: '5%', y: '8%', width: '94%', height: '80%'}
                ],
                brush: {
                    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    xAxisIndex: 0
                },
                toolbox: { 
                    feature: {
                        mark : {show: true},  
                        dataView : {show: true, readOnly: false}, 
                        dataZoom: {
                            show: true
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                }],
               tooltip : {
                    trigger: 'axis',
                    showDelay : 0,
                    axisPointer:{
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    }
                },
                xAxis: [
                    {gridIndex: 0, min: 0, max: Xmax}
                ],
                yAxis: [
                    {gridIndex: 0, min: Ymin, max: Ymax}
                ],
                series: [
                    {
                        name: chromosome,
                        symbolSize: 3,
                        type: 'scatter',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data[0],
                        markPoint : {  
                            data : [  
                                {type : 'max', name: 'max value'},  
                                {type : 'min', name: 'min value'}  
                            ]  
                        }, 
                        markLine : {
	                    	data : [
	                    		{type : 'average', name: 'average value'}
	                    	]
	                    }
                    },
                    {
                        type: 'scatter',
                        symbolSize: 5,
                        itemStyle: {
                            normal: {
                                color: "#00ff00"
                            }
                        },
                        data: datatag
                    }
                ]
            };
            
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts'));
            
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            $("#bt_draw").removeAttr("disabled");
            
            console.log(echarts);
            //监听事件
            myChart.on("dblclick", function(param){
                var mes = '【' + param.type + '】';
                if (typeof param.seriesIndex != 'undefined') {
                    mes += '  seriesIndex : ' + param.seriesIndex;
                    mes += '  dataIndex : ' + param.dataIndex;
                }
                if (param.type == 'hover') {
                    document.getElementById('hover-console').innerHTML = 'Event Console : ' + mes;
                }
                else {
                    //console.log(Math.round(param.data[0]));
                    // if((Math.round(param.data[0])-1)%3==0){
                         $("#note").append('<div class="alert alert-info alert-dismissible" role="alert" style="padding:0;margin:0;margin-top:1px;">'+
                            '<button type="button" style="padding:0;margin:0;" class="close" data-dismiss="alert">'+
                                '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                            '<strong style="padding:0;margin:0;">'+param.data[2]+' </strong> value: '+param.data[1]+
                        '</div>');
                    // }
                    
                    //标注点数据加入
                    datatag.push(param.data);

                    //递归绘制
                    moutain.View.draw(chromosome,datatype,data,datatag);

                    
                    console.log(param.data[1]+param.data[2]);
                }
            });
        }
    }
});