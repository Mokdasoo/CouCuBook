import React, {Component, forwardRef, useRef } from "react";
import HTMLFlipBook from "react-pageflip";


  
  class DemoBook extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        page: 0,
        totalPage: 0,
      };
    }
  
    onPage = (e) => {
      this.setState({
        page: e.data,
      });
    };
  
    
  
    render() {
      return (
          <HTMLFlipBook
            width={300}
            height={200}
            size="stretch"
            // minWidth={315}
            // maxWidth={1000}
            // minHeight={400}
            // maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className="demo-book"
            ref={(el) => (this.flipBook = el)}
          >

            <div className="demoPage">Page 1</div>
            <div className="demoPage">Page 2</div>
            <div className="demoPage">Page 3</div>
            <div className="demoPage">Page 4</div>

          </HTMLFlipBook>
  
          
      );
    }
  }

  export default DemoBook;