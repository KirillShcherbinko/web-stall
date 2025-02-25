import { EventEmitter } from "../base/events";

// Интерфейс корзины товаров
interface IBasketModel {
	readonly items: Map<string, number>; // Поле только для чтения
	add(id: string): void;
	remove(id: string): void;
}


// Класс для корзины товаров
export default class BasketModel implements IBasketModel {
	// Товары в корзине - мапа, где ключ - id, а значение - количество товаров
	private _items: Map<string, number> = new Map(); // Изменено на private

	// Принимаем на вход объект, который наследует класс отправки события 
	constructor(protected events: EventEmitter) {}

	// Геттер для items
	public get items(): Map<string, number> {
		return this._items;
	}

	// Метод для добавления товара в корзину
	public add(id: string): void {
		const count = this._items.get(id) || 0;
		this._items.set(id, count + 1);
		this._changed();
	}

	// Метод для удаления товара из корзины
	public remove(id: string): void {
		if (!this._items.has(id)) return;

		const count = this._items.get(id);
		if (count > 0) {
			this._items.set(id, count - 1);
		}

		if (this._items.get(id) === 0) this._items.delete(id);
		this._changed();
	}

	// Уведомление об изменении корзины
	protected _changed() {
		this.events.emit('basket:change', {
			items: Array.from(this._items.keys()),
		});
	}
}
