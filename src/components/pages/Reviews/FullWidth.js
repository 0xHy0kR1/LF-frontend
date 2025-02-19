import styled from "styled-components";


const FullWidth = styled.div`
  width: calc(100vw - (100vw - 100%));
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: calc(-50vw + (100vw - 100%)/2); 
  margin-right: calc(-50vw + (100vw - 100%)/2);
`;

export default FullWidth;
