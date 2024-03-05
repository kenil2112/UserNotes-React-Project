import { useState } from 'react'
import { Layout } from 'antd';
import '../App.css'
const { Content } = Layout;
import { Button, Input, Radio, Card, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { addCard, deleteCard, updateCard } from '../features/todo/todoSlice'
import { AudioOutlined } from '@ant-design/icons';

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


function CContent() {
    const [IsEdit, setIsEdit] = useState(false);
    const [ShowPopup, setShowPopup] = useState(false);
    // 3 field value
    const [Initialvalue, setInitialValue] = useState("")
    const [SecondValue, setSecondValue] = useState("")
    const [SelectedValue, setSelectedValue] = useState("a");

    // SearchBar
    const [SearchQuery, setSearchQuery] = useState("");
    const [SSearch, setSSearch] = useState(false);



    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const SelectedOptionss = useSelector(state => state.SelectedOption)

    const [EditableValue, setEditableValue] = useState([{
        id: "#0921821983", title: "maths"
        , note: "17000021", Radio: "a"
    }]);


    const HandleEvent = () => {
        setIsEdit(true);
    }

    const PrintArray = (e) => {
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
    const HandleRadioChange = (e) => {
        setEditableValue({ ...EditableValue, Radio: e.target.value });
    }

    const ResetValue = () => {
        setInitialValue("");
        setSecondValue("");
        setSelectedValue("");
        setEditableValue([]);
        setSearchQuery("");
        setShowPopup(false)
    }
    const CancelInput = () => {
        setIsEdit(false);
    }

    const EditData = (idd) => {
        dispatch(updateCard({
            id: idd, title: EditableValue.title,
            note: EditableValue.note, Radio: EditableValue.Radio
        }))
        setEditableValue({ id: '', note: '', date: '', Radio: '' });
        setShowPopup(false);
    }

    const UpdateValue = (item) => {
        setShowPopup(true);
        setEditableValue(item)
    }

    const DeleteValue = (id) => {
        dispatch(deleteCard(id))
    }

    const HandleSearch = (e) => {
        setSearchQuery(e.target.value)
    }
    const onSearch = () => setSSearch(true);
    const RemoveSearch = () => { setSSearch(false); setSearchQuery(""); }


    return (

        <Content className="ContentCSS">
            <div id='primediv' className='property1'>
                {
                    IsEdit ?
                        <div>
                            <div className='ContentDiv'>
                                <div className='SearchDiv'>
                                    <Search placeholder="input search text" className='SearchBar'
                                        value={SearchQuery}
                                        onChange={(e) => HandleSearch(e)}
                                        onSearch={() => onSearch()} enterButton />
                                    <Button onClick={RemoveSearch} className='SearchCancelButton'
                                        type='primary'
                                    >Cancel</Button></div>

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
                                    onChange={ShowPopup ? HandleRadioChange : HandleRadioUpdate}
                                    value={ShowPopup ? EditableValue.Radio : SelectedValue}
                                    style={{ marginBottom: "5px" }}>
                                    <Radio value={'a'}>Option A</Radio>
                                    <Radio value={'b'}>Option B</Radio>
                                    <Radio value={'c'}>Option C</Radio>
                                    <Radio value={'d'}>Option D</Radio>
                                </Radio.Group>

                                <Button type="primary"
                                    onClick={ShowPopup ? () => EditData(EditableValue.id) : PrintArray}
                                >
                                    {ShowPopup ? "Save" : "Submit"}

                                </Button>
                                <Button type='primary' className='CancelButton'
                                    onClick={CancelInput}>Cancel</Button>
                                <Button type='primary' className='CancelButton'
                                    onClick={ResetValue}>Reset</Button>

                            </div>
                        </div>
                        :
                        <div className="ClickedDiv" onClick={HandleEvent}
                        >Take a note...</div>
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
                                onClick={() => UpdateValue(item)}
                            >
                                Update
                            </Button>

                            <Button
                                type="primary"
                                onClick={() => DeleteValue(item.id)}
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
                            onClick={() => DeleteValue(item.id)}
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
                                onClick={() => DeleteValue(item.id)}
                            >Delete</Button>
                        </div>
                    ))
                } */}
            </div>
        </Content>
    )
}

export default CContent
