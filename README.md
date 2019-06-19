# Oireachtas Viewer

A data dashboard for displaying data gathered from oireachtas API.
Displayed data will include latest bill proposed in Irelands Government houses: Dail and Seanad.
Charts will also show debate topics, members involved, vote results and more.
The site will provide condensed descriptions of the elements of the oireachtas.

Hosted on [GitHub Pages](https://pattern-projects.github.io/oireachtas-ifd-project/index.html)
Repository on [GitHub](https://github.com/Pattern-Projects/oireachtas-ifd-project)

## License
The project is shared for use with the [GNU General Public License v3](LICENCE)

>   This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

## UX

Use this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

### Users 
Expected users of the website include 3D artists, educators, software developers and students of all kinds. 
They come to the website with questions in need of answering.

### User Stories
1. A student user wants to learn more about the houses of the oireachtas
2. An education professional user wants to share learning resources with their students
3. A journalist user looking up the latest legislation
4. Oireachtas member user searching for colleague information
5. A political scientist user looking for party breakdown of oireachtas houses

###Design

- Colour scheme consists of complementary colours 
    - Tweaked versions of archaic [government flag](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Arms_of_Ireland_%28historical%29.svg/220px-Arms_of_Ireland_%28historical%29.svg.png) colours.
    - irish-gold:   ![#FFA65D](https://placehold.it/15/FFA65D/000000?text=+) `#FFA65D`
    - patrick's-blue:     ![#D2E2FF](https://placehold.it/15/D2E2FF/000000?text=+) `#D2E2FF`
- [Custom designed logo](documentation/logo.png) resembling [five rows of dail](documentation/rows-dail.png) and [four rows of seanad](documentation/rows-seanad.png) seats.
- roboto font used throughout the website
    - font-family: 'Roboto', 'helvetica' sans-serif;

### Mockups
The web app is a single page with different displays given for different functions:
- [Oireachtas](https://www.figma.com/file/TRccvoxe7EcOrHPFaSKdkixu/oireachtas-ifd-project?node-id=9%3A35)  
- [Member](https://www.figma.com/file/TRccvoxe7EcOrHPFaSKdkixu/oireachtas-ifd-project?node-id=5%3A3)  
- [Bill](https://www.figma.com/file/TRccvoxe7EcOrHPFaSKdkixu/oireachtas-ifd-project?node-id=8%3A29)  

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- Another feature idea

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

This project makes use of:
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
    - HTML for strucutre
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
    - CSS for Styling
- [JavaScript](https://www.w3schools.com/jsref/)
    - **JavaScript** for application controller
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Google Chrome](https://www.google.com/chrome/)
    - Used for browser and dev tools
- [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new)
    - Used for browser and dev tools
- [Google](https://www.google.com/)
    - **Google** was used for research.
- [Bootstrap](https://getbootstrap.com/)
    - HTML and CSS Framework from **Bootstrap**
- [Visual Studio Code](https://code.visualstudio.com/)
    - This project was built using the **VS Code** IDE
- [Git](https://git-scm.com/)
    - **Git** used for Version Control
- [GitHub](https://github.com/)
    - Repository hosted on **GitHub**
- [Github Pages](https://pattern-projects.github.io/oireachtas-ifd-project.html)
    - Website hosted on **Github Pages**
- [Oireachtas API](https://api.oireachtas.ie/)
    - Data collected from the **Oireachtas API**
- [DC](https://dc-js.github.io/dc.js/)
    - Data charts created with **DC**
- [Jasmine](https://cdnjs.com/libraries/jasmine)
    - Development testing completed with **Jasmine**
    
## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
The images for the website are taken from:


The images for the documentation are taken from:


### Acknowledgements

Thank you to the following for inspiration, motivation and the direction I needed:

- Seun Owonikoko    @seun_mentor
- Simen Daehlin     @Eventyret_mentor
- Robin Zigmond     @robinz_alumni
- Code Institute
