This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Simultaneously go to the server folder in your local repository and run:
### `flask run`
This will start the backend server and you will be able to submit your data to be indexed,

### How to use
Enter the document(or paragraphs separated by two newlines) in the text box and press submit.
On successful uploading and indexing, a success message will be displayed meaning that data has been
entered and successfully indexed.
There is a button named clear that will clear all the data that we have till now that has been indexed.
The search button basically prints the top 10 documents containing that word. Enter the word to see
th top results(max results returned = 10).
