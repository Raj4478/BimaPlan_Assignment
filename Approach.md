# My Approach to Building BimaPlan



## How I Thought About the Problem

When i started my building.I focused on backend from start.My approach was to see what type of data is coming into the backend, so that i can then add proper validation for the required fields, then after creating the models, i then jumped to routes, here i do not created the controllers seperately as i did not had much time and did not see that i can use ChatGPT(my mistake) and added data manipulation inside the routers and then exposed the routers to the Server.js.Here i used the MONGODB connection and created three endpoints namely /GET - claims, /GET - Policies, /POST - claims.I have used proper validation, Try - Catch for error handling and used proper HTTP code for response and error. The Backend, tested was working with all endpoints working as expected.

Then, i switched to client, i created the claim page and Policy page which were connected to the Backend and working Sucessfully, after this with the help of ChatGPT i enhanced the claim Page and Policy Page, add css to it and also added the PATCH type endpoint for changing claim status and at last i created the form for POST request to create claims.Here i used regex for Validation.

I feel that the frontend can be way more enhanced with the usage of Framer motion to provide smooth transitions and using Mui or Shadcn could enhance the Frontend more.

## What I Built

### The Basic Idea
- A website where people can see their insurance claims
- A way to create new claims when something happens
- A simple system to track if claims are approved or rejected
- A place to view available insurance policies



## Challenges I Faced

### The Hardest Parts
1. **Form Validation:** Getting the regex patterns right for policy IDs was tricky. I wanted to be flexible but not too loose.

2. **Responsive Design:** Making those cards look good on every screen size took longer than expected. Mobile is always the challenge.

3. **API Integration:** Setting up the proxy for development vs production URLs was confusing at first. I had to read the Vite docs several times.

4. **Deployment:** Vercel is great, but getting the environment variables right took some trial and error.





