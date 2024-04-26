import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateLostItem, deleteLostItem, answerSecurityQuestion, viewLostItem } from './../services/lostItemService';
import SecurityQuestionModal from './../modal/SecurityQuestionModal';
import './LostItems.css';
import Spinner from './../common/Spinner';
import { fetchLostItems } from './../../utils/lostItemUtils';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import UpdateItemModal from '../modal/UpdateItemModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";




const LostItems = (props) => {

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showSecurityQuestionModal, setShowSecurityQuestionModal] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    // Fetch and set the list of lost items when the component mounts
    fetchLostItems(props.setLostLoading, props.setLostItems);
    window.addEventListener('scroll', handleScroll);

    // Check if the user is logged in when the component mounts
    const isLoggedInOnMount = !!localStorage.getItem('Authorization');
    setShowLoginToast(!isLoggedInOnMount);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const handleUpdateItem = (itemId) => {
    setUpdateItemId(itemId);
    setShowUpdateModal(true);
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);;
    setUpdateItemId(null);
  }

  // Function to handle updating a lost item
  const handleUpdateItemDetails = async (itemId, newData) => {
    try {
      const updatedItem = await updateLostItem(updateItemId, newData);
      setShowUpdateModal(false);
      setUpdateItemId(null);
      // Update the local state with the updated item
      props.setLostItems((prevItems) =>
        prevItems.map((item) => (item._id === itemId ? updatedItem : item))
      );
      if (updatedItem.success) {
        handleCloseUpdateModal();
        fetchLostItems(props.setLostLoading, props.setLostItems);
        toast.success(updatedItem.message);
      } else {
        toast.error(updatedItem.message);
      }
    } catch (error) {
      toast.error('Failed to update the lost item');
      console.error('Error updating lost item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    console.log("Inside handleDeleteItem function");
    try {
      const deleteResult = await deleteLostItem(itemId);
      // Remove the deleted item from the local state
      props.setLostItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      console.log("delete result: ", deleteResult);
      if (deleteResult.success) {
        toast.success(deleteResult.message);
      } else {
        toast.error(deleteResult.message);
      }
    } catch (error) {
      console.error('Error deleting lost item:', error);
      toast.error('Failed to delete the lost item');
    }
  }

  const handleViewDetails = async (itemId) => {
    try {
      const itemDetails = await viewLostItem(itemId);
      // Display item details
      if (itemDetails.data && itemDetails.data.securityQuestion) {
        // Show alert if the user is not logged in
        if (!isLoggedIn) {
          toast.info('Please log in to view the author\'s email.');
          return;
        }

        setShowEmail(false);
        setSelectedItemId(itemId);
        setSecurityQuestion(itemDetails.data.securityQuestion);
        setShowSecurityQuestionModal(true);
      } else {
        setShowSecurityQuestionModal(false);
      }
    } catch (error) {
      console.error('Error viewing item details:', error);
      toast.error('Error viewing item details');
    }
  }

  const handleAnswerSecurityQuestion = async (itemId, answer) => {
    try {
      const result = await answerSecurityQuestion(itemId, { securityQuestion: { answer }});
      if (result.data && result.data.email) {
        setUserEmail(result.data.email);
        setShowEmail(true);
        setShowSecurityQuestionModal(false);
        localStorage.setItem('displayTitle', result.data.itemName);
        localStorage.setItem('userId', result.data.userId);
        localStorage.setItem('securityQuestionAnswered', 'true');
        toast.success('Security question answered successfully!');
      } else {
        setShowSecurityQuestionModal(false);
        toast.error(result.message || 'Incorrect answer');
      }
    } catch (error) {
      toast.error('Incorrect answer');
      console.error('Error answering security question', error);
    }
  }
  const handleCloseSecurityQuestionModal = () => {
    setShowSecurityQuestionModal(false);
  };

  const handleCloseEmailModal = () => {
    setShowEmail(false);
    setUserEmail('');
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if the user is logged in (based on the presence of authToken)
  const isLoggedIn = !!localStorage.getItem('Authorization');

  const handleCloseLoginToast = () => setShowLoginToast(false);

  const text = "No Lost Items available.".split(" ");
  return (
    <div 
    >
      <h2  className='text-center'>Lost Items</h2>
      {props.lostLoading && <Spinner />} {/* Render the spinner while loading */}
      <div className="cards">
        {!props.lostLoading && props.lostItems.every(item => !item.isLost) ? (
          text.map((el, i) => (
            <motion.span
              className="lost-item-mes-txt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10
              }}
              key={i}
            >
              {el}
            </motion.span>
          ))
        ) : (
          <motion.div 
          className="item-list"
          initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 1, y: "-100vh" }}
      transition={{ delay: 0.3, duration:2, type: 'spring'}}>
          {props.lostItems && props.lostItems.length > 0 && props.lostItems
            .filter(item => item.isLost).map((item) => (
            <div key={item._id} className="card-container">
              <Card key={item._id} className="custom-card" >
                <Card.Img className="card-image" variant="top" src={item.imageUrl} alt={item.title} />
                <Card.Body className='card-body'>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Text>Category: {item.category}</Card.Text>
                  <Card.Text>Location: {item.location}</Card.Text>
                  {item.securityQuestion && !props.isMyListing && (
                    <Button variant="info" onClick={() => handleViewDetails(item._id)}>
                      View Email of author
                    </Button>
                  )}
                  {props.isMyListing && (
                    <>
                      <div className="bottom-card-button">
                        <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>
                          Delete
                        </Button>
                        <Button variant="warning" onClick={() => handleUpdateItem(item._id)}>
                          Update
                        </Button>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
          </motion.div>
        )}
      </div>
      <UpdateItemModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleUpdateItemDetails={handleUpdateItemDetails}
        updateItemId={updateItemId}
      />
      {/* Modal for answering security question */}
      {showSecurityQuestionModal && securityQuestion && (
        <SecurityQuestionModal
          show={showSecurityQuestionModal}
          handleClose={handleCloseSecurityQuestionModal}
          onSubmit={(answer) => handleAnswerSecurityQuestion(selectedItemId, answer)}
          securityQuestion={securityQuestion}
        />
      )}

      {/* Modal for displaying the email */}
      <Modal show={showEmail} onHide={handleCloseEmailModal}>
        <Modal.Header className='email-modal-header'>
          <Modal.Title>User Email</Modal.Title>
          <Button variant="link" className="email-close-button" onClick={handleCloseEmailModal}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body className='email-modal' >
          <p>Here's the author's email: {userEmail}</p>
        </Modal.Body>
        <Modal.Footer className='email-modal'>
          <Button variant="secondary" onClick={handleCloseEmailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {scrollY > 0 && !props.isMyListing && (
        <Button
          variant='secondary'
          className='scroll-to-top-button'
          onClick={handleScrollToTop}
        >
          &#9650;
        </Button>
      )}
      {!isLoggedIn ? (
        <Toast
          show={showLoginToast}
          onClose={handleCloseLoginToast}
          className='toast-login-block'
          style={{
            position: 'fixed',
            top: 65,
            right: 20,
            color: 'white',
            height: "5vh",
            width: "250px",
            background: "transparent"
          }}
        >
          <Toast.Header closeButton={false} className='lost-item-toast-modal-header'>
            <strong className="me-auto">Join the Lost & Found Hub!</strong>
            <Button
              variant="link"
              className="lost-item-toast-close-button"
              onClick={handleCloseLoginToast}
            >
              X
            </Button>
          </Toast.Header>
          <Toast.Body className='lost-item-toast-modal'>
            <Link to="/Login">Log in</Link> to Post an Item.
          </Toast.Body>
        </Toast>
      ) : ('')}
    </div>
  )
}

export default LostItems;
