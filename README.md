# MealMakerProject
Summer 2023 Personal Project

Description: What is Meal Maker?
Meal Maker is a mobile app that will generate meals based on user input, what is in the user's
fridge (or whatever ingredients are on hand), and dietary restrictions. All of the content is AI generated using OpenAI's API. 


Why did I make it? 
Orginally, this was my plan for a hackathon about accessibility (AccessHacks 2023). Unfortunately, I ended up getting scheduled
for work and wasn't able to participate, however I carried through with the project later on. 
This project was intended to help those with severe dietary restrictions. At one point in my life, I wasn't able to eat nuts, seafood, gluten, dairy, or eggs, so I know how it feels to run out of ideas of things that you CAN eat. So, with the use of rapidly developing AI technologies, I wanted to develop a way that could help those that have any dietary needs. 

How does it work?
Upon opening the app, all you have to do is enter your dietary restricions, what is in "your fridge" (or any foods that you want the app to especially consider) then input what you are feeling ("breakfast", "dinner", "something light", etc.), then click generate, and 5 meals will be generated (you can repeat this process for more meals). The meal cards can be clicked on for more information (including instructions and lists of ingredients)

What improvements can be made?
I never like to view things that I make as finished, and there is surely a lot of room for improvement on this one. 
Here a few things that I would like to improve in the future:
1. Loading speed. Currently my version is super slow and I would like to make it faster.
2. The app is not connected to a database, which is something that would make a huge improvement, and would make the app a lot more convenient to use. 
3. Sometimes the generations are a little weird. They can be repetetive, unpredictable, and sometimes just not very appetizing (especially the pictures). This is something that could probably be improved with more prompt engineering, but as better AI models come out, things will continue to improve. 


Technologies used: 
JavaScript, React Native (including RN Navigation and Context), OpenAI API (I currently am using text-davinci-003. With slight changes, other models could be used, but text-davinci-003 was the cheapest at the time I made this)
