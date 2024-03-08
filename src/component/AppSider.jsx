import React from 'react'

import { Layout, Menu } from 'antd';
import { setSelectedOption } from '../store/UserNoteReducer'
import { useDispatch } from 'react-redux'

const { Sider } = Layout;


function AppSider() {
    const dispatch = useDispatch()
    const category = ["All", "a", "b", "c", "d"];
    const items = category.map(
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
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}
                items={items} />
        </Sider>
    )
}

export default AppSider
