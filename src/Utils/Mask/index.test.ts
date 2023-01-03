/**
 * @vitest-environment jsdom
 */

import { describe, expect } from 'vitest';
import { mask } from '.';

describe('Utils/Mask', () => {
	test(`must test real`, async () => {
		const valuesForConvert = [
			'1',
			'11',
			'111',
			'1111',
			'11111',
			'111111',
			'1111111',
			'11111111',
			'111111111',
			'1111111111',
		];
		const valuesExpecteds = [
			'0,01',
			'0,11',
			'1,11',
			'11,11',
			'111,11',
			'1.111,11',
			'11.111,11',
			'111.111,11',
			'1.111.111,11',
			'11.111.111,11',
		];

		for (let i = 0; i < valuesForConvert.length; i += 1) {
			const result = mask.real({ value: valuesForConvert[i] });
			expect(result).toBe(`R$ ${valuesExpecteds[i]}`);
		}

		const result1 = mask.real({ value: '1', decimalPlace: 3 });
		expect(result1).toBe(`R$ 0,001`);

		const result2 = mask.real({ value: new Error() as unknown as string });
		expect(result2).toBe(`R$ 0,00`);
	});

	test(`must test cnpj`, async () => {
		const valuesForConvert = [
			'1',
			'11',
			'111',
			'1111',
			'11111',
			'111111',
			'1111111',
			'11111111',
			'111111111',
			'1111111111',
			'11111111111',
			'111111111111',
			'1111111111111',
			'11111111111111',
		];
		const valuesExpecteds = [
			'1',
			'11',
			'11.1',
			'11.11',
			'11.111',
			'11.111.1',
			'11.111.11',
			'11.111.111',
			'11.111.111/1',
			'11.111.111/11',
			'11.111.111/111',
			'11.111.111/1111',
			'11.111.111/1111-1',
			'11.111.111/1111-11',
		];

		for (let i = 0; i < valuesForConvert.length; i += 1) {
			const result = mask.cnpj(valuesForConvert[i]);
			expect(result).toBe(`${valuesExpecteds[i]}`);
		}

		const result = mask.cnpj(new Error() as unknown as string);
		expect(result).toBe(``);
	});

	test(`must test cpf`, async () => {
		const valuesForConvert = [
			'1',
			'11',
			'111',
			'1111',
			'11111',
			'111111',
			'1111111',
			'11111111',
			'111111111',
			'1111111111',
			'11111111111',
		];
		const valuesExpecteds = [
			'1',
			'11',
			'111',
			'111.1',
			'111.11',
			'111.111',
			'111.111.1',
			'111.111.11',
			'111.111.111',
			'111.111.111-1',
			'111.111.111-11',
		];

		for (let i = 0; i < valuesForConvert.length; i += 1) {
			const result = mask.cpf(valuesForConvert[i]);
			expect(result).toBe(`${valuesExpecteds[i]}`);
		}

		const result = mask.cpf(new Error() as unknown as string);
		expect(result).toBe(``);
	});

	test(`must test cep`, async () => {
		const valuesForConvert = [
			'1',
			'11',
			'111',
			'1111',
			'11111',
			'111111',
			'1111111',
			'11111111',
		];
		const valuesExpecteds = [
			'1',
			'11',
			'111',
			'1111',
			'11111',
			'11111-1',
			'11111-11',
			'11111-111',
		];

		for (let i = 0; i < valuesForConvert.length; i += 1) {
			const result = mask.cep(valuesForConvert[i]);
			expect(result).toBe(`${valuesExpecteds[i]}`);
		}

		const result = mask.cep(new Error() as unknown as string);
		expect(result).toBe(``);
	});
});
