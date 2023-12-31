import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from './../common/Spinner';
import { fetchFoundItems } from './../../utils/foundItemUtils';
import { deleteLostItem } from '../services/lostItemService';
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
    props.setFoundItems([]);
    fetchFoundItems(props.setFoundLoading, props.setFoundItems);
    console.log("found items: ", props.foundItems);
    // Now, log the updated value of foundItems

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);


  const handleDeleteItem = async (itemId) => {
    try {
      const deleteResult = await deleteLostItem(itemId);
      console.log("delte Result: ", deleteResult);

      // Update the local state after deletion
      props.setFoundItems((prevItems) => prevItems.filter((item) => item._id !== itemId));

      console.log("delete result: ", deleteResult);
      if(deleteResult.success) {
        toast.success(deleteResult.message);
      } else{
        toast.error(deleteResult.message);
      }
    } catch (error) {
      console.error('Error deleting found item:', error);
      toast.error('Failed to delete item. Please refresh.');
    }
  };

  const handleScrollToTopFoundItems = () => {
    console.log("handle scroll function");
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div>
      <h2 className='text-center'>Found Items</h2>
      {props.foundLoading && <Spinner />}
      <div className="cards">
        {!props.foundLoading && props.foundItems && props.foundItems.every(item => item.isLost) ? (
          <p>No found items available.</p>
        ) : (
          <div className="item-list">
            {props.foundItems && props.foundItems.length > 0 && props.foundItems
              .filter(item => !item.isLost)
              .map((item) => (
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
          type="button"
          variant='secondary'
          className='scroll-to-top-button-foundItems'
          onClick={handleScrollToTopFoundItems}
        >
          &#9650;
        </Button>
      )}
    </div>
  );
};

export default FoundItems;