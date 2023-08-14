# W3D Podcast

## Description

This project aims to transform a ChatGPT conversation into a podcast. It uses the Google Cloud Text-to-Speech API to convert text messages into audio and then combines these audio clips into a single MP3 file.

## Prerequisites

-   Node.js installed on your machine.
-   A Google Cloud account with the Text-to-Speech API enabled.
-   Google Cloud authentication keys saved as a JSON file.

## Setup

1.  Clone this repository to your local machine.
1.  Navigate to the project directory and install the dependencies using the command:
    
    ```
    Copy code
    `npm install`

    ```
1.  Configure your environment variables. Create a `.env` file in the project's root directory and add the following line:
    
    ```
    makefileCopy code
    `GOOGLE_APPLICATION_CREDENTIALS=<path_to_your_credentials_json_file>`

    ```
    
    Replace `<path_to_your_credentials_json_file>` with the full path to the JSON credentials file you obtained from Google Cloud.

## Usage

To convert a ChatGPT conversation into a podcast, follow the steps below:

1.  Obtain the ChatGPT conversation ID. You can find this in the conversation URL, which looks like `https://chat.openai.com/share/<conversationId>`.2.  Run the main script with the conversation ID as an argument:
    ```
    phpCopy code
    `npm start <conversationId>`

    ```
1.  After successful execution, you will find a file named `tts_conversation.mp3` in the current directory. This file contains the converted conversation in audio format.

# Dependencies
------------

-   `@google-cloud/text-to-speech`: Library for interacting with the Google Cloud Text-to-Speech API.
-   `axios`: Used for making HTTP requests.
-   `cheerio`: A fast, flexible, and lean implementation of jQuery for the server, used for web scraping.
-   `dotenv`: Used for loading environment variables from the `.env` file.-   `puppeteer`: (Note: This dependency is listed in the `package.json` but is not used in the provided code. It might be necessary for additional functionality not shown.)

## License

This project is licensed under the MIT License.