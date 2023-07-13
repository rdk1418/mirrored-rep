import './HouseSeekerCreateApplication.css';
import {useRef, useState , useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import axios from 'axios';
import {useNavigate}  from 'react-router-dom';
export const HouseSeekerCreateApplication =() =>{

    const userRef =useRef();
    const errRef =useRef();

    const navigate =useNavigate();
    const [location,setLocation] = useState('');
    const [roomType,setRoomType] = useState('');
    const [otherPreferences,setOtherPreferences]=useState('');
    const [startDate,setStartDate]=useState();
    const [foodPreferences]=useState([]);
    const [genderPreferences]=useState([]);
    const [errMsg, setErrMsg] =useState ('');
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        if(useRef.current){
            userRef.current.focus();
        }
    },[])

    useEffect(() => {
        setErrMsg('');
    }, [location,roomType,otherPreferences,startDate,foodPreferences,genderPreferences])
  

    const handleLoginSubmit =async (e) => {
        e.preventDefault();
        let bodyObj = {
            user_id:1,
            location_city:location,
            room_type:roomType,
            other_preferences:otherPreferences,
            start_date:startDate,
            food_preferences:foodPreferences,
            gender_preferences:genderPreferences
        }

        fetch("http://localhost:8080/houseSeeker/create", {
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
                <label htmlFor ="location">location:</label>
                <input 
                    type="text"
                    id="location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
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
                <label htmlFor ="startdate">startdate:</label>
                <input 
                    type="date"
                    id="startdate"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
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
                <button>Create Ad</button>

            </form>
        </section>
        )}
        </>
    )
}