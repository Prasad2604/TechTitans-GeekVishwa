import React from "react";
import Prompt from "./Prompt";

function Navbar() {

  return (
    <div>
  	    <input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	    <label htmlFor="menu-icon"></label>
  	    <nav class="nav"> 		
            <ul class="pt-5">
                <li><a>class 8</a></li>
                <li><a>class 9</a></li>
                <li><a>Class 10</a></li>
            </ul>
  	    </nav>
        <Prompt />
    </div>
  );
}

export default Navbar;