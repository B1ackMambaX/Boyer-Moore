# Boyer-Moore
## Постановка задачи
Реализовать алгоритм Бойер-Мура, который за счет специальным образом организованнного процесса сопоставления шаблона и строки и предварительной обработки шаблона с помощью эвристик "хорошего суффикса" и "плохого символа" позволяет значительно ускорить поиск подстроки в строке.
## Сложность алгоритма
***3n*** сравнений в худшем случае при поиске первого совпадения с непериодничным образцом и ***O(n * m)*** при поиске всех вхождений.
## Параметры запуска
    arg[2]
файл со строкой в которой мы осуществляем поиск


