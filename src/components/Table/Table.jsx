import {useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { RiRefreshLine } from "react-icons/ri";
import Forms from "../Form/Forms.jsx";
import "./Table.css"
const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState("");

    const API = "https://dummyjson.com/users"
    const fetchdata = async () => {
        setLoading(true);
        try{
            const response = await axios.get(API)
            console.log(response.data.users)
            setData(response?.data?.users)
            setLoading(false);
        }
        catch(error){
            if(error?.response?.status === 404){
                setError("Resource not found")
            }else{
                setError("Something went wrong!Please check your network connection")
            }
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchdata()
    },[])
    const filteredData = data.filter(
        (item) =>
            item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.company.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.company.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.address.country.toLowerCase().includes(searchText.toLowerCase())
    );
    const deleterow = (id) => {
     setData(data.filter(item => item.id !== id))
        toast.error("Row has been deleted successfully.")
    }
    const adduser = (user) => {
        let newId = 1;
        if (data.length > 0) {

            const lastObject = data[data.length - 1];
            newId = lastObject.id + 1;
        }
        user.id = newId;
        console.log(user, 26);
        setData([...data, user]);
        toast.success('User has been added!');
    };
   if(error){
       return <div>{error}</div>;
   }
    if(loading) {
        return    <div className="loader-container">
            <span className="loader"></span>
        </div>

    }
    return (
        <div>
        <Forms adduser={adduser} />
            <div className="Table__search-container">
                <div className="Table__container-item1">
                    <label htmlFor="Search">Search:</label>
                    <input
                        type="text"
                        placeholder="Search by Name, Company, Role, or Country"
                        id="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}

                    />
                </div>
                <div className="Table__container-item2">
                    <button onClick={fetchdata} className="Table__refresh-button">
                        <RiRefreshLine/> Refresh
                    </button>
                </div>

            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                    <th>S.NO</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Country</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>

                    {filteredData.length > 0 ? (
                        filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.company.name}</td>
                                <td>{item.company.title}</td>
                                <td>{item.address.country}</td>
                                <td>
                                    <button className="Table__deletebutton" onClick={() => deleterow(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>No data available</td>
                        </tr>
                    )}



                    </tbody>
            </table>
            </div>
        </div>
    )
}
export default Table
