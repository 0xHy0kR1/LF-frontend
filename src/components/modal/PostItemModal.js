import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createLostItem } from './../services/lostItemService';

function PostItemModal(props) {

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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to hide the modal
  const handleModalClose = async () => {
    // Combine form data with selected file
    const data = new FormData();
    console.log("form data title: ",formData.title);
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

    // Call the createLostItem function from your service
    const result = await createLostItem(data);

    // Check if the item creation was successful
    if (result.success) {
      // Optionally, you can perform any actions needed upon success
      console.log('Item created successfully');

      // Close the modal
    } else {
      // Handle the case where item creation failed
      console.error('Item creation failed');
    }
    props.handleModalClose();
  };

  return (
    <>
      <Modal show={props.showModal} onHide={props.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Your Lost Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter title" autoFocus name="title" value={formData.title} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter description" autoFocus name="description" value={formData.description} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Select aria-label="Default select example" name="category" value={formData.category} onChange={handleInputChange}>
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
              <Form.Control type="text" placeholder="location" name="location" value={formData.location} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter Security Question" autoFocus name="securityQuestion" value={formData.securityQuestion} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter Security Answer" autoFocus name="securityAnswer" value={formData.securityAnswer} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Choose Files</Form.Label>
                <Form.Control type="file" accept="image/*" size="sm" onChange={handleFileChange} />
                { selectedFile ? (
                    <p>Selected file: {selectedFile.name}</p>
                ) : (
                    <p>No file chosen</p>
                )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostItemModal;