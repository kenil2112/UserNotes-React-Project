import { useState } from 'react'
import { Layout } from 'antd';
import '../App.css'
import { Button, Input, Radio, Card, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { addCard, deleteCard, updateCard } from '../store/UserNoteReducer'
import { AudioOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
            width: "auto"
        }}
    />
);


function AppContent() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const SelectedOptionss = useSelector(state => state.SelectedOption)

    const [IsEdit, setIsEdit] = useState(false);
    const [ShowPopup, setShowPopup] = useState(false);
    // 3 field value
    const [Initialvalue, setInitialValue] = useState("")
    const [SecondValue, setSecondValue] = useState("")
    const [SelectedValue, setSelectedValue] = useState("a");

    // SearchBar
    const [SearchQuery, setSearchQuery] = useState("");
    const [SSearch, setSSearch] = useState(false);
    // const [CustomSize, setCustomSize] = React.useState(0);

    const [EditableValue, setEditableValue] = useState([{
        id: "#0921821983", title: "maths"
        , note: "17000021", Radio: "a"
    }]);


    const OnClickHandleEvent = () => {
        setIsEdit(true);
    }

    const OnSubmitClick = (e) => {
        e.preventDefault();
        setInitialValue("");
        setSecondValue("");
        setSelectedValue("");
        dispatch(addCard({ title: Initialvalue, note: SecondValue, Radio: SelectedValue }))
    }

    const FirstInputChange = (e) => {
        ShowPopup ? HandleIdChange(e) : setInitialValue(e.target.value)
    }
    const HandleIdChange = (e) => {
        setEditableValue({ ...EditableValue, title: e.target.value });
    }


    const SecondInputChange = (e) => {
        ShowPopup ? HandleNoteChange(e) : setSecondValue(e.target.value)
    }
    const HandleNoteChange = (e) => {
        setEditableValue({ ...EditableValue, note: e.target.value });
    }

    const HandleRadioUpdate = (e) => {
        setSelectedValue(e.target.value);
    };
    const OnHandleRadioChange = (e) => {
        setEditableValue({ ...EditableValue, Radio: e.target.value });
    }

    const OnResetClick = () => {
        setInitialValue("");
        setSecondValue("");
        setSelectedValue("");
        setEditableValue([]);
        setSearchQuery("");
        setSSearch(false);
        setShowPopup(false)
    }
    const OnCloseClick = () => {
        setIsEdit(false);
    }

    const OnSaveClick = (idd) => {
        dispatch(updateCard({
            id: idd, title: EditableValue.title,
            note: EditableValue.note, Radio: EditableValue.Radio
        }))
        setEditableValue({ id: '', note: '', date: '', Radio: '' });
        setShowPopup(false);
    }

    const OnUpdateClick = (item) => {
        setShowPopup(true);
        setEditableValue(item)
    }

    const OnDeleteClick = (id) => {
        dispatch(deleteCard(id))
    }

    const ChangeHandleSearch = (e) => {
        setSearchQuery(e.target.value)
    }
    const onSearchClick = () => setSSearch(true);
    const OnRemoveSearchClick = () => { setSSearch(false); setSearchQuery(""); }


    return (

        <Content className="ContentCSS">
            <div id='primediv' className='property1'>
                {
                    IsEdit ?
                        // <Space direction='vertical' size={CustomSize}>
                        <div className='ContentDiv'>
                            <div className='SearchDiv'>
                                {/* <Space
                                direction="horizontal"
                            // size={'large'}
                            > */}
                                <Search placeholder="input search text" className='SearchBar'
                                    value={SearchQuery}
                                    onChange={(e) => ChangeHandleSearch(e)}
                                    onSearch={() => onSearchClick()} enterButton />
                                <Button onClick={OnRemoveSearchClick} className='SearchCancelButton'
                                    type='primary'
                                >
                                    Cancel
                                </Button>
                                {/* </Space> */}
                            </div>

                            <Input type="text" className='inputfield1'
                                value={ShowPopup ? EditableValue.title : Initialvalue}
                                onChange={(e) => FirstInputChange(e)} placeholder='Title' />


                            <Input placeholder='Take a note...'
                                value={ShowPopup ? EditableValue.note : SecondValue}
                                onChange={(e) => SecondInputChange(e)}
                                className='textareainput TextAreaInput'
                            >
                            </Input>

                            <Radio.Group
                                onChange={ShowPopup ? OnHandleRadioChange : HandleRadioUpdate}
                                value={ShowPopup ? EditableValue.Radio : SelectedValue}
                                style={{ marginBottom: "5px" }}>
                                <Radio value={'a'}>Option A</Radio>
                                <Radio value={'b'}>Option B</Radio>
                                <Radio value={'c'}>Option C</Radio>
                                <Radio value={'d'}>Option D</Radio>
                            </Radio.Group>
                            {/* <Space direction='horizontal'> */}
                            <Button type="primary"
                                onClick={ShowPopup ? () => OnSaveClick(EditableValue.id) : OnSubmitClick}
                            >
                                {ShowPopup ? "Save" : "Submit"}

                            </Button>
                            <Button type='primary'
                                className='CancelButton'
                                onClick={OnCloseClick}
                            >Close
                            </Button>
                            <Button type='primary'
                                className='CancelButton'
                                onClick={OnResetClick}
                            >Reset
                            </Button>
                            {/* </Space> */}
                        </div>
                        // </Space>
                        :
                        <div className="ClickedDiv" onClick={OnClickHandleEvent}
                        >
                            Take a note...
                        </div>
                }
            </div>




            {/* card */}
            <div className="card-container">
                {/* const filteredData = data.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
                ); */}
                {todos
                    .filter((item) =>
                        SSearch
                            ? item.title.toLowerCase() === SearchQuery.toLowerCase()
                            : SelectedOptionss === "All"
                                ? item.Radio === item.Radio
                                : item.Radio === SelectedOptionss
                    )
                    .map((item) => (
                        <div key={item.id} id={item.id} className='card'>
                            <Card
                                title={item.title || "No title"}
                                bordered={false}
                            >
                                <p>{item.note}</p>
                                <p>checked: {item.Radio}</p>
                            </Card>

                            <Button
                                type="primary"
                                className='UpdateButton'
                                onClick={() => OnUpdateClick(item)}
                            >
                                Update
                            </Button>

                            <Button
                                type="primary"
                                onClick={() => OnDeleteClick(item.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                {/* {SSearch ? todos.filter((item) => item.title.toLowerCase() === SearchQuery.toLowerCase()).map((item) => (
                    <div key={item.id} id={item.id} className='card'>
                        <Card
                            title={item.title || "No title"}
                            bordered={false}
                        >
                            <p>{item.note}</p>
                            <p>checked: {item.Radio}</p>
                        </Card>


                        <Button type="primary" className='UpdateButton'
                            onClick={() => UpdateValue(item)}
                        > Update</Button>

                        <Button type="primary"
                            onClick={() => OnDeleteClick(item.id)}
                        >Delete</Button>
                    </div>
                ))
                    : todos.filter(item => SelectedOptionss === "All" ? item.Radio === item.Radio : item.Radio === SelectedOptionss).map((item) => (
                        <div key={item.id} id={item.id} className='card'>
                            <Card
                                title={item.title || "No title"}
                                bordered={false}
                            >
                                <p>{item.note}</p>
                                <p>checked: {item.Radio}</p>
                            </Card>


                            <Button type="primary" className='UpdateButton'
                                onClick={() => UpdateValue(item)}
                            > Update</Button>

                            <Button type="primary"
                                onClick={() => OnDeleteClick(item.id)}
                            >Delete</Button>
                        </div>
                    ))
                } */}
            </div>
        </Content>
    )
}

export default AppContent
