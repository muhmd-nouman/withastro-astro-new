interface UnicodeCharacterProps {
  character: string;
  name: string;
  code: string;
  htmlEntity: string;
  category: string;
  block: string;
  description: string;
}

export const unicodeData = {
  character: "★",
  name: "Star Symbol",
  code: "U+2605",
  htmlEntity: "&#9733;",
  category: "Symbol",
  block: "Miscellaneous Symbols",
  description: "The star symbol (★) is...",
};

export const symbolCategories = [
  {
    title: "Общие символы",
    symbols: [
      { char: "©", name: "Авторское право" },
      { char: "®", name: "Зарегистрированный товарный знак" },
      { char: "™", name: "Товарный знак" },
      { char: "€", name: "Евро" },
      { char: "£", name: "Фунт" },
      { char: "¥", name: "Иена" },
      { char: "°", name: "Градус" },
    ],
  },
  {
    title: "Валютные символы",
    symbols: [
      { char: "¢", name: "Цент" },
      { char: "£", name: "Фунт" },
      { char: "¤", name: "Валюта" },
      { char: "¥", name: "Иена" },
      { char: "֏", name: "Армянский драм" },
      { char: "؋", name: "Афгани" },
      { char: "৳", name: "Бангладешская така" },
      { char: "฿", name: "Тайский бат" },
      { char: "៛", name: "Камбоджийский риель" },
      { char: "₠", name: "Евро-валюта" },
      { char: "₡", name: "Коста-риканский колон" },
      { char: "₣", name: "Французский франк" },
      { char: "₤", name: "Итальянская лира" },
      { char: "₦", name: "Найра" },
      { char: "₧", name: "Испанская песета" },
      { char: "₨", name: "Рупия" },
      { char: "₩", name: "Вона" },
      { char: "₪", name: "Новый шекель" },
      { char: "₫", name: "Донг" },
      { char: "€", name: "Евро" },
      { char: "₭", name: "Кип" },
      { char: "₮", name: "Тугрик" },
      { char: "₱", name: "Песо" },
      { char: "₴", name: "Гривна" },
      { char: "₵", name: "Седи" },
      { char: "₸", name: "Тенге" },
      { char: "₹", name: "Индийская рупия" },
      { char: "₺", name: "Турецкая лира" },
      { char: "₼", name: "Манат" },
      { char: "₽", name: "Российский рубль" },
      { char: "₾", name: "Лари" },
      { char: "₿", name: "Биткойн" },
    ],
  },
  {
    title: "Маркированные списки",
    symbols: [
      { char: "•", name: "Маркер" },
      { char: "◦", name: "Белый маркер" },
      { char: "‣", name: "Треугольный маркер" },
      { char: "⁃", name: "Гипен маркер" },
      { char: "○", name: "Белый круг" },
      { char: "●", name: "Черный круг" },
      { char: "■", name: "Черный квадрат" },
    ],
  },
  {
    title: "Математические символы",
    symbols: [
      { char: "±", name: "Плюс-минус" },
      { char: "×", name: "Умножение" },
      { char: "÷", name: "Деление" },
      { char: "≠", name: "Не равно" },
      { char: "≤", name: "Меньше или равно" },
      { char: "≥", name: "Больше или равно" },
      { char: "∞", name: "Бесконечность" },
    ],
  },
  {
    title: "Стрелки",
    symbols: [
      { char: "←", name: "Левая стрелка" },
      { char: "→", name: "Правая стрелка" },
      { char: "↑", name: "Верхняя стрелка" },
      { char: "↓", name: "Нижняя стрелка" },
      { char: "↔", name: "Лево-право стрелка" },
      { char: "⇒", name: "Двойная правая стрелка" },
      { char: "⇐", name: "Двойная левая стрелка" },
    ],
  },
];
