import { useState } from 'react'

import './App.css'
import { Layout } from 'antd';
import { AppHeader, AppContent, AppFooter, AppSider } from './component';

function App() {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider />
        <Layout>
          <AppHeader />
          <Layout style={{ backgroundColor: "#fff" }}>
            <AppContent />
            <AppFooter />
          </Layout>
        </Layout>

      </Layout >
    </>
  )
}

export default App
