# TalkToAgent

## Purpose

TalkToAgent is a project that enables users to interact with a digital agent named Jessica through voice communication. The interaction simulates a real phone conversation, where the user's spoken input is sent immediately after they finish speaking, and the agent's response is played back instantly. Unlike a real conversation, the application also provides a list of individual monologues, allowing users to replay any part of the dialogue.

## Features

- **Voice Recording**: Record the user's voice for interaction with the digital agent.
- **Audio Playback**: Automatically play the received audio response.
- **Auto-Detection of Silence**: Automatically detect when the user stops speaking and send the recording.
- **Real-Time Waveform**: Display a waveform during recording and audio playback.
- **Conversation History**: View and replay previous audio messages with playback controls.
- **User Feedback**: Visual indicators during recording and playback.
- **Landing Page**: A landing page with a button to open a modal for initiating a call.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/KaterinaHolasova/talk-to-agent.git
   cd talk-to-agent
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Add environment variables:

   Create a `.env.local` file in the root of the project and add your WebSocket URL:

   ```bash
   VITE_WEBSOCKET_URL=ws://localhost:8080
   ```

4. Start the development server:

   ```bash
   npx nx dev talk-to-agent
   ```

## Usage

- Navigate to the application in your browser at `http://localhost:4200`.

## Tech Stack

The project is built using the following technologies:

- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **Material-UI (MUI)**: For UI components and styling.
- **Day.js**: For date and time manipulation.
- **Wavesurfer.js**: For audio waveform visualization.
- **Reconnecting-WebSocket**: For WebSocket communication.
- **Vite**: For fast development and build tooling.
- **Nx**: For monorepo management and project scaffolding.

## Libraries

This project is organized into several libraries for modularity:

- **`@talk-to-agent/assets`**: Static assets like fonts and icons.
- **`@talk-to-agent/api`**: API utilities and services.
- **`@talk-to-agent/dialogs`**: Dialog components and utilities.
- **`@talk-to-agent/ui`**: Reusable UI components.
- **`@talk-to-agent/store`**: Centralized state management.
- **`@talk-to-agent/theme`**: Theming and design system.

## Future Improvements

Here are some potential features that could be added in the future:

- **Microphone Selection**: Allow users to select their preferred microphone for recording.
- **Language Support**: Add support for multiple languages for both user input and agent responses.
- **Text-to-Speech Integration**: Enable users to type messages and have them converted to speech for interaction with the agent.
