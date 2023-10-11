// Импорт необходимых модулей и компонентов
import './index.scss'; // Импорт стилей
import reportWebVitals from './reportWebVitals'; // Импорт функции для измерения производительности
import ReactDOM from "react-dom/client"; // Импорт ReactDOM для рендеринга компонентов в DOM
import React from "react"; // Импорт React
import App from "./App"; // Импорт корневого компонента приложения
import store from './components/Redux/redux-store'; // Импорт Redux-хранилища
import { Provider } from "react-redux"; // Импорт Provider из React Redux для связи Redux со всем приложением
import { DevSupport } from "@react-buddy/ide-toolbox"; // Импорт DevSupport для разработчика
import { ComponentPreviews, useInitial } from "./dev"; // Импорт компонентов для предварительного просмотра и функции useInitial
import { BrowserRouter } from "react-router-dom"; // Импорт BrowserRouter для обработки маршрутизации

// Создаем корневой элемент для рендеринга приложения
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение в корневой элемент
root.render(
    <React.StrictMode>
        {/*// Оборачиваем приложение в BrowserRouter для работы с маршрутами*/}
        <BrowserRouter>
            {/*// Предоставляем Redux-хранилище для всего приложения*/}
            <Provider store={store}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    {/*// Оборачиваем приложение в DevSupport для разработчика*/}
                    <App />
                    {/*// Рендерим компонент приложения*/}
                </DevSupport>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// Функция для измерения производительности вашего приложения
reportWebVitals();
