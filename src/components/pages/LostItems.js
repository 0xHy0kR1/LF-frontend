  import React, { useEffect, useState } from 'react';
  import Card from 'react-bootstrap/Card';
  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import { deleteLostItem, answerSecurityQuestion, viewLostItem } from './../services/lostItemService';
  import SecurityQuestionModal from './../modal/SecurityQuestionModal';
  import './LostItems.css';
  import Spinner from './../common/Spinner';
  import { fetchLostItems } from './../../utils/lostItemUtils';
  import { Link } from 'react-router-dom';
  import Toast from 'react-bootstrap/Toast';
  const LostItems = (props) => {

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showSecurityQuestionModal, setShowSecurityQuestionModal] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [showLoginToast, setShowLoginToast] = useState(false);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    }

    useEffect(() => {
      // Fetch and set the list of lost items when the component mounts
      fetchLostItems(props.setLoading, props.setLostItems, props.showAlert);
      window.addEventListener('scroll', handleScroll);

      // Check if the user is logged in when the component mounts
      const isLoggedInOnMount = !!localStorage.getItem('authToken');
      setShowLoginToast(!isLoggedInOnMount);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, []);

    const handleDeleteItem = async (itemId) => {
      try{
          const deleteResult = await deleteLostItem(itemId);
          // Remove the deleted item from the local state
          props.setLostItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          
          if(deleteResult.success) {
              props.showAlert('success', deleteResult.message);
          } else{
              props.showAlert('danger', deleteResult.message);
          }
      } catch(error){
          console.error('Error deleting lost item:', error);
          props.showAlert('danger', 'Failed to delete the lost item');
      }
    }

    const handleViewDetails = async (itemId) => {
      let itemDetails;
      try{
          itemDetails = await viewLostItem(itemId);
          // Display item details
          console.log('Item details:', itemDetails);
          if(itemDetails.data.securityQuestion){
            // Show alert if the user is not logged in
            if (!isLoggedIn) {
              props.showAlert('info', 'Please log in to view the author\'s email.');
              return;
            }

            setShowEmail(false);
            setSelectedItemId(itemId);
            setSecurityQuestion(itemDetails.data.securityQuestion);
            setShowSecurityQuestionModal(true);
          } else{
            setShowSecurityQuestionModal(false);
          }
      } catch(error){
          console.error('Error viewing item details:', error);
          props.showAlert('danger', 'Error viewing item details');
      }
    }

    const handleAnswerSecurityQuestion = async (itemId, answer) => {
      try{
        const result = await answerSecurityQuestion(itemId, { securityQuestion: { answer}});
        if(result.data && result.data.email){
          setUserEmail(result.data.email);
          setShowEmail(true);
          setShowSecurityQuestionModal(false);
        }else {
          setShowSecurityQuestionModal(false);
          props.showAlert('danger', result.message || 'Incorrect answer');
        }
      } catch(error){
        props.showAlert('danger', "Incorrect answer");
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
      window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // Check if the user is logged in (based on the presence of authToken)
    const isLoggedIn = !!localStorage.getItem('authToken');
    console.log(isLoggedIn);
    const handleCloseLoginToast = () => setShowLoginToast(false);

    return (
      <div>
        <h2 className='text-center'>Lost Items</h2>
        {props.loading && <Spinner />} {/* Render the spinner while loading */}
        <div className="cards">
          {!props.loading && props.lostItems.map((item) => (
            <Card key={item._id} className="custom-card" >
              <Card.Img className="card-image" variant="top" src={item.imageUrl} alt={item.title} />
              <Card.Body className='card-body'>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Description: {item.description}</Card.Text>
                <Card.Text>Category: {item.category}</Card.Text>
                <Card.Text>Location: {item.location}</Card.Text>
                {item.securityQuestion && (
                  <Button variant="info" onClick={() => handleViewDetails(item._id)}>
                    View Email of author
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Modal for answering security question */}
        {showSecurityQuestionModal && securityQuestion && ( // Check if itemDetails is defined
          <SecurityQuestionModal
            show={showSecurityQuestionModal}
            handleClose={handleCloseSecurityQuestionModal}
            onSubmit={(answer) => handleAnswerSecurityQuestion(selectedItemId, answer)}
            securityQuestion={securityQuestion}
            showAlert={props.showAlert}
          />
        )}

        {/* Modal for displaying the email */}
        <Modal show={showEmail} onHide={handleCloseEmailModal}>
          <Modal.Header className='email-modal-header'>
            <Modal.Title>User Email</Modal.Title>
            <Button variant="link" className="email-close-button" onClick={props.handleClose}>
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

      {scrollY > 0 && (
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
          style={{
            position: 'fixed',
            top: 65,
            right: 20,
            backgroundColor: 'red',
            color: 'white',
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

  export default LostItems
