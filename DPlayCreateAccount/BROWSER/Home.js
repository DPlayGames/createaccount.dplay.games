DPlayCreateAccount.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let mnemonic = bip39.generateMnemonic();
		
		let seed = bip39.mnemonicToSeed(mnemonic);
		
		let rootKey = ethereumjs.WalletHD.fromMasterSeed(seed);
		let hardenedKey = rootKey.derivePath('m/44\'/60\'/0\'/0');
		let childKey = hardenedKey.deriveChild(0);
		
		let wallet = childKey.getWallet();
		
		TITLE(MSG('TITLE'));
		
		let wrapper = UUI.PANEL({
			
			style : {
				position : 'absolute',
				left : 0,
				top : 0,
				width : '100%',
				minHeight : '100%',
				backgroundImage : '/DPlayCreateAccount/R/background.png'
			},
			
			contentStyle : {
				padding : 20,
				fontSize : 16,
				color : '#979b9b'
			},
			
			c : [
			H1({
				style : {
					fontSize : 35,
					marginBottom : 5,
					color : '#fff'
				},
				c : MSG('TITLE')
			}),
			
			P({
				c : MSG('DESCRIPTION')
			}),
			
			DIV({
				style : {
					marginTop : 20
				},
				c : [
				H2({
					style : {
						color : '#980100',
						fontWeight : 'bold'
					},
					c : MSG('CREATED_ACCOUNT_ID')
				}),
				P({
					style : {
						color : '#c2c0bd',
						fontWeight : 'bold'
					},
					c : wallet.getChecksumAddressString()
				})]
			}),
			
			DIV({
				style : {
					marginTop : 20
				},
				c : [
				H2({
					style : {
						color : '#980100',
						fontWeight : 'bold'
					},
					c : MSG('MNEMONIC')
				}),
				P({
					style : {
						color : '#c2c0bd',
						fontWeight : 'bold'
					},
					c : mnemonic
				}),
				P({
					style : {
						marginTop : 20
					},
					c : MSG('BACKUP_NOTICE_1')
				}),
				P({
					style : {
						marginTop : 10
					},
					c : MSG('BACKUP_NOTICE_2')
				})]
			}),
			
			UUI.V_CENTER({
				style : {
					marginTop : 20,
					width : 330,
					height : 33,
					backgroundImage : '/DPlayCreateAccount/R/button.png',
					cursor : 'pointer',
					textAlign : 'center',
					color : '#c2c0bd',
					fontWeight : 'bold'
				},
				c : MSG('REGENERATE_ACCOUNT_BUTTON'),
				on : {
					tap : () => {
						REFRESH();
					}
				}
			}),
			
			SELECT({
				style : {
					marginTop : 20,
					backgroundColor : '#1e1e1e',
					color : '#666',
					padding : '5px 8px',
					border : 'none',
					fontSize : 14
				},
				c : [OPTION({
					value : 'en',
					c : 'English'
				}), OPTION({
					value : 'ko',
					c : '한국어'
				}), OPTION({
					value : 'zh-TW',
					c : '繁體中文'
				}), OPTION({
					value : 'zh-CN',
					c : '简体中文'
				})],
				value : INFO.getLang(),
				on : {
					change : (e, select) => {
						INFO.changeLang(select.getValue());
					}
				}
			})]
		}).appendTo(BODY);
		
		inner.on('close', () => {
			wrapper.remove();
		});
	}
});