import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogLanding from './components/Blog/BlogLanding';
import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './components/Landing';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header title={'Blog'} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<BlogLanding />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
