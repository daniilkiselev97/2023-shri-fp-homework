import {
    __,
    allPass,
    any,
    compose,
    countBy,
    dissoc,
    equals,
    gte,
    identity,
    prop,
    values,
    propEq,
    complement,
} from 'ramda';

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// Операции сравнения

const greaterOrEqualsThenTwo = gte(__, 2);
const greaterOrEqualsThenThree = gte(__, 3)
const oneReds = propEq('red', 1);
const anyGreaterOrEqualsThenThree = any(greaterOrEqualsThenThree);
const anyValueGreaterOrEqualsThenThree = compose(anyGreaterOrEqualsThenThree, values);
const twoGreens = propEq('green', 2);



// Геттеры фигур
const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

// Cравнения цветов
const isRed = equals('red');
const isGreen = equals('green');
const isWhite = equals('white');
const dissocWhite = dissoc('white');  
const isBlue = equals('blue')
const isOrange = equals('orange')
const getGreen = prop('green');

// Все цвета

const numberOfColors = compose(countBy(identity), values); 

const numberOfColorsWhitoutWhite = compose(dissocWhite, numberOfColors);



/* Базовые композиции геттеров и сравнения цветов */

const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite,getStar)
const isWhiteSquare = compose(isWhite,getSquare)

const isGreenSquare = compose(isGreen, getSquare);
const isOrangeSquare = compose(isOrange, getSquare)

const isWhiteTriangle = compose(isWhite, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);

const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle )

const isNotRedStar = complement(isRedStar);  
const isNotWhiteStar = complement(isWhiteStar);
const isNotWhiteSquare = complement(isWhiteSquare)
const isNotWhiteTriangle = complement(isWhiteTriangle)

// Функции с специфичной для заданий логикой
const numberOfGreenColors = compose(getGreen, numberOfColors);

const redEqualsBlue = ({ blue, red }) => blue === red;
const squareEqualsTriangle = ({square, triangle}) => square === triangle;
const twoGreenColors = compose(twoGreens, numberOfColors);
const oneRedColor = compose(oneReds, numberOfColors);
const allHasColor = color => compose(propEq(color, 4), numberOfColors);

// 1. Красная звезда, зеленый квадрат, все остальные белые.

export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle,
]);

// 2. Как минимум две фигуры зеленые.

export const validateFieldN2 = compose(
    greaterOrEqualsThenTwo,
    numberOfGreenColors
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqualsBlue, numberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueGreaterOrEqualsThenThree, numberOfColorsWhitoutWhite)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, twoGreenColors, oneRedColor]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allHasColor('orange');

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar])

// 9. Все фигуры зеленые.
export const validateFieldN9 = allHasColor('green');

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle,squareEqualsTriangle])
