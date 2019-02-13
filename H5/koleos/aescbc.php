<?php
	class AESMcrypt{


    /** 
     * 设置默认的加密key 32位
     * @var str 
	 * 为了保密省略后半部分
     */ 
    public static $defaultKey = "";

    /** 
     * 设置默认加密向量
     * @var str
	 * 为了保密省略后半部分
     */
	 
	//在.net中的格式为
	//$iv='{ 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF............}';
	//\x12\x34\x56\x78\x90\xAB\xCD\xEF\...........
	
    public $iv = "";
     
    /** 
     * 设置加密算法 
     * @var str 
     */ 
    private $cipher; 
     
    /** 
     * 设置加密模式 
     * @var str 
     */ 
    private $mode; 
     
    public function __construct($cipher = MCRYPT_RIJNDAEL_128, $mode = MCRYPT_MODE_CBC){ 
        $this->cipher = $cipher; 
        $this->mode = $mode; 
    } 
     
    /** 
     * 对内容加密，注意此加密方法中先对内容使用padding pkcs7，然后再加密。 
     * @param str $content    需要加密的内容 
     * @return str 加密后的密文 
     */ 
    public function encrypt($content){
        if(empty($content)){
            return null; 
        }
		
		$srcdata = $this->addPkcs7Padding($content);
        return mcrypt_encrypt($this->cipher, $this->getSecretKey(), $srcdata, $this->mode, $this->iv);
    }
	
	/**
	 * pkcs7补码
	 *
	 * @param string $string  明文
	 *
	 * @return String
	 */ 
	function addPkcs7Padding($string) {
		$blocksize = mcrypt_get_block_size($this->cipher, $this->mode);
		$len = strlen($string); //取得字符串长度
		$pad = $blocksize - ($len % $blocksize); //取得补码的长度
		$string .= str_repeat(chr($pad), $pad); //用ASCII码为补码长度的字符， 补足最后一段
		return $string;
	}

    /** 
     * 对内容解密，注意此加密方法中先对内容解密。再对解密的内容使用padding pkcs7去除特殊字符。 
     * @param String $content    需要解密的内容 
     * @return String 解密后的内容 
     */ 
    public function decrypt($content){ 
        if(empty($content)){ 
            return null; 
        } 

        $content = mcrypt_decrypt($this->cipher, $this->getSecretKey(), $content, $this->mode, $this->iv); 
        //$block = mcrypt_get_block_size($this->cipher, $this->mode); 
        $pad = ord($content[($len = strlen($content)) - 1]); 
        return substr($content, 0, strlen($content) - $pad); 
    }
	
	public function getSecretKey()
	{
		return $this->defaultKey;
	}
}
?>