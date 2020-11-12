const { BigNumber } = require('ethers');
const { parseEther, formatEther } = require('ethers/lib/utils');
const fs = require('fs');

try {
	const file1 = fs.readFileSync('./holder-snap1.json', 'utf8');
	const file2 = fs.readFileSync('./holder-snap2.json', 'utf8');
	const file3 = fs.readFileSync('./holder-snap3.json', 'utf8');

	const file4 = fs.readFileSync('./liq-snap1.json', 'utf8');
	const file5 = fs.readFileSync('./liq-snap2.json', 'utf8');
	const file6 = fs.readFileSync('./liq-snap3.json', 'utf8');

	// parse JSON string to JSON object
	const data1 = JSON.parse(file1);
	const data2 = JSON.parse(file2);
	const data3 = JSON.parse(file3);

	const data4 = JSON.parse(file4);
	const data5 = JSON.parse(file5);
	const data6 = JSON.parse(file6);

	// print all databases

	let snap1Supply = 45500;
	let snap2Supply = 13000;
	let snap3Supply = 6500;

	const balance1 = 51131.41977538134;
	const balance2 = 53862.33471932199;
	const balance3 = 96704.47641222835;

	const formattedData1 = data1.users
		.flatMap((ele) => {
			if (ele.balance === '0') {
				return [];
			}
			let liqBalanceToAdd = 0;
			data4.users.forEach((liqEle) => {
				if (liqEle.address == ele.address) {
					liqBalanceToAdd = liqEle.debaseBalance;
				}
			});

			const newBalance =
				(parseFloat(formatEther(ele.balance)) + parseFloat(formatEther(liqBalanceToAdd))) /
				balance1 *
				snap1Supply;
			return [ { address: ele.address, balance: newBalance } ];
		})
		.sort((e1, e2) => e2.balance - e1.balance);

	const formattedData2 = data2.users
		.flatMap((ele) => {
			if (ele.balance === '0') {
				return [];
			}
			let liqBalanceToAdd = 0;
			data5.users.forEach((liqEle) => {
				if (liqEle.address == ele.address) {
					liqBalanceToAdd = liqEle.debaseBalance;
				}
			});
			const newBalance =
				(parseFloat(formatEther(ele.balance)) + parseFloat(formatEther(liqBalanceToAdd))) /
				balance2 *
				snap2Supply;
			return [ { address: ele.address, balance: newBalance } ];
		})
		.sort((e1, e2) => e2.balance - e1.balance);

	const formattedData3 = data3.users
		.flatMap((ele) => {
			if (ele.balance === '0') {
				return [];
			}
			let liqBalanceToAdd = 0;
			data6.users.forEach((liqEle) => {
				if (liqEle.address == ele.address) {
					liqBalanceToAdd = liqEle.debaseBalance;
				}
			});
			const newBalance =
				(parseFloat(formatEther(ele.balance)) + parseFloat(formatEther(liqBalanceToAdd))) /
				balance3 *
				snap3Supply;
			return [ { address: ele.address, balance: newBalance } ];
		})
		.sort((e1, e2) => e2.balance - e1.balance);

	let data = JSON.stringify(formattedData1);
	fs.writeFileSync('./snap1-air-drop.json', data);

	data = JSON.stringify(formattedData2);
	fs.writeFileSync('./snap2-air-drop.json', data);

	data = JSON.stringify(formattedData3);
	fs.writeFileSync('./snap3-air-drop.json', data);
} catch (err) {
	console.log(`Error reading file from disk: ${err}`);
}
