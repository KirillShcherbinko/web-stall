import './scss/styles.scss';

// Интерфейс корзины товаров
interface IBasketModel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

// Интерфейс для функции события
interface IEventEmitter {
  emit: (event: string, data: unknown) => void;
}

// Класс для корзины товаров
class BasketModel implements IBasketModel{
  // Товары в корзине - мапа, где ключ - id, а значение - количество товаров
  public items: Map<string, number> = new Map();

  constructor(protected events: IEventEmitter) {}

  // Метод для добавления товара в корзину
  public add(id: string): void {
    if (!this.items.get(id)) this.items.set(id, 0);
    this.items.set(id, this.items.get(id) + 1);
  }

  // Метод для удаления товара из корзины
  public remove(id: string): void {
    // Товара нет в корзине
    if (!this.items.has(id)) return;

    // В корзине есть товары
    if (this.items.get(id) > 0) {
      this.items.set(id, this.items.get(id) - 1);
    }

    // В корзине не осталось товара
    if (this.items.get(id) === 0) this.items.delete(id);
  }

  protected _changed() {
    this.events.emit('basket:change', {items: Array.from(this.items.keys())})
  }
}