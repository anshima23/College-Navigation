import React from 'react';
import './thrive-campus.css'; // Import custom CSS
import left1 from "../../assets/left1.jpg";
import left2 from "../../assets/left2.jpg";
import left3 from "../../assets/left3.jpg";
import left4 from "../../assets/left4.jpg";
import right1 from "../../assets/right1.jpg";
import right2 from "../../assets/right2.jpg";
import right3 from "../../assets/right3.jpg";

const ThriveCampus = () => {
  console.log("ThriveCampus component rendered"); // Debugging console log
  return (
    <div className="thrive-campus">
      <div className="left-partition">
        {/* Top Image */}
        <div className="top-image">
          <img src={left1} alt="Top" />
        </div>

        {/* Two Bottom Images */}
        <div className="bottom-images">
          <div className="bottom-image">
            <img src={left2} alt="Bottom Left" />
          </div>
          <div className="bottom-image">
            <img src={left3} alt="Bottom Right" />
          </div>
        </div>

        {/* Single Image Below the Two Bottom Images */}
        <div className="single-image">
          <img src={left4} alt="Single Bottom" />
        </div>

        {/* New Div for Heading and Content */}
        <div className="content-section">
        <h1>hfd</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad repudiandae impedit iste maxime, ratione officiis distinctio alias quam cum expedita vero dolores sunt numquam tempore laborum commodi quos dolorum.
          Quas, nostrum tempora deleniti odio quam nobis ratione nisi distinctio consequatur necessitatibus dolores quaerat itaque a neque. Aliquid nihil dolore, libero nobis dolorem soluta natus deserunt, eum maiores laboriosam dolorum.
          Impedit facilis delectus quae quod, qui debitis nesciunt quas unde, ex molestiae, sunt ipsum! Quo dolores hic a nobis animi consectetur placeat blanditiis, officia veniam molestiae, repellat et odio vel!
          Amet ratione error cumque quo sequi nisi est ad illum provident aut itaque at nostrum incidunt vero atque quam odio, expedita esse distinctio et veniam assumenda facilis voluptas quidem! Recusandae!
          Impedit facilis delectus quae quod, qui debitis nesciunt quas unde, ex molestiae, sunt ipsum! Quo dolores hic a nobis animi consectetur placeat blanditiis, officia veniam molestiae, repellat et odio vel!</p>
        </div>
      </div>

      {/* Right Partition */}
      <div className="right-partition"> 
        <div className='content-block'>
          <h1>hfd</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad repudiandae impedit iste maxime, ratione officiis distinctio alias quam cum expedita vero dolores sunt numquam tempore laborum commodi quos dolorum.
          Quas, nostrum tempora deleniti odio quam nobis ratione nisi distinctio consequatur necessitatibus dolores quaerat itaque a neque. Aliquid nihil dolore, libero nobis dolorem soluta natus deserunt, eum maiores laboriosam dolorum.
          Amet ratione error cumque quo sequi nisi est ad illum provident aut itaque at nostrum incidunt vero atque quam odio, expedita esse distinctio et veniam assumenda facilis voluptas quidem! Recusandae!
          Impedit facilis delectus quae quod, qui debitis nesciunt quas unde, ex molestiae, sunt ipsum! Quo dolores hic a nobis animi consectetur placeat blanditiis, officia veniam molestiae, repellat et odio vel!
          Amet ratione error cumque quo sequi nisi est ad illum provident aut itaque at nostrum incidunt vero atque quam odio, expedita esse distinctio et veniam assumenda facilis voluptas quidem! Recusandae!
          Impedit facilis delectus quae quod, qui debitis nesciunt quas unde, ex molestiae, sunt ipsum! Quo dolores hic a nobis animi consectetur placeat blanditiis, officia veniam molestiae, repellat et odio vel!
          Amet ratione error cumque quo sequi nisi est ad illum provident aut itaque at nostrum incidunt vero atque quam odio, expedita esse distinctio et veniam assumenda facilis voluptas quidem! Recusandae!
          Impedit facilis delectus quae quod, qui debitis nesciunt quas unde, ex molestiae, sunt ipsum! Quo dolores hic a nobis animi consectetur placeat blanditiis, officia veniam molestiae, repellat et odio vel!</p>
        </div>
        <div className="right-image-section">
        {/* Full-width Image (right1) */}
        <img src={right1} alt="Top Right" />

        {/* Images Sharing Same Row (right2 and right3) */}
        <div className="half-width">
          <img src={right2} alt="Middle Right" />
          <img src={right3} alt="Bottom Right" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default ThriveCampus;
