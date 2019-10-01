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
		
		let wrapper = DIV({
			c : [
			H1({
				c : MSG('TITLE')
			}),
			
			P({
				c : MSG('DESCRIPTION')
			}),
			
			DIV({
				c : [
				H2({
					c : MSG('CREATED_ACCOUNT_ID')
				}),
				P({
					c : wallet.getChecksumAddressString()
				})]
			}),
			
			DIV({
				c : [
				H2({
					c : MSG('MNEMONIC')
				}),
				P({
					c : mnemonic
				}),
				P({
					c : MSG('BACKUP_NOTICE_1') + '\n\n' + MSG('BACKUP_NOTICE_2')
				})]
			}),
			
			UUI.V_CENTER({
				style : {
					marginTop : 10,
					width : 326,
					height : 66,
					backgroundImage : '/DPlayCreateAccount/R/button.png',
					cursor : 'pointer',
					textAlign : 'center'
				},
				c : MSG('REGENERATE_ACCOUNT_BUTTON'),
				on : {
					tap : () => {
						REFRESH();
					}
				}
			})]
		}).appendTo(BODY);
		
		inner.on('close', () => {
			wrapper.remove();
		});
	}
});