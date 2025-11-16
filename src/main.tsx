import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* 2. Bọc toàn bộ <App /> của bạn bằng <BrowserRouter> */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
