DPlayCreateAccount.MAIN = METHOD({

	run : () => {
		
		MSG.loadCSV('/DPlayCreateAccount/R/text.csv', () => {
			
			DPlayCreateAccount.MATCH_VIEW({
				uri : '',
				target : DPlayCreateAccount.Home
			});
		});
	}
});
