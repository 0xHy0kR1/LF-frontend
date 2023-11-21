import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PostItemModal(props) {

  const [ selectedFile, setSelectedFile ] = useState(null);

  // Function to handle File selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  // Function to show the modal 
  const handleModalShow = () => props.handleModalShow();

  // Function to hide the modal
  const handleModalClose = () => props.handleModalClose();

  return (
    <>
      <Modal show={props.showModal} onHide={props.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Your Lost Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter title" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter description" autoFocus />
            </Form.Group>
            <Form.Select aria-label="Default select example">
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
              <Form.Control type="text" placeholder="location" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter Security Question" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
              <Form.Control type="text" placeholder="Enter Security Answer" autoFocus />
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