import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getLostItems, deleteLostItem, answerSecurityQuestion, viewLostItem } from './../services/lostItemService';
import SecurityQuestionModal from './../modal/SecurityQuestionModal';
import './LostItems.css';
const LostItems = (props) => {

  const [lostItems, setLostItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showSecurityQuestionModal, setShowSecurityQuestionModal] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch and set the list of lost items when the component mounts
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try{
        const response = await getLostItems();
        const items = response.lostItems; // Access the lostItems property
        setLostItems(items);
        console.log(items);
    } catch (error){
        console.error('Error fetching lost items:', error);
        props.showAlert('danger', 'Error fetching lost items');
    }
  };

  const handleDeleteItem = async (itemId) => {
    try{
        const deleteResult = await deleteLostItem(itemId);
        // Remove the deleted item from the local state
        setLostItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        
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
    try{
        const itemDetails = await viewLostItem(itemId);
        // Display item details
        console.log('Item details:', itemDetails);
        if(itemDetails.securityQuestion){
          setShowEmail(false);
          setSelectedItemId(itemId);
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
      console.log("Security question answer result");

      if(result.email){
        setUserEmail(result.email);
        setShowEmail(true);
        setShowSecurityQuestionModal(false);
      }
    } catch(error){
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
  return (
     <div>
      <h2>Lost Items</h2>
      <div className="cards">
        {lostItems.map((item) => (
          <Card key={item._id} className="custom-card" >
            <Card.Img className="card-image" variant="top" src={item.imageUrl} alt={item.title} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>Description: {item.description}</Card.Text>
              <Card.Text>Category: {item.category}</Card.Text>
              <Card.Text>Location: {item.location}</Card.Text>
              {item.securityQuestion && (
                <Button variant="info" onClick={() => handleViewDetails(item._id)}>
                  Answer Security Question
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for answering security question */}
      <SecurityQuestionModal
        show={showSecurityQuestionModal}
        handleClose={handleCloseSecurityQuestionModal}
        onSubmit={(answer) => handleAnswerSecurityQuestion(selectedItemId, answer)}
      />

      {/* Modal for displaying the email */}
      <Modal show={showEmail} onHide={handleCloseEmailModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Here's the author's email: {userEmail}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LostItems
