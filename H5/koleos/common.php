<?php
	session_start();
	include('/home/www/framework/init.inc.php');
	include('./aescbc.php');
	//include('E:/framework/init.inc.php');
class common extends MinisiteController{
	
	public function __construct() {
		parent::__construct();
	}

	public function subMessage() {
		
		$form = new MinisiteForm();
		$model = new MinisiteModel('go2017', '0315_koleos_info');
//		$_POST['name'] = '163test666';
//		$_POST['sex'] = '1';
//		$_POST['phone'] = '18331125232';		
//		$_POST['province'] = '浙江';
//		$_POST['city'] = '台州';
//		$_POST['dealer'] = '台州升驰|###|26|###|20287|###|07568';	
//		$_POST['source'] = 'wap';
//		$_POST['cartime'] = '一个月|###|1';
//		$_POST['cartype'] = '全新科雷傲|###|XZJ';
//		$_POST['smart'] = '2348466';
//		$_POST['campaign'] = '4995112258BDD2AEE0538305DF0A82AF';
		$guize = array(
			array('name', 'require', '请输入姓名'),
			array('sex', 'require', '请选择性别'),
			array('phone', 'require', '请输入手机号码'),
			array('phone', 'phone', '请输入正确的手机号码'),
			array('phone', 'unique', '此手机号码已经存在', '0', $model),
			array('province', 'require', '请选择省份'),
			array('city', 'require', '请选择城市'),
			array('dealer', 'require', '请选择经销商'),
			array('cartype', 'require', '请选择车型'),
			array('cartime', 'require', '请选择购车时间'),
		);
		$data = $_POST;	
		$ret = $form->validateForm($guize, $data);

		if($ret) {

			$dealer = explode('|###|', $data['dealer']);
			$province_id = $dealer[1];//省份ID
			$city_id = $dealer[2];//城市ID
			$code = $dealer[3];//code
			$cartime = explode('|###|', $data['cartime']);
			$cartime_id = $cartime[1];
			$cartype = explode('|###|', $data['cartype']);

			switch ($cartime_id)
			{
				case '1':
					$level = 'A';
					break;  
				case '2':
					$level = 'B';
					break;
				default:
					$level = 'C';
			}
			
			//汽车频道接口所需参数------【活动有以下参数才传值，没有不需要传   *********电话+数据创建时间**********为必填项】
			$param_arr['name']	= $_POST['name'];//姓名
			$param_arr['tel']= $_POST['phone'];//电话*（必填）
			$param_arr['brand']= '科雷傲';//用户欲购买的意向车品牌
			$param_arr['chexi']	= '';//用户欲购买的意向车系
			$param_arr['chekuan'] = '';//用户欲购买的意向车型
			$param_arr['sex']	= '';//性别（1男，0女）
			$param_arr['ip']	= MinisiteFunction::GetIP();//IP
			$param_arr['province']	= $_POST['province'];//省份
			$param_arr['city']= $_POST['city'];//城市
			$param_arr['area']= '';//地区
			$param_arr['proj']	= $_POST['title'];//项目名称
			$param_arr['target_dealer'] = $dealer[0];//经销商
			$param_arr['gouche']	= '';//是否购车
			$param_arr['create_time']= date('Y-m-d');//数据创建时间*（必填）
			$param_arr['expect_buy_time']= '';//用户期望购车时间
			$param_arr['distribution_status']	= '';//数据是否分发
			$param_arr['customer_service'] ='';//客服处理状态
			$param_arr['status']	= '';//
			$param_arr['alter_time']= '';//数据最后修改时间
			$param_arr['source']= 'wap';//来源
			$param_arr['alter_account']= '';//数据修改账户
			$param_arr['post_time']	=date('Y-m-d');//数据提交时间
			$param_arr['link']	=$_POST['url'];//专题链接	
			
			$data['dealer'] = $dealer[0];
			$data['cartype'] = $cartype[0];
			$data['code'] = $code;
			$data['createdate'] = date('Y-m-d');
			$data['cartime'] = $cartime[0];
			$data['ip'] = MinisiteFunction::GetIP();
			$id = $model->add($data);	

			//科雷傲
			$param_esbHeader = '<esbHeader>';
			$param_esbHeader .= '<requestId>' . $this->create_guid() . '</requestId>';
			$param_esbHeader .= '<serviceName>PushMarkClue</serviceName>';
			$param_esbHeader .= '<requester>163auto</requester>';
			$param_esbHeader .= '<key>40EC916DAC3D5FDCE0538405DF0A77F1</key>';
			$param_esbHeader .= '<receiver>CIP-PCM</receiver>';
			$param_esbHeader .= '<serviceOperation></serviceOperation>';
			$param_esbHeader .= '<serviceVersion>1.0</serviceVersion>';
			$param_esbHeader .= '</esbHeader>';

			$param_payload = '<root>';  
			$param_payload .= '<PushMarkClueReq>';
            $param_payload .= '<SystemCode>163auto</SystemCode>';
            $param_payload .= '<CLUES>';

            $param_payload_clues = '    <Clue>';
            $param_payload_clues .= '        <ORIGIN_ID>' . $this->create_guid() . '</ORIGIN_ID>';                //线索在原系统中的主键值
            $param_payload_clues .= '        <CustomerName>' . $_POST['name'] . '</CustomerName>';     //客户姓名
            $param_payload_clues .= '        <MobilePhone>' . $_POST['phone'] . '</MobilePhone>';       //联系电话
            $param_payload_clues .= '        <InfoChanDCode>' . $_POST['smart'] . '</InfoChanDCode>';              //渠道小类编码
            $param_payload_clues .= '        <CampaignID>' . $_POST['campaign'] . '</CampaignID>';              //活动站点ID
            $param_payload_clues .= '        <ExhiID></ExhiID>';                            //车展站点ID
            $param_payload_clues .= '        <CustomerLVCode>' . $level . '</CustomerLVCode>';           //意向级别编码
            $param_payload_clues .= '        <NEEDCLEAN>1</NEEDCLEAN>';                     //是否需要清洗
            $param_payload_clues .= '        <DlrCode>' . $code . '</DlrCode>';                     //专营店编码
            $param_payload_clues .= '        <CustomerType>0</CustomerType>';               //客户类型
            $param_payload_clues .= '        <Sex>' . $_POST['sex'] . '</Sex>';             //性别
            $param_payload_clues .= '        <IsTestData>0</IsTestData>';                   //是否测试数据
            $param_payload_clues .= '        <CreateTime>' . date('Y-m-d H:i:s') . '</CreateTime>'; //创建时间
            $param_payload_clues .= '        <TradeCode></TradeCode>';                    //行业编码
            $param_payload_clues .= '        <JobCode></JobCode>';                          //职业编码
            $param_payload_clues .= '        <EduCode></EduCode>';                          //教育背景编码
            $param_payload_clues .= '        <IncomeCode></IncomeCode>';                   //年收入编码
            $param_payload_clues .= '        <ProvinceID>' . $province_id . '</ProvinceID>';                  //省份ID
            $param_payload_clues .= '        <CityID>' . $city_id . '</CityID>';                       //城市ID
            $param_payload_clues .= '        <CountyID></CountyID>';                        //区县ID
            $param_payload_clues .= '        <Address></Address>';      //具体地址
            $param_payload_clues .= '        <Birthday></Birthday>';              //生日
            $param_payload_clues .= '        <CredTypeCode></CredTypeCode>';                //证件类型编码
            $param_payload_clues .= '        <CredNO></CredNO>';                            //证件号码
            $param_payload_clues .= '        <CompName></CompName>';                        //公司名称
            $param_payload_clues .= '        <DriveAge></DriveAge>';                        //驾龄
            $param_payload_clues .= '        <Email></Email>';                              //Email
			$param_payload_clues .= '                    <EnName></EnName>';                            //英文姓名
			$param_payload_clues .= '                    <IsLicense></IsLicense>';                      //是否有驾照
			$param_payload_clues .= '                    <ZipCode></ZipCode>';                    //邮政编码
			$param_payload_clues .= '                    <ColorCode></ColorCode>';                      //外观颜色编码
			$param_payload_clues .= '                    <InnerColorCode></InnerColorCode>';            //内饰颜色编码
			$param_payload_clues .= '                    <InteSeriesCode>' . $cartype[1] . '</InteSeriesCode>';            //意向车系编码
			$param_payload_clues .= '                    <TerminalCode></TerminalCode>';                //数据采集终端设备
			$param_payload_clues .= '                    <IntePriceCode></IntePriceCode>';              //意向价格区间编码
			$param_payload_clues .= '                    <BuyPlanTimeCod>' . $cartime_id . '</BuyPlanTimeCod>';            //计划购车时间编码
			$param_payload_clues .= '                    <BuyWayCode></BuyWayCode>';                    //购车方式编码
			$param_payload_clues .= '                    <CREATOR></CREATOR>';                          //创建人
			$param_payload_clues .= '                    <MODIFIER></MODIFIER>';                        //修改人
			$param_payload_clues .= '                    <LastUpdateDate></LastUpdateDate>';            //修改时间
			$param_payload_clues .= '                    <REMARK></REMARK>';                            //备注
			$param_payload_clues .= '                    <REG_LEVEL></REG_LEVEL>';                      //线索质量级别
			$param_payload_clues .= '                    <REGIST_POSITIO>CAMP</REGIST_POSITIO>';            //留资位置
			$param_payload_clues .= '                    <IP_ADDRESS></IP_ADDRESS>';                    //客户留资IP地址
			$param_payload_clues .= '                    <SYSTEM_CODE>163auto</SYSTEM_CODE>';          //系统编码
			$param_payload_clues .= '       </Clue>';
			
			$aescbc = new AESMcrypt();
			$aescbc->defaultKey = '40EC916DAC3D5FDCE0538405DF0A77F1';
			//$aescbc->iv = '\x12\x34\x56\x78\x90\xAB\xCD\xEF\...........';

			$aescbc->iv = "\x12\x34\x56\x78\x90\xAB\xCD\xEF\x12\x34\x56\x78\x90\xAB\xCD\xEF";
			$param_payload_clues = $aescbc->encrypt($param_payload_clues);

			$param_payload = $param_payload . base64_encode($param_payload_clues);
			$param_payload .= '       </CLUES>';
			$param_payload .= '       </PushMarkClueReq>';
			$param_payload .= '</root>';

		//$client = new nusoap_client('http://113.57.195.135:7080/webService/netwsdlGongWang?wsdl',true);	
		$client = new nusoap_client('http://113.57.195.134:7080/webService/netwsdlGongWang?wsdl',true);	
		$client->soap_defencoding = 'UTF-8';  
		$client->decode_utf8 = false;
		$client->xml_encoding = 'UTF-8';
		$param = array(
			'esbHeader' => $param_esbHeader,	
			'payload' => $param_payload,	
		);
		$result = $client->call('EsbInterfaceService', $param, '', '', false, true);
//		if (!$err=$client->getError()) {
//			//echo " 程序返回 :",htmlentities($result,ENT_QUOTES);
//			var_dump($result);
//		} else { 
//			echo " 错误 :",htmlentities($err,ENT_QUOTES);
//		}
//		die;
//echo $id;
//var_dump($result);
			//$status = $this->t($param_esbHeader, $param_payload);
			//var_dump($status);die;
			//把数据传给公共方法
			//汽车频道接口地址
			$data1['result'] = $result['esbInterfaceServiceResult'];
			$model->where("id='" . $id . "'")->save($data1);
			$api_url='http://usercenter.ws.netease.com/data/receive/push.json';	
			$car_result = $this->sendCarInfo($api_url,$param_arr);	
			$this->ajaxReturn($car_result->statusCode, '信息收集成功', 1);
			$this->ajaxReturn('', '信息收集成功', 1);
		} else {
			$errorInfo = $form->getFormInfo();
			$this->ajaxReturn($errorInfo, '收集失败', -1);
		}
	}

	private function create_guid() {
		$charid = strtoupper(md5(uniqid(mt_rand(), true)));
		$hyphen = chr(45);// "-"
		$uuid = '' 
		//$uuid = chr(123)// "{"
		.substr($charid, 0, 8).$hyphen
		.substr($charid, 8, 4).$hyphen
		.substr($charid,12, 4).$hyphen
		.substr($charid,16, 4).$hyphen
		.substr($charid,20,12);
		//.chr(125);// "}"
		return $uuid;
    }	

	private function t($param_esbHeader, $param_payload)
	{
		$client = new nusoap_client('http://113.57.195.135:7080/webService/netwsdlGongWang?wsdl',true);	
		$client->soap_defencoding = 'UTF-8';  
		$client->decode_utf8 = false;
		$client->xml_encoding = 'UTF-8';
		$param = array(
			'esbHeader' => $param_esbHeader,	
			'payload' => $param_payload,	
		);
		$result = $client->call('esbInterfaceService', $param, '', '', false, true);
		return $result;
	}
}

App::run();
?>