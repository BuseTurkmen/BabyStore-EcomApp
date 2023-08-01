import React from 'react'
import AppRouter from './routers/routers';
import MyNavbar from '../src/components/navbar/navbar'
import Footer from '../src/components/footer/footer'

function App() {
  return (
    <>
      <MyNavbar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;