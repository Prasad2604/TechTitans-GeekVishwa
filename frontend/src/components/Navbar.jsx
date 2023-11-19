import React from "react";
import Prompt from "./Prompt";

function Navbar() {

  return (
    <div>
  	    <input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	    <label for="menu-icon"></label>
  	    <nav class="nav"> 		
            <ul class="pt-5">
                <li><a href="">Work</a></li>
                <li><a href="">Studio</a></li>
                <li><a href="">News</a></li>
                <li><a href="">Contact</a></li>
            </ul>
  	    </nav>

  	    <Prompt />
    </div>
  );
}

export default Navbar;