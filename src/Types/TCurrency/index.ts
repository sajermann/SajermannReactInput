import { TRealFormat } from '../TRealFormat';

export type TCurrency = {
	currency?: Pick<TRealFormat, 'value' | 'decimalPlace'>;
	cpf?: undefined;
	cnpj?: undefined;
	cep?: undefined;
};
