import { Test, Subject, GameCourse } from '@/types';

export const subjects: Subject[] = [
  { id: 'math-5-1', name: 'Математика', grade: 5, quarter: 1, description: 'Натуральные числа и действия с ними' },
  { id: 'math-5-2', name: 'Математика', grade: 5, quarter: 2, description: 'Дроби: обыкновенные и десятичные' },
  { id: 'math-6-1', name: 'Математика', grade: 6, quarter: 1, description: 'Делимость чисел' },
  { id: 'russian-5-1', name: 'Русский язык', grade: 5, quarter: 1, description: 'Фонетика и орфография' },
  { id: 'russian-5-2', name: 'Русский язык', grade: 5, quarter: 2, description: 'Морфология' },
  { id: 'english-5-1', name: 'Английский язык', grade: 5, quarter: 1, description: 'Present Simple' },
  { id: 'history-5-1', name: 'История', grade: 5, quarter: 1, description: 'Древний мир' },
];

export const tests: Test[] = [
  {
    id: 'math-5-fractions-1',
    subject: 'Математика',
    topic: 'Дроби',
    grade: 5,
    variant: 1,
    timeLimit: 45,
    totalPoints: 100,
    createdBy: 'никитовский',
    questions: [
      {
        id: 1,
        text: 'Сократите дробь:\n12/18 =\n25/100 =',
        correctAnswer: '12/18 = 2/3\n25/100 = 1/4',
        points: 20
      },
      {
        id: 2,
        text: 'Сравните дроби (поставьте знак <, > или =):\n3/5 ... 2/3\n4/7 ... 5/9',
        correctAnswer: '3/5 < 2/3\n4/7 > 5/9',
        points: 20
      },
      {
        id: 3,
        text: 'Выполните сложение:\n2/5 + 1/5 =\n3/8 + 1/4 =',
        correctAnswer: '2/5 + 1/5 = 3/5\n3/8 + 1/4 = 5/8',
        points: 20
      },
      {
        id: 4,
        text: 'Решите задачу:\nВ классе 30 учеников. 2/5 из них занимаются спортом. Сколько учеников занимаются спортом?',
        correctAnswer: '30 × 2/5 = 12 учеников',
        points: 20
      },
      {
        id: 5,
        text: 'Найдите значение выражения:\n(3/4 + 1/2) - 1/8 =',
        correctAnswer: '(3/4 + 1/2) - 1/8 = 9/8',
        points: 20
      }
    ]
  },
  {
    id: 'math-5-fractions-2',
    subject: 'Математика',
    topic: 'Дроби',
    grade: 5,
    variant: 2,
    timeLimit: 45,
    totalPoints: 100,
    createdBy: 'никитовский',
    questions: [
      {
        id: 1,
        text: 'Сократите дробь:\n15/20 =\n36/48 =',
        correctAnswer: '15/20 = 3/4\n36/48 = 3/4',
        points: 20
      },
      {
        id: 2,
        text: 'Сравните дроби:\n4/7 ... 3/5\n5/8 ... 7/12',
        correctAnswer: '4/7 > 3/5\n5/8 > 7/12',
        points: 20
      },
      {
        id: 3,
        text: 'Выполните сложение:\n3/7 + 2/7 =\n5/12 + 1/3 =',
        correctAnswer: '3/7 + 2/7 = 5/7\n5/12 + 1/3 = 9/12 = 3/4',
        points: 20
      },
      {
        id: 4,
        text: 'Решите задачу:\nКнига содержит 240 страниц. Ученик прочитал 3/8 книги. Сколько страниц он прочитал?',
        correctAnswer: '240 × 3/8 = 90 страниц',
        points: 20
      },
      {
        id: 5,
        text: 'Найдите значение выражения:\n(5/6 - 1/3) + 1/2 =',
        correctAnswer: '(5/6 - 1/3) + 1/2 = 1',
        points: 20
      }
    ]
  },
  {
    id: 'math-5-natural-1',
    subject: 'Математика',
    topic: 'Натуральные числа',
    grade: 5,
    variant: 1,
    timeLimit: 45,
    totalPoints: 100,
    createdBy: 'никитовский',
    questions: [
      {
        id: 1,
        text: 'Вычислите:\n245 + 387 =\n1024 - 567 =',
        correctAnswer: '245 + 387 = 632\n1024 - 567 = 457',
        points: 20
      },
      {
        id: 2,
        text: 'Найдите произведение:\n23 × 15 =\n48 × 25 =',
        correctAnswer: '23 × 15 = 345\n48 × 25 = 1200',
        points: 20
      },
      {
        id: 3,
        text: 'Выполните деление:\n144 : 12 =\n315 : 15 =',
        correctAnswer: '144 : 12 = 12\n315 : 15 = 21',
        points: 20
      },
      {
        id: 4,
        text: 'Решите задачу:\nВ магазин привезли 8 коробок с яблоками по 12 кг в каждой. Сколько килограммов яблок привезли?',
        correctAnswer: '8 × 12 = 96 кг',
        points: 20
      },
      {
        id: 5,
        text: 'Найдите значение выражения:\n(120 + 80) × 3 - 150 =',
        correctAnswer: '(120 + 80) × 3 - 150 = 450',
        points: 20
      }
    ]
  },
  {
    id: 'math-5-geometry-1',
    subject: 'Математика',
    topic: 'Площадь и периметр',
    grade: 5,
    variant: 1,
    timeLimit: 45,
    totalPoints: 100,
    createdBy: 'никитовский',
    questions: [
      {
        id: 1,
        text: 'Найдите периметр прямоугольника со сторонами 8 см и 5 см.',
        correctAnswer: 'P = (8 + 5) × 2 = 26 см',
        points: 20
      },
      {
        id: 2,
        text: 'Вычислите площадь квадрата со стороной 7 см.',
        correctAnswer: 'S = 7 × 7 = 49 см²',
        points: 20
      },
      {
        id: 3,
        text: 'Найдите площадь прямоугольника длиной 12 м и шириной 9 м.',
        correctAnswer: 'S = 12 × 9 = 108 м²',
        points: 20
      },
      {
        id: 4,
        text: 'Периметр квадрата равен 36 см. Найдите длину его стороны.',
        correctAnswer: 'a = 36 : 4 = 9 см',
        points: 20
      },
      {
        id: 5,
        text: 'Длина прямоугольника 15 см, а ширина в 3 раза меньше. Найдите периметр.',
        correctAnswer: 'b = 15 : 3 = 5 см\nP = (15 + 5) × 2 = 40 см',
        points: 20
      }
    ]
  },
];

