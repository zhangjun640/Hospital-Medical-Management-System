var prefix = "/inventory";
$(function () {
    load();
});

function load() {
    $('#exampleTable')
        .bootstrapTable(
            {
                method: 'get', // 服务器数据的请求方式 get or post
                url: prefix + "/list", // 服务器数据的加载地址
                showRefresh: true,
                // showToggle : true,
                //	showColumns : true,
                iconSize: 'outline',
                toolbar: '#exampleToolbar',
                striped: true, // 设置为true会有隔行变色效果
                dataType: "json", // 服务器返回的数据类型
                pagination: true, // 设置为true会在底部显示分页条
                // queryParamsType : "limit",
                // //设置为limit则会发送符合RESTFull格式的参数
                singleSelect: false, // 设置为true将禁止多选
                // contentType : "application/x-www-form-urlencoded",
                // //发送到服务器的数据编码类型
                pageSize: 10, // 如果设置了分页，每页数据条数
                pageNumber: 1, // 如果设置了分布，首页页码
                //search : true, // 是否显示搜索框
                showColumns: false, // 是否显示内容下拉框（选择显示的列）
                sidePagination: "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
                queryParams: function (params) {
                    return {
                        //说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
                        limit: params.limit,
                        offset: params.offset,
                        searchName:$('#searchName').val(),
                        // username:$('#searchName').val()
                    };
                },
                // //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
                // queryParamsType = 'limit' ,返回参数必须包含
                // limit, offset, search, sort, order 否则, 需要包含:
                // pageSize, pageNumber, searchText, sortName,
                // sortOrder.
                // 返回false将会终止请求
                columns: [
                    {
                        field: 'drugId',
                        title: '药品编号'
                    },

                    {
                        field: 'drugName',
                        title: '药品名称'
                        // formatter: function(value,row,index){
                        // 	return '<a href="#" onclick="edit(\''+row.id+'\')">'+row.title+'</a>';
                        // }
                    },
                    {
                        field: 'specification',
                        title: '规格'
                    },
                    {
                        field: 'quantity',
                        title: '入库数量'
                    },
                    {
                        field: 'quantityNow',
                        title: '实时库存'
                    },
                    {
                        field: 'price',
                        title: '单价',
                        formatter: function (v) {
                            return v.toFixed(2);
                        }
                    },

                    {
                        field: 'ammount',
                        title: '总金额',
                        formatter: function (v) {
                            return v.toFixed(2);
                        }
                    },
                    // {
                    // 	field : 'status',
                    // 	title : '状态',
                    // 	align :'center',
                    // 	formatter : function(value, row, index){
                    // 		if(value==0){
                    // 			return '<span class="label label-danger">草稿</span>';
                    // 		}else if(value==1){
                    // 			return '<span class="label label-primary">发布</span>';
                    // 		}
                    // 	}
                    // },
                    {
                        field: 'type',
                        title: '类别',
                        formatter: function (value, row, index) {
                            switch (value) {
                                case '1':
                                    return '进货入库';
                                case '2':
                                    return '顾客退货';
                            }
                        }
                    },
                    {
                        field: 'supplierName',
                        title: '供应商'
                    }, {
                        field: 'manager',
                        title: '经办人'
                    },
                    {
                        field: 'gmtCreated',
                        title: '入库时间'
                    }
                    // {
                    // 	title : '操作',
                    // 	field : 'operation',
                    // 	align : 'center',
                    // 	formatter : function(value, row, index) {
                    // 		var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
                    // 			+ row.id
                    // 			+ '\')"><i class="fa fa-edit"></i></a> ';
                    // 		var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
                    // 			+ row.id
                    // 			+ '\')"><i class="fa fa-remove"></i></a> ';
                    // 		var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
                    // 			+ row.id
                    // 			+ '\')"><i class="fa fa-key"></i></a> ';
                    // 		return e + d;
                    // 	}
                    // }
                ]
            });
}

function reLoad() {
    $('#exampleTable').bootstrapTable('refresh');
}

function add() {
    layer.open({
        type: 2,
        title: '入库登记',
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['500px', '520px'],
        content: prefix + '/add' // iframe的url
    });
}

function edit(id) {
    layer.open({
        type: 2,
        title: '编辑',
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['800px', '520px'],
        content: prefix + '/edit/' + id // iframe的url
    });
}

function remove(id) {
    layer.confirm('确定要删除选中的记录？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: prefix + "/remove",
            type: "post",
            data: {
                'id': id
            },
            success: function (r) {
                if (r.code == 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    })
}

function resetPwd(id) {
}

function batchRemove() {
    var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
    if (rows.length == 0) {
        layer.msg("请选择要删除的数据");
        return;
    }
    layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
        btn: ['确定', '取消']
        // 按钮
    }, function () {
        var ids = new Array();
        // 遍历所有选择的行数据，取每条数据对应的ID
        $.each(rows, function (i, row) {
            ids[i] = row['id'];
        });
        $.ajax({
            type: 'POST',
            data: {
                "ids": ids
            },
            url: prefix + '/batchRemove',
            success: function (r) {
                if (r.code == 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    }, function () {
    });
}
