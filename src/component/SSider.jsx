import React from 'react'

import { Layout, Menu } from 'antd';
import { setSelectedOption } from '../features/todo/todoSlice'
import { useDispatch } from 'react-redux'

const { Sider } = Layout;


function SSider() {
    const dispatch = useDispatch()

    const items = ["All", "a", "b", "c", "d"].map(
        (optiondata, index) => ({
            key: index.toString(),
            icon: `Option ${optiondata}`,
            onClick: () => handleItemClick(optiondata),
        }),
    );

    const handleItemClick = (option) => {
        dispatch(setSelectedOption(option));
    };


    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}
                items={items} />
        </Sider>
    )
}

export default SSider
