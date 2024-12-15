  // Select elements
  const menuBtn = document.querySelector(".container #menu-icon");
  const doc_dropdown = document.querySelector("#doc_menu_dropdown");
  const doc_menuIcon = document.querySelector(".container #menu-icon .bx");
  let isMenu_Clicked = false;
  
  
  
  // Toggle the dropdown
  function showDropdown() {
    
    
    if (!isMenu_Clicked) {
      doc_dropdown.style.display = "block";
      document.getElementById("right_banner").style.marginLeft="8rem";
      isMenu_Clicked = true;
      doc_menuIcon.classList.remove("bx-menu");
      doc_menuIcon.classList.add("bx-x");
    } else {
      doc_dropdown.style.display = "none";
      document.getElementById("right_banner").style.marginLeft="";
      isMenu_Clicked = false;
      doc_menuIcon.classList.remove("bx-x");
      doc_menuIcon.classList.add("bx-menu");
    }
  }
  
  
  
  function hideDropdownOnResize() {
    if (window.innerWidth > 688) {
      doc_dropdown.style.display = "none";
      document.getElementById("right_banner").style.marginLeft="";
      
      doc_menuIcon.classList.remove("bx-x");
      doc_menuIcon.classList.add("bx-menu");
    }
  }
  
  // Attach event listener
  menuBtn.addEventListener('click', showDropdown);
  window.addEventListener("resize", hideDropdownOnResize);