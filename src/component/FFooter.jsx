import React from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;

function FFooter() {
    return (
        <Footer
            style={{
                textAlign: 'center',
                backgroundColor: "white"
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    )
}

export default FFooter
