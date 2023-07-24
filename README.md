<img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="Spotify Clone" width="200" />

A Spotify clone built using React and Styled Components that allows users to log in with their Spotify account and access various features like reading email, private playlists, and more.<br><br>
<strong>Note</strong>: To take the complete advantage of this Spotify Clone you need to have [Spotify Premium](https://www.spotify.com/in-en/premium/). 

## Demo
<a href="https://spotifyclone-aviral.netlify.app/">
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"/>
</a>

## Features
- Login with Spotify account.
- Access user information (email, private playlists, etc.).
- Play/Pause Music, Next and Previous
- Volume Slider
- Access to all your playlists 

## Installation
To run the application locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/AviralMehrotra/Spotify-Clone.git
   ```

2. Change into the project directory:
   ```
   cd Spotify-Clone
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Obtain your Spotify Client ID:
   - Go to the Spotify Developer Dashboard: https://developer.spotify.com/dashboard/
   - Create a new application to get your Client ID.
   - Add `http://localhost:3000/` (or your production URL) as a Redirect URI in the Spotify Dashboard.

2. Configure Client ID:
   - In the `Login.jsx` file, replace `clientId` with your Spotify Client ID.

3. Run the application:
   ```
   npm start
   ```

4. Open your web browser and navigate to `http://localhost:3000/` to access the application.

## Technologies Used
- React
- Styled Components
- React Icons
- Axios

## Contributing
Contributions are welcome! If you find any issues or have improvements to suggest, please create an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
