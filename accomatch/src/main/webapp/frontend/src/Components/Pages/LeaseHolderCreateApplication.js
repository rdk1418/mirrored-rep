import './LeaseHolderCreateApplication.css';
import {useRef, useState , useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import axios from 'axios';
import {useNavigate}  from 'react-router-dom';
import {imageUpload}  from '../../imageUpload';
export const LeaseHolderCreateApplication =() =>{

    const userRef =useRef();
    const errRef =useRef();

    const navigate =useNavigate();
    const [title, setTitle]= useState('');
    const [subtitle, setSubtitle] = useState('');
    const [address,setAddress] = useState('');
    const [location,setLocation] = useState('');
    const [size,setSize] = useState();
    const [roomType,setRoomType] = useState('');
    const [document,setDocument]=useState('');
    const [rent,setRent]=useState();
    const [otherPreferences,setOtherPreferences]=useState('');
    const [startDate,setStartDate]=useState();
    const [startAge,setStartAge]=useState();
    const [endAge,setEndAge]=useState();
    const [foodPreferences]=useState([]);
    const [genderPreferences]=useState([]);
    const [images]=useState([]);
    const [errMsg, setErrMsg] =useState ('');
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    }, [title,subtitle,address,location,size,roomType,document,rent,otherPreferences,startAge,startDate,endAge,foodPreferences,genderPreferences,images])
    const fileUpload=(file,isImage)=>{
        let data = imageUpload(file);
        if(isImage){
            images.push(data);
        } else{
            setDocument(data);
        }
    }

    const handleLoginSubmit =async (e) => {
        e.preventDefault();
        let bodyObj = {
            user_id:1,
            title,
            subtitle,
            address,
            location_city:location,
            size,
            room_type:roomType,
            document:'https://unsplash.com/photos/e616t35Vbeg',
            rent,
            other_preferences:otherPreferences,
            start_date:startDate,
            start_age:startAge,
            end_age:endAge,
            food_preferences:foodPreferences,
            gender_preferences:genderPreferences,
            images:['https://unsplash.com/photos/e616t35Vbeg']
        }

        fetch("http://localhost:8080/leaseHolder/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyObj),
        })
        .then((response) => {
            console.log(response);
            if(response.status===200){
                navigate("/posts");
            }
            return response.text(); // Read the response data as text
        })
        .then((data) => {
            console.log(data); // Log the response data
            if (data === "success") {
            setSuccess(true);
            } else {
            setErrMsg("Login failed. Please try again."); // Set an appropriate error message
            }
        })
        .catch((error) => {
            setErrMsg("An error occurred. Please try again."); // Set an appropriate error message
        });
        }

    return (
        <>
        {success ? (
            <section>
                <h1>
                   Your application created admin will approve your request
                </h1>
            <br/>
            <p>
                <a href="#">Go to Home</a>
            </p>

            </section>

        ):(

        
        <section>
            <p ref={errRef} className ={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Create House application</h1>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor ="title">Title:</label>
                <input 
                    type="text"
                    id="title"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setTitle (e.target.value)}
                    value={title}
                    required
                />
                 <label htmlFor ="subtitle">subtitle:</label>
                <input 
                    type="text"
                    id="subtitle"
                    onChange={(e) => setSubtitle(e.target.value)}
                    value={subtitle}
                    required
                />
                <label htmlFor ="address">address:</label>
                <input 
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                />
                <label htmlFor ="location">location:</label>
                <input 
                    type="text"
                    id="location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    required
                />
                <label htmlFor ="size">size:</label>
                <input 
                    type="Number"
                    id="size"
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    required
                />
                <label htmlFor ="roomtype">roomtype:</label>
                <label>sharing
                <input 
                    type="radio"
                    id="sharing"
                    onChange={(e) => setRoomType("sharing")}
                    value={roomType}
                />
                </label>
                <label>private
                <input 
                    type="radio"
                    id="private"
                    onChange={(e) => setRoomType("private")}
                    value={roomType}                    
                />
                </label>
                <label htmlFor ="genderPreferences">Gender:</label>
                <label>male
                <input 
                    type="checkbox"
                    id="male"
                    onChange={(e) => genderPreferences.push("male")}
                    value={genderPreferences}
                    
                />
                </label>
                <label>female
                <input 
                    type="checkbox"
                    id="female"
                    onChange={(e) => genderPreferences.push("female")}
                    value={genderPreferences}
                    
                />
                </label>
                <label>other
                <input 
                    type="checkbox"
                    id="other"
                    onChange={(e) => genderPreferences.push("other")}
                    value={genderPreferences}
                    
                />
                </label>
                <label htmlFor ="foodPreferences">Food preferences:</label>
                <label>vegetarian
                <input 
                    type="checkbox"
                    id="vegetarian"
                    onChange={(e) => foodPreferences.push("vegetarian")}
                    value={foodPreferences}
                    
                />
                </label>
                <label>non vegetarian
                <input 
                    type="checkbox"
                    id="nonvegetarian"
                    onChange={(e) => foodPreferences.push("nonvegetarian")}
                    value={foodPreferences}
                    
                />
                </label>
                <label>eggtarian
                <input 
                    type="checkbox"
                    id="eggtarian"
                    onChange={(e) => foodPreferences.push("eggtarian")}
                    value={foodPreferences}
                    
                />
                </label>
                <label>vegen
                <input 
                    type="checkbox"
                    id="vegen"
                    onChange={(e) => foodPreferences.push("vegen")}
                    value={foodPreferences}
                />
                </label>
                <label htmlFor ="document">document:</label>
                <input 
                    type="file"
                    id="document"
                    onChange={(e) => fileUpload(e.target.value,false)}
                    value={document}
                />
                <label htmlFor ="photos">photos:</label>
                <input 
                    type="file"
                    id="photos"
                    onChange={(e) => fileUpload(e.target.value,true)}
                    value={images}
                />
                <label htmlFor ="startdate">startdate:</label>
                <input 
                    type="date"
                    id="startdate"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    required
                />
                <label htmlFor ="rent">Rent:</label>
                <input 
                    type="number"
                    id="rent"
                    onChange={(e) => setRent(e.target.value)}
                    value={rent}
                    required
                />
                <label htmlFor ="otherpreferences">Other Preferences:</label>
                <input 
                    type="text"
                    id="otherpreferences"
                    onChange={(e) => setOtherPreferences(e.target.value)}
                    value={otherPreferences}
                    required
                />
                <label htmlFor ="startage">minimum age:</label>
                <input 
                    type="number"
                    id="startage"
                    onChange={(e) => setStartAge(e.target.value)}
                    value={startAge}
                    required
                />
                <label htmlFor ="endAge">maximum age:</label>
                <input 
                    type="number"
                    id="endage"
                    onChange={(e) => setEndAge(e.target.value)}
                    value={endAge}
                    required
                />
                <button>Create House Ad</button>

            </form>
        </section>
        )}
        </>
    )
}