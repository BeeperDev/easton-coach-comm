# Easton Coach Communication

This is a fullstack web app that helps martial arts coaches at Easton Training Center track the progress and ranking of their individual students as they progress in the curriculum. As students attend class at different times throught the day with different, alternating coaches, all coaches can keep track and communicate to determine if a specific student is ready to rank up in our in house ranking system. This app solves miscommunication issues between coaches and delayed student promotions. It makes for a more efficient collaboration between management/front desk/coaches. 

<table>
  <tr>
    <td width="33.3%"  style="align:center;" valign="top">
        <img src="https://user-images.githubusercontent.com/73509044/206628239-c5640b29-4086-4c09-862e-b63b72ceef05.gif">
    </td>
    <td width="33.3%" valign="top">
        <img src="https://user-images.githubusercontent.com/73509044/206628224-2d4bf36f-6ed9-4e2a-afff-369b7af4cec6.gif">
    </td>
    <td width="33.3%" valign="top">
        <img src="https://user-images.githubusercontent.com/73509044/206628249-497dc36e-4561-49ec-ab31-76f1ca93e973.gif">
    </td>
  </tr>
</table>

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Bootstrap, EJS, Node, Express, MongoDB

This fullstack app utilizes MVC structure for organization. The views were built with EJS to display the data saved in a MongoDB database. Users (coaches) login sessions are stored using express-sesson and passport was used for login authentication. Cloudinary was used to store the location of profile images that can be uploaded to coach and student profiles. MongoDB was used to store user data, their login sessions, student profile data, and comments for the general bulletin, as well as coach and student profiles. This app is fully responsive and works well on mobile devices the coaches will be using while they teach class at the gym.
  

## Optimizations

Other than some more styling to be done, there are just a few features left to be built with this app. The coaches using this app still need to be able to vote if a student is ready to be promoted. There is a promotion button that will appear when enough votes are cast. After the student is promoted in class, the promoting coach can use that button to change the student’s rank in the database. 

## Lessons Learned:

Building this app has shown me the importance of file organization and how helpful MVC structure is for fullstack apps. I have moments of joy when I use a new Mongoose method or successfully implement my logic in the templating language I’m using.

---

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`
