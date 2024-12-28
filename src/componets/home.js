import React, {useEffect}from 'react';
import AddNote from './addNote';


export const Home = (props) => {
  useEffect(()=>{
      props.setFilled(40);
      setTimeout(()=>{
        props.setFilled(50);
      },500)
      setTimeout(()=>{
        props.setFilled(100);
      }, 1000)
      props.setFilled(0);
    }, [])
  const {showAlert} = props
  return (
      <AddNote mode={props.mode} showAlert={showAlert}/>
  );
}

export default Home;
