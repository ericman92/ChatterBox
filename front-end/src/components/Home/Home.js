import React, {Component} from 'react';
import {Schedule} from "./Schedule";
import '../../styling/homepg.css'

const Blah = () =>{
    return(
        <p>
            TESTING
         </p>
    )
}

class Home extends Component {
    render() {
      return (
        <div className='flex-containerHome'>
            <div className='flex-schedule'>
            <Schedule />
            </div>
            <div className="flex-popular">
                <p> Popular Content </p>
            </div>
        </div>
      );
    }
  }
  
  export default Home;