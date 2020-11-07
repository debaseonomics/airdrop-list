const { BigNumber } = require('ethers');
const { parseEther, formatEther } = require('ethers/lib/utils');
const fs = require('fs');

try {
	const file1 = fs.readFileSync('./holder-snap1.json', 'utf8');
	const file2 = fs.readFileSync('./holder-snap2.json', 'utf8');
	const file3 = fs.readFileSync('./holder-snap3.json', 'utf8');

	// parse JSON string to JSON object
	const data1 = JSON.parse(file1);
	const data2 = JSON.parse(file2);
	const data3 = JSON.parse(file3);

	// print all databases

	let snap1Supply = 70000;
	let snap2Supply = 20000;
	let snap3Supply = 10000;

	let balance1 = 40214.053700808756;
	let balance2 = 45935.811860364876;
	let balance3 = 75747.89080264188;

	const formatedData1 = data1.users
		.flatMap((ele) => {
			if (ele.balance === '0') {
				return [];
			}
			const newBalance = parseFloat(formatEther(ele.balance)) / balance1 * snap1Supply;
			return [ { address: ele.address, balance: newBalance } ];
		})
		.sort((e1, e2) => e2.balance - e1.balance);

	const formatedData2 = data2.users
		.flatMap((ele) => {
			if (ele.balance === '0') {
				return [];
			}
			const newBalance = parseFloat(formatEther(ele.balance)) / balance2 * snap2Supply;
			return [ { address: ele.address, balance: newBalance } ];
		})
		.sort((e1, e2) => e2.balance - e1.balance);

	const formatedData3 = data3.users
		.flatMap((ele) => {
			if (ele.balance === '0') {
				return [];
			}
			const newBalance = parseFloat(formatEther(ele.balance)) / balance3 * snap3Supply;
			return [ { address: ele.address, balance: newBalance } ];
		})
		.sort((e1, e2) => e2.balance - e1.balance);

	let data = JSON.stringify(formatedData1);
	fs.writeFileSync('./snap1-air-drop.json', data);

	data = JSON.stringify(formatedData2);
	fs.writeFileSync('./snap2-air-drop.json', data);

	data = JSON.stringify(formatedData3);
	fs.writeFileSync('./snap3-air-drop.json', data);
} catch (err) {
	console.log(`Error reading file from disk: ${err}`);
}
