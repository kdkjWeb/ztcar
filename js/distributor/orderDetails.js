$(function() {
	var importId = GetRequest().applyId;
	
	$.ajax({
		url: path + "/apply/getApplyInfoAll?applyId="+importId,
		dataType: "json",
		contentType: "application/json",
		type: "get",
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function() {
			showLoading(); //显示loading	
		},
		success: function(data) {
			hideLoading(); //隐藏load	
			if(data.code == 0) {
				var listJson = data.data;
				$('#createTime').text(listJson.orderCreateTime?listJson.orderCreateTime:'无');
				
				$('#deName').text(listJson.deName?listJson.deName:'无');
				$('#salesCon').text(listJson.salesCon?listJson.salesCon:'无');
				$('#dcName').text(listJson.dcName?listJson.dcName:'无');
				$('#spName').text(listJson.spName?listJson.spName:'无');
				$('#cmName').text(listJson.cmName?listJson.cmName:'无');
				$('#cmPhone').text(listJson.cmPhone?listJson.cmPhone:'无');
				
				$('#prName').text(listJson.prName?listJson.prName:'无');
				$('#loName').text(listJson.loName?listJson.loName:'无');
				$('#vehicle').text(listJson.vehicle?listJson.vehicle:'无');
				$('#carSeries').text(listJson.carSeries?listJson.carSeries:'无');
				$('#carModels').text(listJson.carModels?listJson.carModels:'无');
				$('#carOpenFare').text(listJson.carOpenFare?listJson.carOpenFare:'无');
				$('#deadline').text(listJson.deadline?listJson.deadline:'无');
				$('#rate').text(listJson.rate?listJson.rate:'无');
				$('#wyhkxs').text(listJson.wyhkxs?listJson.wyhkxs:'无');
				$('#doPayment').text(listJson.doPayment?listJson.doPayment:'无');
				$('#doPayAmount').text(listJson.doPayAmount?listJson.doPayAmount:'无');
				$('#vehicleFin').text(listJson.vehicleFin?listJson.vehicleFin:'无');
				$('#inPremium').text(listJson.inPremium?listJson.inPremium:'无');
				$('#gpsCharge').text(listJson.gpsCharge?listJson.gpsCharge:'无');
				$('#purTax').text(listJson.purTax?listJson.purTax:'无');
				$('#chechuan').text(listJson.chechuan?listJson.chechuan:'无');
				$('#other').text(listJson.other?listJson.other:'无');
				$('#totalLoan').text(listJson.totalLoan?listJson.totalLoan:'无');
				$('#yujiYugong').text(listJson.yujiYugong?listJson.yujiYugong:'无');
				
				$('#boName').text(listJson.boName?listJson.boName:'无');
				$('#boNameOne').text(listJson.boName?listJson.boName:'无');
				$('#sex').text(listJson.sex?listJson.sex:'无');
				$('#birth').text(listJson.birth?listJson.birth:'无');
				$('#cerType').text(listJson.cerType?listJson.cerType:'无');
				$('#cerNum').text(listJson.cerNum?listJson.cerNum:'无');
				$('#stCulture').text(listJson.stCulture?listJson.stCulture:'无');
				$('#maStatus').text(listJson.maStatus?listJson.maStatus:'无');
				$('#hujiNat').text(listJson.hujiNat?listJson.hujiNat:'无');
				$('#rePhone').text(listJson.rePhone?listJson.rePhone:'无');
				$('#moIncome').text(listJson.moIncome?listJson.moIncome:'无');
				$('#moAverage').text(listJson.moAverage?listJson.moAverage:'无');
				$('#carPurpose').text(listJson.carPurpose?listJson.carPurpose:'无');
				$('#payCardNum').text(listJson.payCardNum?listJson.payCardNum:'无');
				$('#isDrivers').text(listJson.isDrivers?listJson.isDrivers:'无');
				$('#driName').text(listJson.driName?listJson.driName:'无');
				$('#driAbbr').text(listJson.driAbbr?listJson.driAbbr:'无');
				$('#driNum').text(listJson.driNum?listJson.driNum:'无');
				$('#firstBuy').text(listJson.firstBuy?listJson.firstBuy:'无');
				$('#nowVehic').text(listJson.nowVehic?listJson.nowVehic:'无');
				$('#actualMan').text(listJson.actualMan?listJson.actualMan:'无');
				$('#conNum').text(listJson.conNum?listJson.conNum:'无');
				$('#comName').text(listJson.comName?listJson.comName:'无');
				$('#unitAddr').text(listJson.unitAddr?listJson.unitAddr:'无');
				$('#position').text(listJson.position?listJson.position:'无');
				$('#workTel').text(listJson.workTel?listJson.workTel:'无');
				$('#enNature').text(listJson.enNature?listJson.enNature:'无');
				$('#inInvolved').text(listJson.inInvolved?listJson.inInvolved:'无');
				$('#yearsOfWork').text(listJson.yearsOfWork?listJson.yearsOfWork+'年':'无');
				$('#cuAddr').text(listJson.cuAddr?listJson.cuAddr:'无');
				$('#peAddr').text(listJson.peAddr?listJson.peAddr:'无');
				$('#naHousing').text(listJson.naHousing?listJson.naHousing:'无');
				$('#hoType').text(listJson.hoType?listJson.hoType:'无');
				$('#hoLocation').text(listJson.hoLocation?listJson.hoLocation:'无');
				$('#moPayments').text(listJson.moPayments?listJson.moPayments:'无');
				
				$('#spoName').text(listJson.spoName?listJson.spoName:'无');
				$('#spoBirth').text(listJson.spoBirth?listJson.spoBirth:'无');
				$('#spoPosition').text(listJson.spoPosition?listJson.spoPosition:'无');
				$('#spoConNum').text(listJson.spoConNum?listJson.spoConNum:'无');
				$('#spoCerType').text(listJson.spoCerType?listJson.spoCerType:'无');
				$('#spoCerNum').text(listJson.spoCerNum?listJson.spoCerNum:'无');
				$('#spoWorkPhone').text(listJson.spoWorkPhone?listJson.spoWorkPhone:'无');
				$('#spoWorkName').text(listJson.spoWorkName?listJson.spoWorkName:'无');
				$('#spoWorkAddr').text(listJson.spoWorkAddr?listJson.spoWorkAddr:'无');
				
				$('#teName').text(listJson.teName?listJson.teName:'无');
				$('#teSex').text(listJson.teSex?listJson.teSex:'无');
				$('#teBirth').text(listJson.teBirth?listJson.teBirth:'无');
				$('#teStaCul').text(listJson.teStaCul?listJson.teStaCul:'无');
				$('#teMarSta').text(listJson.teMarSta?listJson.teMarSta:'无');
				$('#teHujiNat').text(listJson.teHujiNat?listJson.teHujiNat:'无');
				$('#teCerType').text(listJson.teCerType?listJson.teCerType:'无');
				$('#teCerPhone').text(listJson.teCerPhone?listJson.teCerPhone:'无');
				$('#teCurAddr').text(listJson.teCurAddr?listJson.teCurAddr:'无');
				$('#teHouNat').text(listJson.teHouNat?listJson.teHouNat:'无');
				$('#tePhone').text(listJson.tePhone?listJson.tePhone:'无');
				$('#teMonIn').text(listJson.teMonIn?listJson.teMonIn:'无');
				$('#teMonAve').text(listJson.teMonAve?listJson.teMonAve:'无');
				$('#teWorkTel').text(listJson.teWorkTel?listJson.teWorkTel:'无');
				$('#teComName').text(listJson.teComName?listJson.teComName:'无');
				$('#teUnitAddr').text(listJson.teUnitAddr?listJson.teUnitAddr:'无');
				
				$('#dbName').text(listJson.dbName?listJson.dbName:'无');
				$('#dbSex').text(listJson.dbSex?listJson.dbSex:'无');
				$('#dbBirth').text(listJson.dbBirth?listJson.dbBirth:'无');
				$('#dbStanCul').text(listJson.dbStanCul?listJson.dbStanCul:'无');
				$('#dbMarSta').text(listJson.dbMarSta?listJson.dbMarSta:'无');
				$('#dbHujiNat').text(listJson.dbHujiNat?listJson.dbHujiNat:'无');
				$('#dbCerType').text(listJson.dbCerType?listJson.dbCerType:'无');
				$('#dbCerPhone').text(listJson.dbCerPhone?listJson.dbCerPhone:'无');
				$('#dbCurAddr').text(listJson.dbCurAddr?listJson.dbCurAddr:'无');
				$('#dbHouNat').text(listJson.dbHouNat?listJson.dbHouNat:'无');
				$('#dbPhone').text(listJson.dbPhone?listJson.dbPhone:'无');
				$('#dbMonIn').text(listJson.dbMonIn?listJson.dbMonIn:'无');
				$('#dbMonAve').text(listJson.dbMonAve?listJson.dbMonAve:'无');
				$('#dbWorkTel').text(listJson.dbWorkTel?listJson.dbWorkTel:'无');
				$('#dbComName').text(listJson.dbComName?listJson.dbComName:'无');
				$('#dbUnitAddr').text(listJson.dbUnitAddr?listJson.dbUnitAddr:'无');
				
				$('#jinjName1').text(listJson.jinjName1?listJson.jinjName1:'无');
				$('#jinjRel1').text(listJson.jinjRel1?listJson.jinjRel1:'无');
				$('#jinjConWay1').text(listJson.jinjConWay1?listJson.jinjConWay1:'无');
				$('#jinjName2').text(listJson.jinjName2?listJson.jinjName2:'无');
				$('#jinjRel2').text(listJson.jinjRel2?listJson.jinjRel2:'无');
				$('#jinjConWay2').text(listJson.jinjConWay2?listJson.jinjConWay2:'无');
				
				
			} else {
				errLay(data.msg);
			}
		},
		error: function(request, textStatus, errorThrown) {
			hideLoading(); //隐藏load	
			errLay(request.responseJSON.msg);
		}
	});
})