import React from "react";

function Categories({ value, onChangeCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {" "}
        {/* Используем анонимную функцию для вызова и передачи данных () => onClickCategory(0) */}
        {/* <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? 'active' : ''}>Все</li>  Параметр это индекс, который нам необходимо поставить active 
                <li onClick={() => onClickCategory(1)} className={activeIndex === 1 ? 'active' : ''}>Мясные</li> Вызываем функцию и передаем ей индекс куда кликнули 
                <li onClick={() => onClickCategory(2)} className={activeIndex === 2 ? 'active' : ''}>Вегетарианская</li>
                <li onClick={() => onClickCategory(3)} className={activeIndex === 3 ? 'active' : ''}>Гриль</li>
                <li onClick={() => onClickCategory(4)} className={activeIndex === 4 ? 'active' : ''}>Острые</li>
                <li onClick={() => onClickCategory(5)} className={activeIndex === 5 ? 'active' : ''}>Закрытые</li> */}
        {/* Продвинутый способ, с методом переиспользования и формировкой массива map, легко добавлять элементы */}
        {/* Рендер списка */}
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
