import { IProduct } from '../../types';
import { IEvents } from '../base/events';

interface IHeroModel {
	items: IProduct[];
	selectedItem: IProduct;
}

export class HeroModel implements IHeroModel {
	protected _items: IProduct[];
	selectedItem: IProduct;

	constructor(protected events: IEvents) {}

	get items(): IProduct[] {
		return this._items;
	}

	set items(items: IProduct[]) {
		this._items = items;
		this.events.emit('items:show');
	}

	preview(item: IProduct) {
		this.selectedItem = item;
		this.events.emit('modal:open');
	}
}
