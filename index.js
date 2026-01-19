import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware для парсинга JSON
app.use(express.json())

// CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200)
	}
	next()
})

// Хранилище данных (в памяти)
const products = [
	{
		id: '854cef69-976d-4c2a-a18c-2aa45046c390',
		description: 'Если планируете решать задачи в тренажёре, берите два.',
		image: '/5_Dots.svg',
		title: '+1 час в сутках',
		category: 'софт-скил',
		price: 750
	},
	{
		id: 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9',
		description:
			'Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.',
		image: '/Shell.svg',
		title: 'HEX-леденец',
		category: 'другое',
		price: 1450
	},
	{
		id: 'b06cde61-912f-4663-9751-09956c0eed67',
		description: 'Будет стоять над душой и не давать прокрастинировать.',
		image: '/Asterisk_2.svg',
		title: 'Мамка-таймер',
		category: 'софт-скил',
		price: null
	},
	{
		id: '412bcf81-7e75-4e70-bdb9-d3c73c9803b7',
		description:
			'Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.',
		image: '/Soft_Flower.svg',
		title: 'Фреймворк куки судьбы',
		category: 'дополнительное',
		price: 2500
	},
	{
		id: '1c521d84-c48d-48fa-8cfb-9d911fa515fd',
		description: 'Если орёт кот, нажмите кнопку.',
		image: '/mute-cat.svg',
		title: 'Кнопка «Замьютить кота»',
		category: 'кнопка',
		price: 2000
	},
	{
		id: 'f3867296-45c7-4603-bd34-29cea3a061d5',
		description:
			'Чтобы научиться правильно называть модификаторы, без этого не обойтись.',
		image: 'Pill.svg',
		title: 'БЭМ-пилюлька',
		category: 'другое',
		price: 1500
	},
	{
		id: '54df7dcb-1213-4b3c-ab61-92ed5f845535',
		description: 'Измените локацию для поиска работы.',
		image: '/Polygon.svg',
		title: 'Портативный телепорт',
		category: 'другое',
		price: 100000
	},
	{
		id: '6a834fb8-350a-440c-ab55-d0e9b959b6e3',
		description: 'Даст время для изучения React, ООП и бэкенда',
		image: '/Butterfly.svg',
		title: 'Микровселенная в кармане',
		category: 'другое',
		price: 750
	},
	{
		id: '48e86fc0-ca99-4e13-b164-b98d65928b53',
		description: 'Очень полезный навык для фронтендера. Без шуток.',
		image: 'Leaf.svg',
		title: 'UI/UX-карандаш',
		category: 'хард-скил',
		price: 10000
	},
	{
		id: '90973ae5-285c-4b6f-a6d0-65d1d760b102',
		description: 'Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.',
		image: '/Mithosis.svg',
		title: 'Бэкенд-антистресс',
		category: 'другое',
		price: 1000
	}
]

let orders = []

// === PRODUCT ENDPOINTS ===

// GET /api/weblarek/product - получить все товары
app.get('/api/weblarek/product/', (req, res) => {
	res.json({
		total: products.length,
		items: products
	})
})

// === ORDER ENDPOINTS ===

// POST /api/weblarek/order - создать новый заказ
app.post('/api/weblarek/order', (req, res) => {
	const { payment, email, phone, address, items, total } = req.body

	// Проверка обязательных полей
	if (!address) {
		return res.status(400).json({ error: 'Не указан адрес' })
	}

	if (!payment || !email || !phone || !items || items.length === 0) {
		return res.status(400).json({
			error: 'Поля payment, email, phone, address и items обязательны'
		})
	}

	// Проверка существования товаров
	for (const itemId of items) {
		const product = products.find(p => p.id === itemId)
		if (!product) {
			return res.status(400).json({ error: `Товар с id ${itemId} не найден` })
		}
	}

	// Расчёт суммы заказа
	const calculatedTotal = items.reduce((sum, itemId) => {
		const product = products.find(p => p.id === itemId)
		return sum + (product.price || 0)
	}, 0)

	// Проверка суммы заказа
	if (total !== calculatedTotal) {
		return res.status(400).json({ error: 'Неверная сумма заказа' })
	}

	const newOrder = {
		id: crypto.randomUUID(),
		payment,
		email,
		phone,
		address,
		items,
		total
	}

	orders.push(newOrder)
	res.json({ id: newOrder.id, total: newOrder.total })
})

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`)
})
