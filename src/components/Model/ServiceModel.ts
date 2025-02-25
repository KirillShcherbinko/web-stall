import { IProduct, IValidatedOrderData, IOrderResult } from '../../types/index';
import { Api, ApiListResponse } from '../base/api';

interface IServiceModel {
	contentUrl: string;
	items: IProduct[];
	getProductList(): Promise<IProduct[]>;
	postValidatedOrderData(order: IValidatedOrderData): Promise<IOrderResult>;
}

export class ServiceModel extends Api implements IServiceModel {
	contentUrl: string;
	items: IProduct[];

	constructor(contentUrl: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this.contentUrl = contentUrl;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.contentUrl + item.image,
			}))
		);
	}

	postValidatedOrderData(order: IValidatedOrderData): Promise<IOrderResult> {
    return this.post('/order', order).then((data: IOrderResult) => data);
  }
}
