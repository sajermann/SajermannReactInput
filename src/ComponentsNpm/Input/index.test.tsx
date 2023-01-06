/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { Input } from '.';

describe('Components/Input', () => {
	test(`must fire onChange event`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input label="Test" onChange={mockOnChange} data-testid="Test" />
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: '5' } });
		expect(mockValue).toBeCalledWith('5');
	});

	test(`must test onBeforeChange.removeLowerCase`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{ removeLowerCase: true }}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: 'BANaANnA' } });
		expect(mockValue).toBeCalledWith('BANANA');
	});

	test(`must test onBeforeChange.removeUpperCase`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{ removeUpperCase: true }}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: 'banAanNa' } });
		expect(mockValue).toBeCalledWith('banana');
	});

	test(`must test onBeforeChange.removeNumber`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{ removeNumber: true }}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: 'Tes1t2' } });
		expect(mockValue).toBeCalledWith('Test');
	});

	test(`must test onBeforeChange.removeSpecialCharacter`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{ removeSpecialCharacter: true }}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: 'T#e!s^t' } });
		expect(mockValue).toBeCalledWith('Test');
	});

	test(`must test onBeforeChange.regexForReplace`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{ regexForReplace: /[1-5]/g }}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: '1234567890' } });
		expect(mockValue).toBeCalledWith('67890');
	});

	test(`must test onBeforeChange.applyMask.currency`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{
					applyMask: {
						currency: {
							decimalPlace: 2,
						},
					},
				}}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: '2399' } });
		expect(mockValue).toBeCalledWith('R$ 23,99');
	});

	test(`must test onBeforeChange.applyMask.cnpj`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{
					applyMask: {
						cnpj: true,
					},
				}}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: '11111111111111' } });
		expect(mockValue).toBeCalledWith('11.111.111/1111-11');
	});

	test(`must test onBeforeChange.applyMask.cpf`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{
					applyMask: {
						cpf: true,
					},
				}}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: '11111111111' } });
		expect(mockValue).toBeCalledWith('111.111.111-11');
	});

	test(`must test onBeforeChange.applyMask.cep`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{
					applyMask: {
						cep: true,
					},
				}}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: '11111111' } });
		expect(mockValue).toBeCalledWith('11111-111');
	});

	test(`must test onBeforeChange.fn`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				label="Test"
				onChange={mockOnChange}
				data-testid="Test"
				onBeforeChange={{
					fn: e => {
						const temp = { ...e };
						const valueWithFormat = temp.target.value.replace(
							'Very Good - ',
							''
						);

						temp.target.value = `Very Good - ${valueWithFormat}`;

						return temp;
					},
				}}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: 'Test' } });
		expect(mockValue).toBeCalledWith('Very Good - Test');
	});

	test(`must test debounce`, async () => {
		const mockValue = vi.fn();
		const mockOnChange = (e: any) => mockValue(e.target.value);
		const { getByTestId } = render(
			<Input
				labelProps={<div>Test</div>}
				onChange={mockOnChange}
				data-testid="Test"
				debounce={500}
			/>
		);
		const input = getByTestId('Test');
		fireEvent.change(input, { target: { value: 'Test' } });
		await waitFor(() => {
			expect(mockValue).toBeCalledWith('Test');
		});
	});
});
