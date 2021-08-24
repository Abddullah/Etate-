import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Navbar, Nav, Button, Form, FormControl, Row, Col, Container, Layout, NavDropdown, Card, Jumbotron } from 'react-bootstrap';

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div 
    style={{
      padding: `0 ${chevronWidth}px`,
      padding:"5%",
      width: "100%", 
      display:"flex",justifyContent:"center",
    //   background:"red"
    
    
    
    
    
    
    
    
    }} 
      className="gradient"
      
      >
        <div style={{width: "70%",}}>

      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={
        <Button style={{fontSize:12,border:"0.5px solid grey",borderRadius:100}} variant="link">
            {/* <div style={{width:50,fontSize:.55}}> */}
                {"<"}
            {/* </div> */}
            </Button>

    }
        rightChevron={
        
        // <button>{'>'}</button>
    
        <Button style={{fontSize:12,border:"0.5px solid grey",borderRadius:100}} variant="link">
            {/* <div style={{background:"orange",width:50,fontSize:25}}> */}
                {">"}
            {/* </div> */}
            </Button>
    }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div  style={{width:200,}}>
          <div>
            <img style={{ width: 170, }} src={require("../assets/doctor.png")} alt="aaaa" />
          </div>
          <div style={{textAlign:"center"}}>
            Step 1
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage  book.
                                </div>
        </div>
        <div style={{width:200,}}>
          <div>
            <img style={{ width: 170, }} src={require("../assets/qrcode.png")} alt="aaaa" />
          </div>
          <div style={{textAlign:"center"}}>
            Step 2
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage  book.
                                </div>
        </div>
        <div style={{width:200,}}>
          <div>
            <img style={{ width: 170, }} src={require("../assets/bookatime.png")} alt="aaaa" />
          </div>
          <div  style={{textAlign:"center"}}>
            Step 3
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage  book.
                                </div>
        </div>
        <div style={{width:200,}}>
          <div>
            <img style={{ width: 170, }} src={require("../assets/reminders.png")} alt="aaaa" />
          </div>
          <div style={{textAlign:"center"}}>
            Step 4
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage  book.
                                </div>
        </div>
        <div style={{width:200,}}>
          <div>
            <img style={{ width: 170, }} src={require("../assets/step5.png")} alt="aaaa" />
          </div>
          <div style={{textAlign:"center"}}>
            Step 5
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage  book.
                                </div>
        </div>
        <div style={{width:200,}}>
          <div>
            <img style={{ width: 170, }} src={require("../assets/step6.png")} alt="aaaa" />
          </div>
          <div style={{textAlign:"center"}}>
            Step 6
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage  book.
                                </div>
        </div>
      </ItemsCarousel>
    </div>
    </div>
  );
};


