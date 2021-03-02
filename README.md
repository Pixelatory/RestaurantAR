# RestaurantAR
## Team Members
- Nicholas Aksamit
- Michael Missana
- Karanjot Pabla
- Pranjelly Kathuria
- Fahad Ansar
- Shivam Garg/Tyger Mascarenhus
- Paramvir Singh

### Documents
- [Project Proposal](https://github.com/Pixelatory/RestaurantAR/blob/main/Documents/Project%20Proposal.pdf)
- [Software Requirements Specification and Designs](https://github.com/Pixelatory/RestaurantAR/blob/main/Documents/Software%20Requirements%20Specification%20and%20Design.pdf)

### Get Started
- Use /git clone https://github.com/Pixelatory/RestaurantAR/
- Open directory in terminal
- Use /npm install command
- Use /npm start command

### Workflow
- Use Trello to find user stories for the current sprint
- Read through the user story and comments / read through daily stand-up channel. This is to ensure we do not 
  double up on work
- Move story to in progress column in trello
- Update the daily stand-up channel with what you plan on working on regarding that user story
- Development should be done in separate branches, although we need to ensure these branches are kept up to date to 
  reduce merge conflicts
- Adding comments to the user story as you progress is encouraged as it keeps a record of progress and findings that 
  pertain to that user story  
- For small branches you can merge them without approval, although for large scale feature rich branches these 
  should be tested by another member of the group before merging. Be sure to ask someone directly or in teams general
- Bugs that can not be fixed immediately or that are found in master should be logged in our Trello to be assigned in 
  upcoming sprints

### 'externalss.js' StyleSheet instructions
- 'externals.js' can be added to a file by adding following line at the top:

      import external from './externalss';
      
- Have created some basic variables used all over the file such as
    <u>Primary</u> for primary color of the app
    <u>Secondary</u> for secondary color of the app
    <u>BtnTextColor</u> for text color inside buttons
    <u>TextColorNormal</u> for all the basic text
    <u>TextColorSpecial</u> for all the special texts
  
- using each style, inside the opening tag you wish to apply the style insert:
      
      style = {external.<style name here>}

- Styles in 'externalss.js'
    - styles
    - buttonStyle
    - headings
    - subheadings
    - texts
