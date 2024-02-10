import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateItemModal = ({ show, handleClose, handleUpdateItemDetails, updateItemId }) => {

    const [ selectedFile, setSelectedFile ] = useState(null);

    // Function to handle File selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      console.log("Selected File: ", file);
    }
    
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      location: '',
      securityQuestion: '',
      // image: null, // This should be a File object for handling file uploads
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleUpdate = async () => {
      // Combine the form data with selected file
      const data = new FormData();
      console.log("form data title: ", formData.title);
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('location', formData.location);
      data.append('image', selectedFile);
      
      // Add security question and answer as an object
      const securityData = {
        question: formData.securityQuestion,
        answer: formData.securityAnswer,
      };

      // Convert the securityData object to a JSON string
      const securityJson = JSON.stringify(securityData);

      // Append the JSON string to the form data
      data.append('securityQuestion', securityJson);

      // Call the handleUpdateItemDetails function from your service
      handleUpdateItemDetails(updateItemId, data);

      // Reset the form data and selected file
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        securityQuestion: "",
        securityAnswer: "",
      });
      setSelectedFile(null);
      

    };

    return (
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="post-item-modal">
          <Modal.Title>Post Your Lost Item</Modal.Title>
          <Button
            variant="link"
            className="post-item-close-button"
            onClick={handleClose}
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body className="post-item-modal">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="answer-modal-input"
                type="text"
                placeholder="Enter title"
                autoFocus
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="answer-modal-input"
                type="text"
                placeholder="Enter description"
                autoFocus
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Select
              className="mb-3 answer-modal-input"
              aria-label="Default select example"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option>Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Documents">Documents</option>
              <option value="Keys">Keys</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Toys">Toys</option>
              <option value="Sports Equipment">Sports Equipment</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="answer-modal-input"
                type="text"
                placeholder="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="answer-modal-input"
                type="text"
                placeholder="Enter Security Question"
                autoFocus
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="answer-modal-input"
                type="text"
                placeholder="Enter Security Answer"
                autoFocus
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Choose Files</Form.Label>
              <Form.Control
                className="answer-modal-input"
                type="file"
                accept="image/*"
                size="sm"
                onChange={handleFileChange}
              />
              {selectedFile ? (
                <p>Selected file: {selectedFile.name}</p>
              ) : (
                <p>No file chosen</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="post-item-modal">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  };
  
  export default UpdateItemModal;