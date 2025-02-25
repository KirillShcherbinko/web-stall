import './scss/styles.scss';

import { HeroModel } from './components/Model/HeroModel';
import { ServiceModel } from './components/Model/ServiceModel';
import { IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { CardView } from './components/View/CardView';
import { ensureElement } from './utils/utils';

const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;

const events = new EventEmitter();

const serviceModel = new ServiceModel(CDN_URL, API_URL);
const heroModel = new HeroModel(events);

////////// Отображение товаров на странице //////////
events.on('items:show', () => {
	heroModel.items.forEach((item) => {
		const cardView = new CardView(cardCatalogTemplate, events, {
			onClick: () => events.emit('item:select', item),
		});
		ensureElement<HTMLElement>('.gallery').append(cardView.render(item));
		console.log('Success');
	});
});

////////// Получение даннных с сервера //////////
serviceModel
	.getProductList()
	.then((data: IProduct[]) => {
		heroModel.items = data;
	})
	.catch((error) => console.error(error.message));

////////// Открытие модального окна товара //////////

events.on('modal:open', (item: IProduct) => {
	heroModel.preview(item);
});