export const gameCourses: GameCourse[] = [
  {
    id: 'chess',
    name: 'Обучение шахматам',
    type: 'chess',
    lessons: [
      { id: 'chess-1', title: 'Знакомство с доской и фигурами', videoUrl: '', description: 'Изучаем шахматную доску, название фигур и их расположение' },
      { id: 'chess-2', title: 'Как ходят фигуры', videoUrl: '', description: 'Правила движения каждой фигуры' },
      { id: 'chess-3', title: 'Шах и мат', videoUrl: '', description: 'Понятия шаха, мата и пата' },
      { id: 'chess-4', title: 'Дебют - начало партии', videoUrl: '', description: 'Основные принципы игры в дебюте' },
      { id: 'chess-5', title: 'Простые тактики', videoUrl: '', description: 'Вилка, связка, двойной удар' },
    ]
  },
  {
    id: 'checkers',
    name: 'Обучение шашкам',
    type: 'checkers',
    lessons: [
      { id: 'checkers-1', title: 'Правила игры в шашки', videoUrl: '', description: 'Доска, фигуры, цель игры' },
      { id: 'checkers-2', title: 'Ходы и взятие', videoUrl: '', description: 'Как ходить и бить шашки' },
      { id: 'checkers-3', title: 'Дамка', videoUrl: '', description: 'Превращение в дамку и её возможности' },
      { id: 'checkers-4', title: 'Основные комбинации', videoUrl: '', description: 'Простые выигрышные комбинации' },
    ]
  },
  {
    id: 'minecraft',
    name: 'Курс по Minecraft',
    type: 'minecraft',
    lessons: [
      { id: 'mc-1', title: 'Первый день в Minecraft', videoUrl: '', description: 'Создание мира, добыча ресурсов, первое укрытие' },
      { id: 'mc-2', title: 'Крафт и инструменты', videoUrl: '', description: 'Верстак, печь, базовые инструменты' },
      { id: 'mc-3', title: 'Строительство дома', videoUrl: '', description: 'Материалы, планирование, постройка' },
      { id: 'mc-4', title: 'Добыча руды и плавка', videoUrl: '', description: 'Шахты, руды, создание слитков' },
      { id: 'mc-5', title: 'Зачарование предметов', videoUrl: '', description: 'Стол зачарования, библиотеки' },
      { id: 'mc-6', title: 'Редстоун механизмы', videoUrl: '', description: 'Основы редстоуна, простые схемы' },
      { id: 'mc-7', title: 'Фермы и автоматизация', videoUrl: '', description: 'Фермы мобов, растений, ресурсов' },
      { id: 'mc-8', title: 'Незер и его опасности', videoUrl: '', description: 'Портал, биомы, крепости' },
      { id: 'mc-9', title: 'Край и дракон', videoUrl: '', description: 'Поиск крепости, портал, бой с драконом' },
      { id: 'mc-10', title: 'Постройки и дизайн', videoUrl: '', description: 'Продвинутое строительство' },
    ]
  }
];

export const initialUsers: User[] = [
  {
    id: 'admin-1',
    login: 'никитовский',
    name: 'Никитовский (Администратор)',
    role: 'admin',
    subscriptionMinutes: 999999,
    usedMinutes: 0
  }
];
