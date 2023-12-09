import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from './../common/Spinner';
import { fetchFoundItems } from './../../utils/foundItemUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FoundItems.css'

const FoundItems = (props) => {

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
    console.log("scrollY value: ", scrollY);
  }

  useEffect(() => {
    console.log("Inside useEffect hook");
    const fetchData = async () => {
      await fetchFoundItems(props.setLoading, props.setFoundItems);
      // Now, log the updated value of foundItems
      console.log("foundItems value inside useEffect: ", props.foundItems);
    };

    fetchData();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  window.addEventListener('scroll', handleScroll);

  const handleDeleteItem = async (itemId) => {
    try {
      // Implement your logic to delete the found item
      // ...

      // Update the local state after deletion
      props.setFoundItems((prevItems) => prevItems.filter((item) => item._id !== itemId));

      // Display a success message using toast
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting found item:', error);
      toast.error('Failed to delete the found item');
    }
  };

  const handleScrollToTop = () => {
    console.log("handle scroll function");
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div>
      <h2 className='text-center'>Found Items</h2>
      {props.loading && <Spinner />}
      <div className="cards">
        {!props.loading && (!props.foundItems || props.foundItems.length === 0) && <p>No found items available.</p>}
        {!props.loading && props.foundItems && props.foundItems.length > 0 && (
          <div className="item-list">
            {props.foundItems.filter(item => !item.isLost).map((item) => (
              <Card key={item._id} className="custom-card">
                <Card.Img className="card-image" variant="top" src={item.imageUrl} alt={item.title} />
                <Card.Body className='card-body'>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Text>Category: {item.category}</Card.Text>
                  <Card.Text>Location: {item.location}</Card.Text>
                  {props.isMyListing && (
                    <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>
                      Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
      {scrollY > 0 && !props.isMyListing && (
        <Button
          variant='secondary'
          className='scroll-to-top-button-foundItems'
          onClick={handleScrollToTop}
        >
          &#9650;
        </Button>
      )}
    </div>
  );
};

export default FoundItems;