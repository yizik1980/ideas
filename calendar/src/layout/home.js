import React from "react";
import Logo from "./Logo";


function Home() {


    return (
        <div className="main relative">
            <Logo></Logo>
              <div className="right-side">
        <h2>הפכנו את כדור המגנזיום לגרגירים</h2>
        <h1>כדי שתיקחו את זה בקלות</h1>
        <h3>גרגירי מגנזיום להקלה על התכווצות שרירים,
קל לנטילה, נמס בפה, בטעם לימון עדין.
</h3>
      </div>
      <div className="items">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
      </div>
        </div>
    );
}

export default Home;






























// [
//     {
//         text: "Learn about React",
//         isCompleted: false
//     },
//     {
//         text: "Meet friend for lunch",
//         isCompleted: false
//     },
//     {
//         text: "Build really cool todo app",
//         isCompleted: false
//     }
// ]