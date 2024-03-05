import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addCard, deleteCard, updateCard } from './features/todo/todoSlice'
import { Layout, Menu, theme } from 'antd';
import { HHeader, CContent, FFooter, SSider } from './component';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <SSider />

        <Layout>
          <HHeader />
          <Layout className='Layout'>
            <CContent />
          </Layout>
          <FFooter />
        </Layout>

      </Layout >
    </>
  )
}

export default App
