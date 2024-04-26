import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from './../common/Spinner';
import { fetchFoundItems } from './../../utils/foundItemUtils';
import { deleteLostItem } from '../services/lostItemService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FoundItems.css';
import { motion } from "framer-motion";

const FoundItems = (props) => {

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  }

  useEffect(() => {

    props.setFoundItems([]);
    fetchFoundItems(props.setFoundLoading, props.setFoundItems);
    // Now, log the updated value of foundItems

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);


  const handleDeleteItem = async (itemId) => {
    try {
      const deleteResult = await deleteLostItem(itemId);

      // Update the local state after deletion
      props.setFoundItems((prevItems) => prevItems.filter((item) => item._id !== itemId));

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
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const text = "No Found Items available.".split(" ");

  return (
    <div>
      <h2 className='text-center'>Found Items</h2>
      {props.foundLoading && <Spinner />}
      <div className="cards">
        {!props.foundLoading && props.foundItems && props.foundItems.every(item => item.isLost) ? (
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