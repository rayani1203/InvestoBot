# InvestoBot
Welcome to my summer 2023 project, InvestoBot! An interactive and intuitive investment tracking system created for amateur investors to visualize and mathematically track their stock market activities.

# Authentication
This project utilizes a user authentication system to allow this system to be used by a large number of users and to keep each user's data secure from the others. Once on the site, users do not have to worry about interfering with data from other users as the appropriate data is retrieved in the back-end. Only a username, password, name, and email are needed to sign up, and the username and password are needed to sign in.

# Buying and Selling Investments
The bulk of the work with this project had to deal with the buying and selling of investments, how to manage this data, and ensuring it is accurate with global stock market data. Users can add an investment by entering a stock ticker (must be a valid NASDAQ code) and selecting the date of investment, as we aren't making an actual investment here, just a tool, so having bought an investment in the past is okay. The price of this stock on the selected date is then pulled and provided for the user before they can add the investment to their account. This purchase is then sent to the database and stored in correspondence with the user, and the effects of this purchase are reflected on the site in the user's assets and wallet. Assets track the combined value of the user's active investments, a value that is continuously updated as stocks continuously change value, while the wallet tracks the liquid cash that the user has. 

# Viewing your Investments
Users can view a comprehensive list of their current (on the investments page) and past (on the portfolio page) investments. 
Active investments are sorted by their date of purchase and can be sold from the investments page by clicking a "Sell" button. Doing so removes it from the user's active investments and adds it to their past (sold) investments. The value of the stock is removed from the user's assets and added to their wallet. 
Sold investments can be filtered on the portfolio page as the user can choose how far in their history they want to look by using an intuitive date picker and choosing to filter by sell date or purchase date. All sold investments that match this criteria are pulled and listed on the portfolio page.

# Using Graphs to Visualize Data
I utilized Chart.js so users can conveniently see their investment history, 
