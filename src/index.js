/* ~~~~~~~~~~~~~~~~~~~~~~~~ 20.6 form submissions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  
  1. Validate the form
      Ensure that the form is not blank. Here, blank means an empty string or a string containing only spaces. If the form is blank, display an error message by creating and appending a new error element to the end of the form. The error element must take the following form:

      <div class="error" id="searchError">Please enter a search term</div>
    If the form is not blank, the error element should not be on the form.


  2. Perform the search
     Perform a case-insensitive search of the titles of the articles (that is, the innerHTML values of the h2 elements). If the search term matches any part of the title, the article should be displayed. If the search term doesn't match any part of the title, the article should be hidden.

     To hide an article, add the class hidden to the article element. To make it visible again, remove the class hidden from the article element.

     If a second search is conducted, articles hidden by any previous searches should be made visible again.
  */

     function submitHandler(event) {
        event.preventDefault();
      
        //clear the form of any previous error elements
        let errorDiv = event.target.querySelector("#searchError");
        if(errorDiv) errorDiv.remove();
        //collect form information
        const formData = new FormData(event.target);
        //let searchTerm = formData.get("searchTerm");
        let errors = validateForm(formData);
        //if the errors object has keys, then that means there are validation errors
        if(Object.keys(errors).length > 0) {
        //create an error element
          let errorElement = document.createElement("div")
          errorElement.classList.add("error")
          errorElement.id = "searchError"
          errorElement.innerText = errors.search;
      
          event.target.appendChild(errorElement);
        } else {
          //perform the search
          let searchTerm = formData.get("searchTerm")
      
          //check if any section's h2 innerText contains the search term
          let articleSection = document.querySelector(".articles")
          let allArticles = articleSection.querySelectorAll("article")
          allArticles.forEach((article) => {
            let h2 = article.querySelector("h2")
            if(h2.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
              article.classList.remove("hidden")
            } else {
              article.classList.add("hidden");
            }
          })
        }
      }
      
      function validateExists(value) {
        return value && value.trim();
      }
      
      function validateForm(formData) {
        const errors = {};
        if(!validateExists(formData.get("searchTerm"))) {
          errors.search = "Please enter a search term";
        }
        return errors;
      }
      
      function main() {
        //add event listener to the form for submit event
        const searchForm = document.querySelector("#searchForm")
        searchForm.addEventListener("submit", submitHandler)
      }
      
      window.addEventListener("DOMContentLoaded", main)