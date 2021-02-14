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
