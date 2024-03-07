import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;
import '../App.css'
import { Bounce, Flip, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function HHeader() {
    const notify = () => toast("Wow so easy!");

    return (
        <Header className='HHEader'>
            <div>
                <button onClick={notify}>Notify!</button>
                <ToastContainer position="top-center" theme='pink' transition={Flip} autoClose={500} />
            </div>
        </Header>
    )
}

export default HHeader
