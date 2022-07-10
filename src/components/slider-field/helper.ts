export function getValue(values: number[], value: number): number {
	return values.findIndex((item: number, n: number, arr: number[]) => {
		if (item === value) {
			return true;
		}
		if (n === arr.length - 1 && value === arr[n]) {
			return true;
		}
		return item >= value && item <= arr[n];
	});
}
