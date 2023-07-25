import React, { useEffect, useState } from "react";
import axios from 'axios';
import './LeaseApplicantView.css';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";

export const LeaseApplicantView = () => {
    const { applicationId }=useParams();
    console.log(applicationId)
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomId,setRoomId]=useState();
    const [errMsg, setErrMsg] =useState ('');
  const [success, setSuccess] = useState(false);
    const navigate = useNavigate();




    useEffect(() => {
        const fetchApplicantDetails = async () => {
            try {
                console.log(applicationId)
                const authToken = sessionStorage.getItem("token");
                const postResponse = await axios.get(`/api/leaseholder/applicant/get/list/applicant/${applicationId}`
                    , {
                        headers: {
                            Authorization: `Bearer ${authToken}`}});
                setPosts(postResponse.data);
                console.log(postResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApplicantDetails().then(r => console.log("Axios error"));
    }, [applicationId]);
    const handleChatSubmit=async (userId)=>{
        let bodyObj={
          user_id : userId,
          application_id : Number(applicationId)
        }
        fetch(`/api/room/getRoomId`,{
          method:"POST",
          headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`}, // Include the authentication token in the headers
          body: JSON.stringify(bodyObj),
        }).then((response) => {
          console.log(response);
          if(response.status===200){
          }
          return response.text(); // Read the response data as text
        })
        .then((data) => {
          console.log(data); // Log the response data
          setRoomId(data);
          navigate(`/chat/${data}`,{
          roomId:data
          });
          if (data === "success") {
          setSuccess(true);
          } else {
          setErrMsg("Login failed. Please try again."); // Set an appropriate error message
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('An error occurred while loading posts. Please try again.', {
          position: toast.POSITION.TOP_RIGHT
        });
          setErrMsg("An error occurred. Please try again."); // Set an appropriate error message
        });
    
      }
    const handleStatusChangeSubmit=(isApprove)=>{

    }
    const openModal = (applicant) => {
        setSelectedPost(applicant);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const apply = () => {
        // Handle apply logic here
        closeModal();
    }

    return (
        <div className="dashboard-container">
            <div className="post-list">
                {posts.map((applicant, index) => (
                    /*<div className="post" key={index}>
                        <div className="post-image">
                            <img src={post.document} alt={`Post ${post.title}`} />
                        </div>*/
                        <div className="applicant-details">

                            <p>Name: {applicant.name}</p>
                            <p>Email: {applicant.email}</p>
                            <p>Age: {applicant.age}</p>
                            <p>Gender: {applicant.gender}</p>
                            <p>Mobile: {applicant.mobile} </p>
                            <button className="chat-button" onClick={()=>handleChatSubmit(applicant.userId)}>Chat</button>
                            <button className="approve-button" onClick={()=>handleStatusChangeSubmit(true)}>Approve</button>
                            <button className="reject-button" onClick={()=>handleStatusChangeSubmit(false)}>Reject</button>
                    </div>
                ))}
            </div>

        </div>
    );
};
