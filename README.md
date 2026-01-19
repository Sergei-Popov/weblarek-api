# WebLarek API

REST API для интернет-магазина WebLarek.

## Запуск

```bash
npm install
npm start
```

Сервер запустится на `http://localhost:3000`

## Эндпоинты

### Товары (Product)

#### Получить список всех товаров

```
GET /api/weblarek/product/
```

**Ответ (200 OK):**

```json
{
	"total": 10,
	"items": [
		{
			"id": "854cef69-976d-4c2a-a18c-2aa45046c390",
			"description": "Если планируете решать задачи в тренажёре, берите два.",
			"image": "/5_Dots.svg",
			"title": "+1 час в сутках",
			"category": "софт-скил",
			"price": 750
		}
	]
}
```

#### Получить товар по ID

```
GET /api/weblarek/product/:id
```

**Параметры:**

- `id` — UUID товара

**Ответ (200 OK):**

```json
{
	"id": "854cef69-976d-4c2a-a18c-2aa45046c390",
	"description": "Если планируете решать задачи в тренажёре, берите два.",
	"image": "/5_Dots.svg",
	"title": "+1 час в сутках",
	"category": "софт-скил",
	"price": 750
}
```

**Ошибка (404 Not Found):**

```json
{
	"error": "NotFound"
}
```

---

### Заказы (Order)

#### Создать заказ

```
POST /api/weblarek/order
```

**Тело запроса:**

```json
{
	"payment": "online",
	"email": "test@test.ru",
	"phone": "+71234567890",
	"address": "Spb Vosstania 1",
	"total": 2200,
	"items": [
		"854cef69-976d-4c2a-a18c-2aa45046c390",
		"c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
	]
}
```

| Поле    | Тип      | Описание                         |
| ------- | -------- | -------------------------------- |
| payment | string   | Способ оплаты (`online`, `cash`) |
| email   | string   | Email покупателя                 |
| phone   | string   | Телефон покупателя               |
| address | string   | Адрес доставки                   |
| total   | number   | Общая сумма заказа               |
| items   | string[] | Массив ID товаров                |

**Ответ (200 OK):**

```json
{
	"id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
	"total": 2200
}
```

**Ошибки (400 Bad Request):**

Не указан адрес:

```json
{
	"error": "Не указан адрес"
}
```

Товар не найден:

```json
{
	"error": "Товар с id c101ab44-ed99-4a54-990d-47aa2bb4e7d не найден"
}
```

Неверная сумма:

```json
{
	"error": "Неверная сумма заказа"
}
```

---

## Категории товаров

- `софт-скил`
- `хард-скил`
- `другое`
- `дополнительное`
- `кнопка`

## CORS

API поддерживает CORS и доступен с любых доменов.
